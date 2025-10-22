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
  DatePicker,
  message,
  Popconfirm,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { citizenService, householdService } from "../../services";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const CitizenManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCitizen, setEditingCitizen] = useState(null);
  const [form] = Form.useForm();
  const [citizens, setCitizens] = useState([]);
  const [households, setHouseholds] = useState([]);

  // Fetch citizens from API
  useEffect(() => {
    fetchCitizens();
    fetchHouseholds();
  }, []);

  const fetchCitizens = async () => {
    try {
      setLoading(true);
      const response = await citizenService.getAll();
      // Backend returns { docs, total, page, limit }
      const data = response.docs || response || [];
      setCitizens(
        data.map((c) => ({
          key: c._id,
          id: c.code || c._id,
          fullName: c.fullName,
          dateOfBirth: c.dateOfBirth,
          gender:
            c.gender === "MALE" ? "Nam" : c.gender === "FEMALE" ? "Nữ" : "Khác",
          genderValue: c.gender, // Keep original for edit
          idCard: c.nationalId, // Backend uses 'nationalId'
          household: c.household?.code || "Chưa có hộ khẩu",
          householdId: c.household?._id || c.household,
          relationship: c.relationshipToHead,
          phone: c.phone,
          status: c.status === "ALIVE" ? "active" : "inactive",
          statusValue: c.status, // Keep original
        }))
      );
    } catch (error) {
      console.error("Error fetching citizens:", error);
      message.error("Không thể tải danh sách nhân khẩu");
    } finally {
      setLoading(false);
    }
  };

  const fetchHouseholds = async () => {
    try {
      const response = await householdService.getAll();
      // Backend returns { docs, total, page, limit }
      const data = response.docs || response || [];
      setHouseholds(data);
    } catch (error) {
      console.error("Error fetching households:", error);
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      fixed: "left",
      width: 200,
      render: (text, record) => (
        <Space>
          <Avatar
            size="small"
            icon={record.gender === "Nam" ? <ManOutlined /> : <WomanOutlined />}
            style={{
              backgroundColor: record.gender === "Nam" ? "#1890ff" : "#eb2f96",
            }}
          />
          <span style={{ fontWeight: "bold" }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Mã NK",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 120,
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      align: "center",
      render: (gender) => (
        <Tag color={gender === "Nam" ? "blue" : "pink"}>{gender}</Tag>
      ),
    },
    {
      title: "CCCD/CMND",
      dataIndex: "idCard",
      key: "idCard",
      width: 150,
      render: (text) => text || <Tag color="default">Chưa có</Tag>,
    },
    {
      title: "Hộ khẩu",
      dataIndex: "household",
      key: "household",
      width: 120,
    },
    {
      title: "Quan hệ",
      dataIndex: "relationship",
      key: "relationship",
      width: 120,
      render: (rel) => <Tag color="purple">{rel}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={status === "active" ? "green" : "default"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 200,
      align: "center",
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
            title="Bạn có chắc muốn xóa nhân khẩu này?"
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
    navigate(`/leader/citizens/${record.id}`);
  };

  const handleEdit = (record) => {
    setEditingCitizen(record);
    form.setFieldsValue({
      fullName: record.fullName,
      dateOfBirth: dayjs(record.dateOfBirth),
      gender: record.gender, // Already converted to "Nam"/"Nữ"
      idCard: record.idCard,
      household: record.householdId,
      relationship: record.relationship,
      phone: record.phone,
      status: record.status, // Already converted to "active"/"inactive"
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (key) => {
    try {
      await citizenService.delete(key);
      message.success("Đã xóa nhân khẩu thành công");
      fetchCitizens(); // Refresh list
    } catch (error) {
      console.error("Error deleting citizen:", error);
      message.error("Không thể xóa nhân khẩu");
    }
  };

  const handleAdd = () => {
    setEditingCitizen(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      const citizenData = {
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        gender:
          values.gender === "Nam"
            ? "MALE"
            : values.gender === "Nữ"
            ? "FEMALE"
            : "OTHER",
        nationalId: values.idCard, // Backend uses 'nationalId', not 'idCard'
        household: values.household, // Backend uses 'household', not 'householdId'
        relationshipToHead: values.relationship, // Backend uses 'relationshipToHead'
        phone: values.phone,
        status: values.status === "active" ? "ALIVE" : "MOVED_OUT",
      };

      if (editingCitizen) {
        // Update existing citizen
        await citizenService.update(editingCitizen.key, citizenData);
        message.success("Cập nhật nhân khẩu thành công");
      } else {
        // Create new citizen
        await citizenService.create(citizenData);
        message.success("Thêm nhân khẩu mới thành công");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingCitizen(null);
      fetchCitizens(); // Refresh list
    } catch (error) {
      console.error("Error saving citizen:", error);
      message.error(
        editingCitizen
          ? "Không thể cập nhật nhân khẩu"
          : "Không thể thêm nhân khẩu mới"
      );
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCitizen(null);
  };

  const filteredCitizens = citizens.filter((citizen) =>
    Object.values(citizen).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Layout>
      <div>
        {/* Page Header */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Quản Lý Nhân Khẩu
          </Title>
        </div>

        {/* Action Bar */}
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Input
              placeholder="Tìm kiếm nhân khẩu..."
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Thêm nhân khẩu mới
            </Button>
          </Space>
        </Card>

        {/* Table */}
        <Card bordered={false}>
          <Table
            columns={columns}
            dataSource={filteredCitizens}
            loading={loading}
            pagination={{
              total: filteredCitizens.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} nhân khẩu`,
            }}
            scroll={{ x: 1400 }}
          />
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          title={editingCitizen ? "Chỉnh sửa nhân khẩu" : "Thêm nhân khẩu mới"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={700}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nhập họ và tên đầy đủ" />
            </Form.Item>

            <Space style={{ width: "100%" }} size="large">
              <Form.Item
                name="dateOfBirth"
                label="Ngày sinh"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                style={{ flex: 1 }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày sinh"
                />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                style={{ flex: 1 }}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                </Select>
              </Form.Item>
            </Space>

            <Form.Item name="idCard" label="CCCD/CMND">
              <Input placeholder="Nhập số CCCD/CMND" maxLength={12} />
            </Form.Item>

            <Space style={{ width: "100%" }} size="large">
              <Form.Item
                name="household"
                label="Hộ khẩu (không bắt buộc - có thể gán sau)"
                style={{ flex: 1 }}
              >
                <Select
                  placeholder="Chọn hộ khẩu (hoặc bỏ trống)"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {Array.isArray(households) &&
                    households.map((h) => (
                      <Option key={h._id} value={h._id}>
                        {h.code || h._id} - {h.headOfHousehold}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="relationship"
                label="Quan hệ với chủ hộ (nếu có)"
                style={{ flex: 1 }}
              >
                <Select placeholder="Chọn quan hệ">
                  <Option value="Chủ hộ">Chủ hộ</Option>
                  <Option value="Vợ">Vợ</Option>
                  <Option value="Chồng">Chồng</Option>
                  <Option value="Con">Con</Option>
                  <Option value="Cha">Cha</Option>
                  <Option value="Mẹ">Mẹ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>
            </Space>

            <Form.Item name="phone" label="Số điện thoại">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
              initialValue="active"
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Không hoạt động</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default CitizenManagement;
