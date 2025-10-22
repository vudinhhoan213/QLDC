# Kế Hoạch Tái Cấu Trúc Frontend

## 🎯 Mục tiêu: Loại bỏ duplicate và chuẩn hóa cấu trúc

## 📁 Cấu trúc ĐỀ XUẤT (JavaScript .jsx - Đơn giản & Thực tế):

```
FE-QLDC/src/
├── components/
│   ├── ui/                    # shadcn/ui components (giữ như cũ)
│   ├── Layout.jsx             # ✅ Tạo mới - Layout chung cho tất cả pages
│   ├── ProtectedRoute.jsx     # ✅ Đã có - GIỮ NGUYÊN
│   └── shared/               # 🆕 Components dùng chung
│       ├── Navbar.jsx
│       ├── LoadingSpinner.jsx
│       └── EmptyState.jsx
│
├── pages/
│   ├── auth/
│   │   └── LoginPage.jsx                    # ✅ GIỮ pages/login/LoginPage.jsx
│   │
│   ├── dashboard/
│   │   ├── LeaderDashboard.jsx              # ✅ GIỮ leader/LeaderDashboard.jsx
│   │   └── CitizenDashboard.jsx             # ✅ GIỮ citizen/CitizenDashboard.jsx
│   │
│   ├── households/
│   │   ├── HouseholdListPage.jsx            # 🆕 Migrate từ .tsx
│   │   ├── HouseholdDetailPage.jsx          # 🆕 Migrate từ .tsx
│   │   ├── MyHouseholdPage.jsx              # ✅ GIỮ citizen/MyHousehold.jsx
│   │   └── HouseholdFormPage.jsx            # 🆕 Thêm mới
│   │
│   ├── citizens/
│   │   ├── CitizenListPage.jsx              # 🆕 Migrate từ .tsx
│   │   ├── CitizenDetailPage.jsx            # 🆕 Migrate từ .tsx
│   │   └── CitizenFormPage.jsx              # 🆕 Thêm mới
│   │
│   ├── requests/
│   │   ├── EditRequestListPage.jsx          # 🆕 Migrate từ .tsx
│   │   ├── EditRequestDetailPage.jsx        # 🆕 Migrate từ .tsx
│   │   ├── SubmitEditRequestPage.jsx        # ✅ GIỮ citizen/SubmitEditRequest.jsx
│   │   └── RequestHistoryPage.jsx           # ✅ GIỮ citizen/MyRequests.jsx
│   │
│   ├── rewards/
│   │   ├── RewardProposalListPage.jsx       # 🆕 Migrate từ .tsx
│   │   ├── RewardProposalDetailPage.jsx     # 🆕 Migrate từ .tsx
│   │   ├── SubmitRewardProposalPage.jsx     # ✅ GIỮ citizen/SubmitRewardProposal.jsx
│   │   ├── RewardHistoryPage.jsx            # ✅ GIỮ citizen/MyRewards.jsx
│   │   ├── RewardEventListPage.jsx          # 🆕 THÊM MỚI - Quản lý sự kiện phát quà
│   │   ├── RewardDistributionPage.jsx       # 🆕 THÊM MỚI - Phân phối quà
│   │   └── StudentAchievementPage.jsx       # 🆕 THÊM MỚI - Thành tích học sinh
│   │
│   ├── audit/
│   │   └── AuditLogPage.jsx                 # ✅ GIỮ leader/AuditLogs.jsx
│   │
│   ├── notifications/
│   │   └── NotificationPage.jsx             # 🆕 Migrate từ .tsx
│   │
│   ├── profile/
│   │   └── ProfilePage.jsx                  # 🆕 Migrate từ .tsx
│   │
│   └── errors/
│       ├── NotFoundPage.jsx                 # ✅ GIỮ NotFound.jsx
│       └── UnauthorizedPage.jsx             # ✅ GIỮ UnauthorizedPage.jsx
│
├── context/
│   └── AuthContext.jsx                      # ✅ GIỮ NGUYÊN
│
├── hooks/
│   ├── useAuth.js                           # 🆕 Custom hook cho auth
│   └── useApi.js                            # 🆕 Custom hook cho API calls
│
├── lib/
│   ├── utils.js                             # 🆕 Utility functions
│   └── api.js                               # 🆕 Axios instance & interceptors
│
├── routes/
│   └── AppRouter.jsx                        # ✅ GIỮ NGUYÊN
│
└── constants/
    ├── roles.js                             # 🆕 Role constants
    ├── apiEndpoints.js                      # 🆕 API endpoints
    └── routes.js                            # 🆕 Route paths
```

