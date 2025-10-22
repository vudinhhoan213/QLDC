# Tạo Tài Khoản Admin - Hệ Thống Quản Lý Dân Cư

## 🚀 3 Cách Tạo Tài Khoản Admin

### ⚡ CÁCH 1: Script Node.js (KHUYÊN DÙNG - NHANH NHẤT)

```bash
cd BE-QLDC
npm run create-admin
```

**Kết quả:**

```
✅ Tạo tài khoản admin thành công!
================================
Username:  admin
Password:  123456
Role:      TO_TRUONG (Tổ trưởng)
Full Name: Quản trị viên
Email:     admin@qldc.vn
================================
```

---

### 🌐 CÁCH 2: API Endpoint (CHO DEVELOPMENT)

#### Bước 1: Kiểm tra trạng thái hệ thống

```bash
GET http://localhost:3001/setup/status
```

**Response:**

```json
{
  "message": "Trạng thái hệ thống",
  "stats": {
    "totalUsers": 0,
    "totalLeaders": 0,
    "totalCitizens": 0,
    "hasAdmin": false
  },
  "needSetup": true
}
```

#### Bước 2: Tạo admin (chỉ khi chưa có tổ trưởng)

```bash
POST http://localhost:3001/setup/create-admin
Content-Type: application/json
```

**Response:**

```json
{
  "message": "Tạo tài khoản admin thành công!",
  "admin": {
    "username": "admin",
    "role": "TO_TRUONG",
    "fullName": "Quản trị viên",
    "email": "admin@qldc.vn"
  },
  "credentials": {
    "username": "admin",
    "password": "123456",
    "note": "Hãy đổi mật khẩu sau khi đăng nhập!"
  }
}
```

**Lưu ý:** Endpoint này chỉ hoạt động khi hệ thống chưa có tổ trưởng nào. Sau khi đã có admin, endpoint sẽ trả về lỗi.

---

### 🔧 CÁCH 3: Sử dụng MongoDB Compass/Shell

```javascript
// Kết nối MongoDB và chạy:
use your_database_name

db.users.insertOne({
  username: "admin",
  passwordHash: "$2a$10$YourHashedPasswordHere", // Hash của "123456"
  role: "TO_TRUONG",
  fullName: "Quản trị viên",
  email: "admin@qldc.vn",
  phone: "0123456789",
  isActive: true,
  note: "Tài khoản quản trị hệ thống",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Cách hash password:**

```javascript
const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("123456", 10);
console.log(hash); // Copy hash này vào passwordHash
```

---

## 📋 Thông Tin Tài Khoản Admin Mặc Định

| Trường        | Giá trị       |
| ------------- | ------------- |
| **Username**  | `admin`       |
| **Password**  | `123456`      |
| **Role**      | `TO_TRUONG`   |
| **Full Name** | Quản trị viên |
| **Email**     | admin@qldc.vn |
| **Phone**     | 0123456789    |

---

## 🔐 Đăng Nhập

### Frontend (React):

1. Mở trình duyệt: `http://localhost:5173/login`
2. Nhập:
   - **Tài khoản:** `admin`
   - **Mật khẩu:** `123456`
3. Click "Đăng nhập"

### API (Postman/cURL):

```bash
POST http://localhost:3001/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "username": "admin",
    "role": "TO_TRUONG",
    "fullName": "Quản trị viên"
  }
}
```

---

## ⚙️ Quản Lý Tài Khoản Admin

### Reset Password Admin

**Option 1: Chạy lại script**

```bash
npm run create-admin
# Script sẽ phát hiện admin đã tồn tại và hỏi có reset password không
# Nhập 'y' để reset về 123456
```

**Option 2: Sử dụng API (cần token của admin khác)**

```bash
PATCH http://localhost:3001/users/{admin_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "new_password_here"
}
```

### Kiểm Tra Admin Đã Tồn Tại

```bash
GET http://localhost:3001/setup/status
```

---

## 🛡️ Bảo Mật

- ✅ Password được hash bằng **bcrypt** (10 rounds)
- ✅ JWT token có thời hạn **7 ngày**
- ✅ Token được lưu trong localStorage (frontend)
- ✅ Mọi request đều cần token trong header `Authorization: Bearer {token}`

### ⚠️ LƯU Ý BẢO MẬT:

1. **ĐỔI MẬT KHẨU NGAY SAU KHI TẠO ADMIN!**
2. Không chia sẻ credentials với người khác
3. Endpoint `/setup/create-admin` nên bị disable trong production
4. Sử dụng HTTPS trong production
5. Thay đổi `JWT_SECRET` trong file `.env`

---

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to MongoDB"

```bash
# Kiểm tra file .env
MONGODB_ATLAS=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
```

### Lỗi: "User already exists"

- Admin đã được tạo trước đó
- Sử dụng script để reset password
- Hoặc xóa user cũ trong MongoDB

### Lỗi: "Missing required fields"

- Kiểm tra model User
- Đảm bảo tất cả trường required có giá trị

### Script không chạy

```bash
# Cài đặt dependencies
npm install

# Kiểm tra file scripts/createAdmin.js tồn tại
ls scripts/

# Chạy trực tiếp
node scripts/createAdmin.js
```

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề, kiểm tra:

1. MongoDB đã kết nối chưa?
2. File `.env` có đúng cấu hình không?
3. Dependencies đã được cài đặt chưa? (`npm install`)
4. Server đang chạy không? (`npm start` hoặc `npm run dev`)

---

## 📚 Tài Liệu Liên Quan

- [API Documentation](./API_DOCS.md)
- [Database Schema](./SCHEMA.md)
- [Deployment Guide](./DEPLOYMENT.md)
