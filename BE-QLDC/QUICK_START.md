# 🚀 QUICK START - Chạy Ngay

## Bước 1: Tạo Admin (BẮT BUỘC)

```bash
cd BE-QLDC
npm run create-admin
```

Bạn sẽ thấy:

```
✅ Tạo tài khoản admin thành công!
================================
Username:  admin
Password:  123456
Role:      TO_TRUONG (Tổ trưởng)
================================
```

## Bước 2: Chạy Backend

```bash
npm start
```

Hoặc với nodemon (auto-reload):

```bash
npm run dev
```

Bạn sẽ thấy:

```
MongoDB connected
Server is running on port 3001
```

## Bước 3: Test Login

### Cách 1: Dùng Frontend

1. Mở browser: http://localhost:5173/login
2. Nhập:
   - Username: `admin`
   - Password: `123456`
3. Click "Đăng nhập"

### Cách 2: Dùng cURL

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"123456\"}"
```

### Cách 3: Dùng Postman

```
POST http://localhost:3001/auth/login
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "username": "admin",
  "password": "123456"
}
```

## ✅ Response Thành Công

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

## 🐛 Troubleshooting

### Lỗi: "User not found"

```bash
# Chạy lại script tạo admin
npm run create-admin
```

### Lỗi: "Cannot connect to MongoDB"

```bash
# Kiểm tra MongoDB đang chạy
# Windows:
net start MongoDB

# Mac/Linux:
sudo systemctl start mongod
```

### Lỗi: "Missing username/email or password"

- Kiểm tra body request có đúng format JSON không
- Đảm bảo gửi `username` hoặc `email` và `password`

### Server logs sẽ hiển thị:

```
🔐 Login attempt: { identifier: 'admin', hasPassword: true }
👤 User found: Yes (admin)
🔑 Password match: Yes
✅ Login successful
```

Nếu thấy `❌` ở bất kỳ bước nào, check lại:

- Username có đúng không?
- Password có đúng không?
- Admin đã được tạo chưa?
