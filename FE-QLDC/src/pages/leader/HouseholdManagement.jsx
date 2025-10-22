import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Typography,
  Modal,
  Form,
  Select,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { householdService, citizenService } from "../../services";

const { Title } = Typography;
const { Option } = Select;

const HouseholdManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingHousehold, setEditingHousehold] = useState(null);
  const [form] = Form.useForm();
  const [households, setHouseholds] = useState([]);
  const [citizens, setCitizens] = useState([]);

  // Fetch households and citizens from API
  useEffect(() => {
    fetchHouseholds();
    fetchCitizens();
  }, []);

  const fetchCitizens = async () => {
    try {
      const response = await citizenService.getAll();
      const data = response.docs || response || [];
      setCitizens(data);
    } catch (error) {
      console.error("Error fetching citizens:", error);
    }
  };

  const fetchHouseholds = async () => {
    try {
      setLoading(true);
      const response = await householdService.getAll();
      // Backend returns { docs, total, page, limit }
      const data = response.docs || response || [];
      setHouseholds(
        data.map((h) => ({
          key: h._id,
          id: h.code || h._id,
          headOfHousehold: h.head?.fullName || "N/A",
          headId: h.head?._id || h.head,
          address: h.address
            ? `${h.address.street || ""}, ${h.address.ward || ""}, ${
                h.address.district || ""
              }, ${h.address.city || ""}`.replace(/^,\s*|,\s*,/g, "")
            : "N/A",
          addressObject: h.address,
          members: h.members?.length || 0,
          phone: h.phone,
          status: h.status || "ACTIVE",
        }))
      );
    } catch (error) {
      console.error("Error fetching households:", error);
      message.error("Không thể tải danh sách hộ khẩu");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Mã hộ khẩu",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Space>
          <TeamOutlined style={{ color: "#1890ff" }} />
          <span style={{ fontWeight: "bold" }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Chủ hộ",
      dataIndex: "headOfHousehold",
      key: "headOfHousehold",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Số thành viên",
      dataIndex: "members",
      key: "members",
      align: "center",
      render: (num) => (
        <Tag color="blue">
          {num} {num > 1 ? "người" : "người"}
        </Tag>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          ACTIVE: { color: "green", text: "Hoạt động" },
          MOVED: { color: "orange", text: "Đã chuyển đi" },
          SPLIT: { color: "blue", text: "Đã tách hộ" },
          MERGED: { color: "purple", text: "Đã gộp hộ" },
          INACTIVE: { color: "default", text: "Không hoạt động" },
        };
        const config = statusConfig[status] || {
          color: "default",
          text: status,
        };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa hộ khẩu này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleView = (record) => {
    navigate(`/leader/households/${record.id}`);
  };

  const handleEdit = (record) => {
    setEditingHousehold(record);
    form.setFieldsValue({
      code: record.id,
      head: record.headId,
      street: record.addressObject?.street || "",
      ward: record.addressObject?.ward || "",
      district: record.addressObject?.district || "",
      city: record.addressObject?.city || "",
      phone: record.phone,
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (key) => {
    try {
      await householdService.delete(key);
      message.success("Đã xóa hộ khẩu thành công");
      fetchHouseholds(); // Refresh list
    } catch (error) {
      console.error("Error deleting household:", error);
      message.error("Không thể xóa hộ khẩu");
    }
  };

  const handleAdd = () => {
    setEditingHousehold(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      const householdData = {
        code: values.code,
        head: values.head,
        address: {
          street: values.street,
          ward: values.ward,
          district: values.district,
          city: values.city,
        },
        phone: values.phone,
        status: values.status,
      };

      if (editingHousehold) {
        // Update existing household
        await householdService.update(editingHousehold.key, householdData);
        message.success("Cập nhật hộ khẩu thành công");
      } else {
        // Create new household
        await householdService.create(householdData);
        message.success("Thêm hộ khẩu mới thành công");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingHousehold(null);
      fetchHouseholds(); // Refresh list
    } catch (error) {
      console.error("Error saving household:", error);
      const errorMsg = error.response?.data?.message || error.message;
      message.error(
        editingHousehold
          ? `Không thể cập nhật: ${errorMsg}`
          : `Không thể thêm mới: ${errorMsg}`
      );
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingHousehold(null);
  };

  const filteredHouseholds = households.filter((household) =>
    Object.values(household).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Layout>
      <div>
        {/* Page Header */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Quản Lý Hộ Khẩu
          </Title>
        </div>

        {/* Action Bar */}
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Input
              placeholder="Tìm kiếm hộ khẩu..."
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm hộ khẩu mới
            </Button>
          </Space>
        </Card>

        {/* Table */}
        <Card bordered={false}>
          <Table
            columns={columns}
            dataSource={filteredHouseholds}
            loading={loading}
            pagination={{
              total: filteredHouseholds.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} hộ khẩu`,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          title={editingHousehold ? "Chỉnh sửa hộ khẩu" : "Thêm hộ khẩu mới"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={600}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="code"
              label="Mã hộ khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mã hộ khẩu" }]}
            >
              <Input
                placeholder="Nhập mã hộ khẩu (VD: HK-001)"
                disabled={!!editingHousehold}
              />
            </Form.Item>

            <Form.Item
              name="head"
              label="Chủ hộ"
              rules={[{ required: true, message: "Vui lòng chọn chủ hộ" }]}
            >
              <Select
                placeholder="Chọn chủ hộ"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {Array.isArray(citizens) &&
                  citizens.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.fullName} - {c.nationalId || "Chưa có CCCD"}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Space style={{ width: "100%" }} size="large">
              <Form.Item
                name="street"
                label="Số nhà / Đường"
                style={{ flex: 1 }}
              >
                <Input placeholder="Nhập số nhà, đường" />
              </Form.Item>

              <Form.Item name="ward" label="Phường / Xã" style={{ flex: 1 }}>
                <Input placeholder="Nhập phường/xã" />
              </Form.Item>
            </Space>

            <Space style={{ width: "100%" }} size="large">
              <Form.Item
                name="district"
                label="Quận / Huyện"
                style={{ flex: 1 }}
              >
                <Input placeholder="Nhập quận/huyện" />
              </Form.Item>

              <Form.Item
                name="city"
                label="Tỉnh / Thành phố"
                style={{ flex: 1 }}
              >
                <Input placeholder="Nhập tỉnh/thành phố" />
              </Form.Item>
            </Space>

            <Form.Item name="phone" label="Số điện thoại">
              <Input placeholder="Nhập số điện thoại (không bắt buộc)" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
              initialValue="ACTIVE"
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="ACTIVE">Hoạt động</Option>
                <Option value="MOVED">Đã chuyển đi</Option>
                <Option value="SPLIT">Đã tách hộ</Option>
                <Option value="MERGED">Đã gộp hộ</Option>
                <Option value="INACTIVE">Không hoạt động</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HouseholdManagement;