---

## 🗑️ FILES CẦN XÓA (Tất cả .tsx - Chuyển sang .jsx):

### ❌ XÓA TẤT CẢ FILES .tsx (Không phù hợp với JavaScript):

```bash
# Xóa các TypeScript pages
rm -rf src/pages/*.tsx
rm src/pages/AuditLogPage.tsx
rm src/pages/CitizenDetailPage.tsx
rm src/pages/CitizenListPage.tsx
rm src/pages/DashboardPage.tsx
rm src/pages/EditRequestDetailPage.tsx
rm src/pages/EditRequestListPage.tsx
rm src/pages/HouseholdDetailPage.tsx
rm src/pages/HouseholdListPage.tsx
rm src/pages/LoginPage.tsx
rm src/pages/MyHouseholdPage.tsx
rm src/pages/NotificationPage.tsx
rm src/pages/ProfilePage.tsx
rm src/pages/RequestHistoryPage.tsx
rm src/pages/RewardHistoryPage.tsx
rm src/pages/RewardProposalDetailPage.tsx
rm src/pages/RewardProposalListPage.tsx
rm src/pages/SubmitEditRequestPage.tsx
rm src/pages/SubmitRewardProposalPage.tsx

# Xóa TypeScript components
rm src/components/Layout.tsx
rm src/components/ProtectedRoute.tsx

# Xóa TypeScript config (nếu không cần)
# rm tsconfig.json  (có thể giữ nếu dùng shadcn/ui)
```

### ✅ GIỮ LẠI (JavaScript files):

- ✅ `src/pages/citizen/*.jsx` (6 files)
- ✅ `src/pages/leader/*.jsx` (6 files)
- ✅ `src/pages/login/LoginPage.jsx`
- ✅ `src/pages/NotFound.jsx`
- ✅ `src/pages/UnauthorizedPage.jsx`
- ✅ `src/context/AuthContext.jsx`
- ✅ `src/routes/AppRouter.jsx`
- ✅ `src/routes/ProtectedRoute.jsx`

---

## 🔧 BƯỚC THỰC HIỆN (JavaScript):

### Bước 1: Tạo Layout.jsx chung

**Mục đích:** Tất cả pages sẽ dùng chung 1 layout thay vì mỗi page tự tạo navbar

```jsx
// src/components/Layout.jsx
- Header/Navbar với logo, user info, logout
- Sidebar (cho leader) hoặc Bottom Nav (cho citizen)
- Main content area
- Breadcrumbs
```

### Bước 2: Di chuyển files vào cấu trúc mới

```bash
# Tạo folders mới
mkdir -p src/pages/auth
mkdir -p src/pages/dashboard
mkdir -p src/pages/households
mkdir -p src/pages/citizens
mkdir -p src/pages/requests
mkdir -p src/pages/rewards
mkdir -p src/pages/audit
mkdir -p src/pages/notifications
mkdir -p src/pages/profile
mkdir -p src/pages/errors

# Di chuyển files
mv src/pages/login/LoginPage.jsx src/pages/auth/LoginPage.jsx
mv src/pages/citizen/CitizenDashboard.jsx src/pages/dashboard/CitizenDashboard.jsx
mv src/pages/leader/LeaderDashboard.jsx src/pages/dashboard/LeaderDashboard.jsx
mv src/pages/citizen/MyHousehold.jsx src/pages/households/MyHouseholdPage.jsx
mv src/pages/citizen/MyRequests.jsx src/pages/requests/RequestHistoryPage.jsx
mv src/pages/citizen/MyRewards.jsx src/pages/rewards/RewardHistoryPage.jsx
mv src/pages/citizen/SubmitEditRequest.jsx src/pages/requests/SubmitEditRequestPage.jsx
mv src/pages/citizen/SubmitRewardProposal.jsx src/pages/rewards/SubmitRewardProposalPage.jsx
mv src/pages/leader/AuditLogs.jsx src/pages/audit/AuditLogPage.jsx
mv src/pages/NotFound.jsx src/pages/errors/NotFoundPage.jsx
mv src/pages/UnauthorizedPage.jsx src/pages/errors/UnauthorizedPage.jsx
```

### Bước 3: Chuyển đổi pages .tsx còn thiếu sang .jsx

