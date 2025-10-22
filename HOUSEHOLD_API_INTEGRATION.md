# ✅ HouseholdManagement - API Integration Complete

## 🔧 Vấn đề ban đầu

```json
{
  "message": "Household validation failed:
    - address: Cast to Embedded failed for value \"123\" (type string)
    - head: Path `head` is required.
    - code: Path `code` is required.
    - status: `active` is not a valid enum value"
}
```

## 📋 Backend Model Structure

```javascript
// BE-QLDC/models/Household.js
{
  code: String (required, unique),          // Mã hộ khẩu
  address: {                                 // Object, không phải string
    street: String,
    ward: String,
    district: String,
    city: String
  },
  head: ObjectId (required, ref: 'Citizen'), // Chủ hộ
  members: [ObjectId (ref: 'Citizen')],      // Thành viên
  status: Enum [                             // Chữ HOA
    'ACTIVE',
    'MOVED',
    'SPLIT',
    'MERGED',
    'INACTIVE'
  ],
  phone: String,
  establishedAt: Date,
  movedOutAt: Date,
  note: String
}
```

## ✅ Frontend Changes

### 1. Import Services

```javascript
import { householdService, citizenService } from "../../services";
```

### 2. State Management

```javascript
const [households, setHouseholds] = useState([]);
const [citizens, setCitizens] = useState([]);
const [editingHousehold, setEditingHousehold] = useState(null);
```

### 3. Fetch Data

```javascript
useEffect(() => {
  fetchHouseholds();
  fetchCitizens(); // Cần để chọn chủ hộ
}, []);

const fetchHouseholds = async () => {
  const response = await householdService.getAll();
  const data = response.docs || response || [];
  setHouseholds(
    data.map((h) => ({
      key: h._id,
      id: h.code,
      headOfHousehold: h.head?.fullName || "N/A",
      headId: h.head?._id || h.head,
      address: `${h.address.street}, ${h.address.ward}, 
                ${h.address.district}, ${h.address.city}`,
      addressObject: h.address,
      members: h.members?.length || 0,
      phone: h.phone,
      status: h.status || "ACTIVE",
    }))
  );
};
```

### 4. Form Structure (Modal)

```javascript
<Form form={form} layout="vertical">
  {/* Mã hộ khẩu */}
  <Form.Item name="code" label="Mã hộ khẩu" rules={[{ required: true }]}>
    <Input placeholder="VD: HK-001" disabled={!!editingHousehold} />
  </Form.Item>

  {/* Chủ hộ - Select từ Citizens */}
  <Form.Item name="head" label="Chủ hộ" rules={[{ required: true }]}>
    <Select showSearch>
      {citizens.map((c) => (
        <Option key={c._id} value={c._id}>
          {c.fullName} - {c.idCard || "Chưa có CCCD"}
        </Option>
      ))}
    </Select>
  </Form.Item>

  {/* Địa chỉ - Tách thành 4 fields */}
  <Form.Item name="street" label="Số nhà / Đường">
    <Input />
  </Form.Item>
  <Form.Item name="ward" label="Phường / Xã">
    <Input />
  </Form.Item>
  <Form.Item name="district" label="Quận / Huyện">
    <Input />
  </Form.Item>
  <Form.Item name="city" label="Tỉnh / Thành phố">
    <Input />
  </Form.Item>

  {/* Status - Enum values */}
  <Form.Item name="status" initialValue="ACTIVE">
    <Select>
      <Option value="ACTIVE">Hoạt động</Option>
      <Option value="MOVED">Đã chuyển đi</Option>
      <Option value="SPLIT">Đã tách hộ</Option>
      <Option value="MERGED">Đã gộp hộ</Option>
      <Option value="INACTIVE">Không hoạt động</Option>
    </Select>
  </Form.Item>
</Form>
```

### 5. Submit Handler

```javascript
const handleModalOk = async () => {
  const values = await form.validateFields();

  const householdData = {
    code: values.code,
    head: values.head, // ObjectId của Citizen
    address: {
      // Object, không phải string
      street: values.street,
      ward: values.ward,
      district: values.district,
      city: values.city,
    },
    phone: values.phone,
    status: values.status, // ACTIVE, MOVED, etc.
  };

  if (editingHousehold) {
    await householdService.update(editingHousehold.key, householdData);
  } else {
    await householdService.create(householdData);
  }

  fetchHouseholds();
};
```

### 6. Edit Handler

```javascript
const handleEdit = (record) => {
  setEditingHousehold(record);
  form.setFieldsValue({
    code: record.id,
    head: record.headId, // ObjectId
    street: record.addressObject?.street || "",
    ward: record.addressObject?.ward || "",
    district: record.addressObject?.district || "",
    city: record.addressObject?.city || "",
    phone: record.phone,
    status: record.status,
  });
  setIsModalVisible(true);
};
```

### 7. Status Display

```javascript
const statusConfig = {
  ACTIVE: { color: "green", text: "Hoạt động" },
  MOVED: { color: "orange", text: "Đã chuyển đi" },
  SPLIT: { color: "blue", text: "Đã tách hộ" },
  MERGED: { color: "purple", text: "Đã gộp hộ" },
  INACTIVE: { color: "default", text: "Không hoạt động" },
};
```

## 🔑 Key Points

### ✅ **Address Structure**

- **Backend**: Object với `{street, ward, district, city}`
- **Frontend Display**: Join thành string
- **Frontend Form**: 4 separate inputs
- **Frontend Submit**: Combine lại thành object

### ✅ **Head (Chủ hộ)**

- **Backend**: `ObjectId` reference to `Citizen`
- **Frontend**: Select dropdown từ `citizens` list
- **Display**: `h.head?.fullName` (populated)

### ✅ **Code (Mã hộ khẩu)**

- **Required**: Phải có
- **Unique**: Không trùng
- **Disabled**: Khi edit (không cho đổi mã)

### ✅ **Status Values**

- Must be: `ACTIVE`, `MOVED`, `SPLIT`, `MERGED`, `INACTIVE`
- **CHỮ HOA** (uppercase)
- **KHÔNG DÙNG**: `active`, `inactive` (lowercase)

## 🎯 API Endpoints

- `GET /households` → List all households
- `POST /households` → Create new (Leader only)
- `PUT /households/:id` → Update (Leader only)
- `DELETE /households/:id` → Delete (Leader only)

## 🚀 Result

✅ **Form validation** matches backend schema
✅ **Address** sent as proper object structure
✅ **Head** is ObjectId reference to Citizen
✅ **Status** uses correct enum values
✅ **Citizens dropdown** populated from API
✅ **Full CRUD** operations working
✅ **Error messages** detailed and helpful

---

**HouseholdManagement is now fully integrated with backend API!** 🎊
