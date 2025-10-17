"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const HouseholdManagement = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/leader/dashboard")} className="text-blue-600 hover:text-blue-800">
              ← Quay lại
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Quản Lý Hộ Khẩu</h1>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Đăng xuất
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Danh Sách Hộ Khẩu</h2>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Mã Hộ</th>
                <th className="px-4 py-2 text-left">Chủ Hộ</th>
                <th className="px-4 py-2 text-left">Địa Chỉ</th>
                <th className="px-4 py-2 text-left">Số Nhân Khẩu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">HK001</td>
                <td className="px-4 py-2">Nguyễn Văn A</td>
                <td className="px-4 py-2">123 Đường ABC</td>
                <td className="px-4 py-2">4</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">HK002</td>
                <td className="px-4 py-2">Trần Thị B</td>
                <td className="px-4 py-2">456 Đường XYZ</td>
                <td className="px-4 py-2">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HouseholdManagement