Những pages này cần chuyển từ TypeScript → JavaScript:

- `HouseholdListPage.jsx` (từ .tsx)
- `HouseholdDetailPage.jsx` (từ .tsx)
- `CitizenListPage.jsx` (từ .tsx)
- `CitizenDetailPage.jsx` (từ .tsx)
- `EditRequestListPage.jsx` (từ .tsx)
- `EditRequestDetailPage.jsx` (từ .tsx)
- `RewardProposalListPage.jsx` (từ .tsx)
- `RewardProposalDetailPage.jsx` (từ .tsx)
- `NotificationPage.jsx` (từ .tsx)
- `ProfilePage.jsx` (từ .tsx)

### Bước 4: Thêm pages mới cho Reward Management

**🆕 Tạo 3 pages mới:**

1. **RewardEventListPage.jsx** - Quản lý các sự kiện phát quà (Trung thu, Tết,...)
2. **RewardDistributionPage.jsx** - Phân phối quà cho từng hộ
3. **StudentAchievementPage.jsx** - Quản lý thành tích học sinh & phát vở

### Bước 5: Cập nhật AppRouter.jsx

- Import routes mới
- Update paths theo cấu trúc mới
- Thêm routes cho Reward Management

### Bước 6: Xóa files duplicate

```bash
# Xóa tất cả .tsx pages
rm src/pages/*.tsx

# Xóa folders cũ (sau khi đã move)
rm -rf src/pages/citizen
rm -rf src/pages/leader
rm -rf src/pages/login
```

---

## ✨ LỢI ÍCH SAU KHI TÁI CẤU TRÚC:

✅ **Không còn duplicate code** - 1 chức năng chỉ có 1 file
✅ **Cấu trúc rõ ràng** - Dễ tìm files theo chức năng
✅ **JavaScript thuần** - Đơn giản, dễ học, dễ debug
✅ **UI nhất quán** - Dùng Layout chung cho tất cả pages
✅ **Dễ maintain** - Code tổ chức tốt, không rối
✅ **Performance tốt** - Không có overhead từ TypeScript

---

## 📝 GHI CHÚ QUAN TRỌNG:

1. **shadcn/ui**: Vẫn giữ lại components này (dù là .tsx) vì chúng hoạt động tốt
2. **API Calls**: Tạo `lib/api.js` để centralize axios instance
3. **Constants**: Tạo `constants/` để quản lý role, endpoints, routes
4. **Hooks**: Tạo custom hooks (`useAuth.js`, `useApi.js`) để reuse logic
5. **PropTypes**: Cân nhắc dùng PropTypes để validate props (thay vì TypeScript)

---

## 🎨 UI/UX CẢI THIỆN:

1. **Navigation**: Implement sidebar cho leader, bottom nav cho citizen
2. **Breadcrumbs**: Thêm breadcrumb navigation
3. **Toast Notifications**: Sử dụng sonner cho user feedback
4. **Dark Mode**: Cân nhắc thêm dark mode toggle
5. **Responsive**: Đảm bảo mobile-friendly

---

## 🚀 KẾ HOẠCH THỰC HIỆN TỪNG BƯỚC:

### ⚡ NHANH - Bạn muốn làm ngay (2-3 giờ):

1. **Tạo Layout.jsx** - Component chung cho tất cả pages
2. **Di chuyển files** - Reorganize theo cấu trúc mới
3. **Xóa .tsx files** - Loại bỏ TypeScript pages
4. **Update AppRouter.jsx** - Fix import paths

### 🎯 TRUNG BÌNH - Làm sau (1-2 ngày):

1. **Chuyển đổi .tsx → .jsx** - 10 pages cần convert
2. **Tạo 3 pages Reward Management mới**
3. **Tạo lib/api.js** - Centralize API calls
4. **Tạo constants/** - Role, endpoints, routes

### 🔥 DÀI HẠN - Cải thiện dần (1 tuần):

1. **Refactor UI** - Nhất quán design
2. **Add PropTypes** - Validate props
3. **Error Handling** - Toast notifications
4. **Testing** - Đảm bảo không bug

---

## ⚠️ LƯU Ý QUAN TRỌNG:

- **Backup code** trước khi xóa bất kỳ file nào
- **Test từng module** sau khi migrate
- **Update routes** trong AppRouter cẩn thận
- **Kiểm tra API endpoints** khớp với backend
- **Validation** toàn bộ forms sau khi chuyển đổi
