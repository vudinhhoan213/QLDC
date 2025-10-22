# 🔗 Hướng Dẫn Tích Hợp API

## ✅ Đã hoàn thành:

### 1. API Services Created

- ✅ `householdService.js` - CRUD hộ khẩu
- ✅ `citizenService.js` - CRUD nhân khẩu
- ✅ `editRequestService.js` - CRUD yêu cầu chỉnh sửa
- ✅ `rewardService.js` - Quản lý khen thưởng (proposals, events, distributions, achievements)
- ✅ `services/index.js` - Export tất cả services

### 2. Pages đã tích hợp API

- ✅ **LeaderDashboard** - Fetch stats & recent requests từ API

## 📋 TODO: Tích hợp API cho các pages còn lại

### **Leader Pages:**

#### 1. HouseholdManagement.jsx

```javascript
import { householdService } from "../../services";

// Fetch data
useEffect(() => {
  const fetchHouseholds = async () => {
    try {
      setLoading(true);
      const data = await householdService.getAll();
      setHouseholds(
        data.map((h, i) => ({
          key: h._id,
          id: h.code || h._id,
          headOfHousehold: h.headOfHousehold,
          address: h.address,
          members: h.memberCount || 0,
          phone: h.phone,
          status: h.status,
        }))
      );
    } catch (error) {
      message.error("Không thể tải dữ liệu hộ khẩu");
    } finally {
      setLoading(false);
    }
  };
  fetchHouseholds();
}, []);

// Create
const handleAdd = async (values) => {
  try {
    await householdService.create(values);
    message.success("Tạo hộ khẩu thành công");
    // Refresh list
  } catch (error) {
    message.error("Không thể tạo hộ khẩu");
  }
};

// Update
const handleEdit = async (id, values) => {
  try {
    await householdService.update(id, values);
    message.success("Cập nhật thành công");
  } catch (error) {
    message.error("Không thể cập nhật");
  }
};

// Delete
const handleDelete = async (id) => {
  try {
    await householdService.delete(id);
    message.success("Xóa thành công");
  } catch (error) {
    message.error("Không thể xóa");
  }
};
```

#### 2. CitizenManagement.jsx

```javascript
import { citizenService } from "../../services";

// Similar pattern như HouseholdManagement
useEffect(() => {
  const fetchCitizens = async () => {
    const data = await citizenService.getAll();
    setCitizens(
      data.map((c) => ({
        key: c._id,
        id: c.code || c._id,
        fullName: c.fullName,
        dateOfBirth: c.dateOfBirth,
        gender: c.gender,
        idCard: c.idCard,
        household: c.householdId?.code,
        relationship: c.relationship,
        status: c.status,
      }))
    );
  };
  fetchCitizens();
}, []);
```

#### 3. EditRequestReview.jsx

```javascript
import { editRequestService } from "../../services";

// Fetch requests
useEffect(() => {
  const fetchRequests = async () => {
    const data = await editRequestService.getAll();
    setRequests(
      data.map((r) => ({
        key: r._id,
        id: r.code || r._id,
        citizen: r.citizenId?.fullName,
        household: r.householdId?.code,
        type: r.requestType,
        description: r.description,
        submitDate: r.createdAt,
        status: r.status,
        reviewDate: r.reviewedAt,
        reviewer: r.reviewedBy?.fullName,
        reviewNote: r.reviewNote,
      }))
    );
  };
  fetchRequests();
}, []);

// Approve
const handleApprove = async (id, reviewNote) => {
  try {
    await editRequestService.approve(id, { reviewNote });
    message.success("Đã duyệt yêu cầu");
    // Refresh list
  } catch (error) {
    message.error("Không thể duyệt yêu cầu");
  }
};

// Reject
const handleReject = async (id, reviewNote) => {
  try {
    await editRequestService.reject(id, { reviewNote });
    message.success("Đã từ chối yêu cầu");
  } catch (error) {
    message.error("Không thể từ chối");
  }
};
```

#### 4. RewardProposalReview.jsx

```javascript
import { rewardService } from "../../services";

useEffect(() => {
  const fetchProposals = async () => {
    const data = await rewardService.proposals.getAll();
    setProposals(
      data.map((p) => ({
        key: p._id,
        id: p.code || p._id,
        citizen: p.citizenId?.fullName,
        household: p.householdId?.code,
        studentName: p.studentName,
        achievement: p.achievementType,
        school: p.school,
        grade: p.grade,
        description: p.description,
        submitDate: p.createdAt,
        status: p.status,
      }))
    );
  };
  fetchProposals();
}, []);

// Approve/Reject similar to EditRequestReview
const handleApprove = async (id, reviewNote) => {
  await rewardService.proposals.approve(id, { reviewNote });
};

const handleReject = async (id, reviewNote) => {
  await rewardService.proposals.reject(id, { reviewNote });
};
```

### **Citizen Pages:**

#### 5. CitizenDashboard.jsx

```javascript
import {
  householdService,
  editRequestService,
  rewardService,
} from "../../services";

useEffect(() => {
  const fetchData = async () => {
    try {
      const [household, requests, rewards] = await Promise.all([
        householdService.getById("my"), // Backend sẽ lấy household của user hiện tại
        editRequestService.getMyRequests(),
        rewardService.distributions.getMyRewards(),
      ]);

      setHouseholdInfo(household);
      setMyRequests(requests);
      setMyRewards(rewards);
    } catch (error) {
      message.error("Không thể tải dữ liệu");
    }
  };
  fetchData();
}, []);
```

#### 6. MyHousehold.jsx

