# 📘 Hướng Dẫn: Tạo Hộ Khẩu & Nhân Khẩu

## ❓ Vấn đề: Vòng lặp phụ thuộc

- **Tạo Hộ khẩu** → cần **Chủ hộ** (là Citizen)
- **Tạo Citizen** → cần **Hộ khẩu** (là Household)

→ **Không thể tạo được!** 😱

## ✅ Giải pháp: Tạo theo thứ tự

### **Bước 1: Tạo Nhân Khẩu (Citizen) trước**

1. Vào **Quản Lý Nhân Khẩu** (`/leader/citizens`)
2. Click **"Thêm nhân khẩu mới"**
3. Điền thông tin:

   - ✅ **Họ và tên**: Nguyễn Văn A
   - ✅ **Ngày sinh**: 01/01/1990
   - ✅ **Giới tính**: Nam
   - ✅ **CCCD/CMND**: 001234567890
   - ❌ **Hộ khẩu**: **BỎ TRỐNG** (chưa có hộ khẩu)
   - ❌ **Quan hệ với chủ hộ**: **BỎ TRỐNG**
   - ✅ **Trạng thái**: Hoạt động

4. Click **"Lưu"**

→ Nhân khẩu được tạo **KHÔNG CẦN** hộ khẩu!

### **Bước 2: Tạo Hộ Khẩu (Household)**

1. Vào **Quản Lý Hộ Khẩu** (`/leader/households`)
2. Click **"Thêm hộ khẩu mới"**
3. Điền thông tin:

   - ✅ **Mã hộ khẩu**: HK-001
   - ✅ **Chủ hộ**: Chọn "Nguyễn Văn A" (vừa tạo ở Bước 1)
   - ✅ **Địa chỉ**:
     - Số nhà / Đường: 123 Đường ABC
     - Phường / Xã: Phường 1
     - Quận / Huyện: Quận 1
     - Tỉnh / TP: TP.HCM
   - ✅ **Trạng thái**: ACTIVE

4. Click **"Lưu"**

→ Hộ khẩu được tạo với **chủ hộ** là Nguyễn Văn A!

### **Bước 3: Thêm thành viên vào Hộ Khẩu (optional)**

1. Vào **Quản Lý Nhân Khẩu**
2. Tạo thêm nhân khẩu mới (VD: Trần Thị B - vợ)
3. **Lần này** có thể chọn:
   - ✅ **Hộ khẩu**: HK-001 (đã tạo ở Bước 2)
   - ✅ **Quan hệ**: Vợ

→ Trần Thị B được gán vào hộ khẩu HK-001!

## 📋 Field Mapping: Frontend ↔ Backend

### **Citizen Fields**

| Frontend (Form)   | Backend (Model)        | Notes                    |
| ----------------- | ---------------------- | ------------------------ |
| `fullName`        | `fullName`             | Required                 |
| `dateOfBirth`     | `dateOfBirth`          | Date                     |
| `gender` (Nam/Nữ) | `gender` (MALE/FEMALE) | Enum, need conversion    |
| `idCard`          | `nationalId`           | ⚠️ Different field name! |
| `household`       | `household`            | ObjectId ref, OPTIONAL   |
| `relationship`    | `relationshipToHead`   | ⚠️ Different field name! |
| `status` (active) | `status` (ALIVE)       | Enum, need conversion    |

### **Household Fields**

| Frontend (Form)   | Backend (Model) | Notes                   |
| ----------------- | --------------- | ----------------------- |
| `code`            | `code`          | Required, unique        |
| `head`            | `head`          | ObjectId ref to Citizen |
| `street/ward/...` | `address{}`     | Object with 4 fields    |
| `status` (ACTIVE) | `status`        | Enum (uppercase)        |

## 🔑 Key Changes

### **1. Citizen Form - Household field is now OPTIONAL**

```javascript
<Form.Item name="household" label="Hộ khẩu (không bắt buộc - có thể gán sau)">
  <Select
    placeholder="Chọn hộ khẩu (hoặc bỏ trống)"
    allowClear // ← Cho phép xóa selection
  >
    {/* ... options ... */}
  </Select>
</Form.Item>
```

### **2. Field Name Mapping**

```javascript
// Frontend → Backend
const citizenData = {
  fullName: values.fullName,
  gender: values.gender === "Nam" ? "MALE" : "FEMALE",
  nationalId: values.idCard, // ← Đổi tên
  household: values.household,
  relationshipToHead: values.relationship, // ← Đổi tên
  status: values.status === "active" ? "ALIVE" : "MOVED_OUT",
};
```

### **3. Backend → Frontend Display**

```javascript
// Backend → Frontend
setCitizens(
  data.map((c) => ({
    gender: c.gender === "MALE" ? "Nam" : "Nữ", // Convert
    idCard: c.nationalId, // Map field
    household: c.household?.code || "Chưa có hộ khẩu",
    relationship: c.relationshipToHead,
    status: c.status === "ALIVE" ? "active" : "inactive",
  }))
);
```

## 🎯 Quy trình tạo dữ liệu

```
1. Tạo Citizen (chủ hộ) → KHÔNG CHỌN household
           ↓
2. Tạo Household → CHỌN chủ hộ vừa tạo
           ↓
3. Tạo thêm Citizen (thành viên) → CHỌN household vừa tạo
```

## ✅ Kết quả

- ✅ Có thể tạo Citizen **độc lập** (không cần household)
- ✅ Có thể tạo Household với Citizen đã có sẵn
- ✅ Có thể gán Citizen vào Household sau
- ✅ Không còn vòng lặp phụ thuộc!
- ✅ Field mapping đúng với backend model

---

**Giờ bạn có thể tạo hộ khẩu và nhân khẩu rồi!** 🎉