```javascript
import { householdService } from "../../services";

useEffect(() => {
  const fetchMyHousehold = async () => {
    try {
      const data = await householdService.getById("my");
      setHouseholdInfo({
        id: data.code,
        headOfHousehold: data.headOfHousehold,
        address: data.address,
        phone: data.phone,
        registrationDate: data.createdAt,
        status: data.status,
      });
      setMembers(data.members || []);
    } catch (error) {
      message.error("Không thể tải thông tin hộ khẩu");
    }
  };
  fetchMyHousehold();
}, []);
```

#### 7. SubmitEditRequest.jsx

```javascript
import { editRequestService } from "../../services";

const handleSubmit = async (values) => {
  try {
    setLoading(true);
    await editRequestService.create({
      requestType: values.requestType,
      title: values.title,
      description: values.description,
      phone: values.phone,
      // attachments: values.documents, // Handle file upload
    });
    message.success("Gửi yêu cầu thành công!");
    navigate("/citizen/my-requests");
  } catch (error) {
    message.error("Có lỗi xảy ra");
  } finally {
    setLoading(false);
  }
};
```

#### 8. SubmitRewardProposal.jsx

```javascript
import { rewardService } from "../../services";

const handleSubmit = async (values) => {
  try {
    setLoading(true);
    await rewardService.proposals.create({
      studentName: values.studentName,
      school: values.school,
      grade: values.grade,
      achievementType: values.achievementType,
      achievementTitle: values.achievementTitle,
      description: values.description,
      achievementDate: values.achievementDate,
      phone: values.phone,
    });
    message.success("Gửi đề xuất thành công!");
    navigate("/citizen/my-rewards");
  } catch (error) {
    message.error("Có lỗi xảy ra");
  } finally {
    setLoading(false);
  }
};
```

#### 9. MyRequests.jsx

```javascript
import { editRequestService } from "../../services";

useEffect(() => {
  const fetchMyRequests = async () => {
    try {
      const data = await editRequestService.getMyRequests();
      setRequests(
        data.map((r) => ({
          key: r._id,
          id: r.code,
          type: r.requestType,
          title: r.title,
          description: r.description,
          submitDate: r.createdAt,
          status: r.status,
          reviewDate: r.reviewedAt,
          reviewer: r.reviewedBy?.fullName,
          reviewNote: r.reviewNote,
        }))
      );
    } catch (error) {
      message.error("Không thể tải danh sách yêu cầu");
    }
  };
  fetchMyRequests();
}, []);
```

#### 10. MyRewards.jsx

```javascript
import { rewardService } from "../../services";

useEffect(() => {
  const fetchMyRewards = async () => {
    try {
      const data = await rewardService.distributions.getMyRewards();
      setRewards(
        data.map((r) => ({
          key: r._id,
          id: r.code,
          type: r.type, // 'event' or 'achievement'
          eventName: r.eventId?.eventName || r.achievementType,
          studentName: r.studentName || "-",
          achievement: r.achievementType || "-",
          amount: r.amount,
          date: r.distributedAt,
          status: "received",
          description: r.description,
        }))
      );
    } catch (error) {
      message.error("Không thể tải danh sách khen thưởng");
    }
  };
  fetchMyRewards();
}, []);
```

## 🔧 Backend API Endpoints Reference

### Auth

- `POST /auth/login` - Login
- `POST /auth/register` - Register

### Households

- `GET /households` - Get all (with pagination, search)
- `GET /households/:id` - Get by ID
- `GET /households/my` - Get my household (citizen)
- `POST /households` - Create (leader)
- `PUT /households/:id` - Update (leader)
- `DELETE /households/:id` - Delete (leader)
- `GET /households/stats` - Get statistics

### Citizens

- `GET /citizens` - Get all
- `GET /citizens/:id` - Get by ID
- `POST /citizens` - Create
- `PUT /citizens/:id` - Update
- `DELETE /citizens/:id` - Delete
- `GET /citizens/stats` - Get statistics

### Edit Requests

- `GET /requests` - Get all (leader)
- `GET /requests/my` - Get my requests (citizen)
- `GET /requests/:id` - Get by ID
- `POST /requests` - Create
- `POST /requests/:id/approve` - Approve (leader)
- `POST /requests/:id/reject` - Reject (leader)
- `GET /requests/stats` - Get statistics

### Reward Proposals

- `GET /rewards` - Get all proposals
- `GET /rewards/my` - Get my proposals
- `POST /rewards` - Create proposal
- `POST /rewards/:id/approve` - Approve
- `POST /rewards/:id/reject` - Reject
- `GET /rewards/stats` - Get statistics

### Reward Distributions

- `GET /reward-distributions` - Get all
- `GET /reward-distributions/my` - Get my rewards
- `POST /reward-distributions` - Create
- `POST /reward-distributions/bulk` - Bulk create

## 📌 Notes

1. **Error Handling**: Tất cả API calls đều được wrap trong try-catch
2. **Loading States**: Set `setLoading(true/false)` khi fetch data
3. **Message Feedback**: Dùng `message.success/error()` để thông báo
4. **Data Mapping**: Map response data về format của frontend
5. **Refresh Data**: Sau khi create/update/delete, gọi lại fetch function

## 🚀 Next Steps

1. Cập nhật từng page theo pattern trên
2. Test với backend API thật
3. Handle edge cases (empty data, errors, etc.)
4. Add pagination, search, filter cho tables
5. Implement file upload cho documents

---

**Tất cả service files đã sẵn sàng tại `FE-QLDC/src/services/`**
