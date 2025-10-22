import React from "react";
import {
  Card,
  Descriptions,
  Table,
  Tag,
  Typography,
  Space,
  Avatar,
  Divider,
} from "antd";
import {
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import Layout from "../../components/Layout";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const MyHousehold = () => {
  // Mock data
  const householdInfo = {
    id: "HK-001",
    headOfHousehold: "Nguyễn Văn A",
    address: "123 Đường ABC, Phường 1, Quận 1, TP.HCM",
    phone: "0123456789",
    registrationDate: "2020-01-15",
    status: "active",
  };

  const members = [
    {
      key: "1",
      id: "NK-001",
      fullName: "Nguyễn Văn A",
      dateOfBirth: "1990-01-15",
      gender: "Nam",
      idCard: "001234567890",
      relationship: "Chủ hộ",
      phone: "0123456789",
    },
    {
      key: "2",
      id: "NK-002",
      fullName: "Trần Thị B",
      dateOfBirth: "1992-05-20",
      gender: "Nữ",
      idCard: "001234567891",
      relationship: "Vợ",
      phone: "0987654321",
    },
    {
      key: "3",
      id: "NK-003",
      fullName: "Nguyễn Văn C",
      dateOfBirth: "2015-08-10",
      gender: "Nam",
      idCard: "",
      relationship: "Con",
      phone: "",
    },
    {
      key: "4",
      id: "NK-004",
      fullName: "Nguyễn Thị D",
      dateOfBirth: "2018-03-25",
      gender: "Nữ",
      idCard: "",
      relationship: "Con",
      phone: "",
    },
  ];

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <Space>
          <Avatar
            icon={record.gender === "Nam" ? <ManOutlined /> : <WomanOutlined />}
            style={{
              backgroundColor: record.gender === "Nam" ? "#1890ff" : "#eb2f96",
            }}
          />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <Tag color={gender === "Nam" ? "blue" : "pink"}>{gender}</Tag>
      ),
    },
    {
      title: "CCCD/CMND",
      dataIndex: "idCard",
      key: "idCard",
      render: (text) => text || <Tag color="default">Chưa có</Tag>,
    },
    {
      title: "Quan hệ",
      dataIndex: "relationship",
      key: "relationship",
      render: (rel) => <Tag color="purple">{rel}</Tag>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || "-",
    },
  ];

  return (
    <Layout>
      <div>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            <TeamOutlined /> Hộ Khẩu Của Tôi
          </Title>
        </div>

        {/* Household Info Card */}
        <Card
          title={
            <Space>
              <EnvironmentOutlined />
              <span>Thông tin hộ khẩu</span>
            </Space>
          }
          bordered={false}
          style={{ marginBottom: 16 }}
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã hộ khẩu" span={2}>
              <Text strong style={{ fontSize: 16 }}>
                {householdInfo.id}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Chủ hộ">
              <Space>
                <UserOutlined />
                {householdInfo.headOfHousehold}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              <Space>
                <PhoneOutlined />
                {householdInfo.phone}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>
              <Space>
                <EnvironmentOutlined />
                {householdInfo.address}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đăng ký">
              {dayjs(householdInfo.registrationDate).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color="green">Hoạt động</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng thành viên" span={2}>
              <Text strong style={{ fontSize: 18, color: "#1890ff" }}>
                {members.length} người
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Divider />

        {/* Members Table */}
        <Card
          title={
            <Space>
              <TeamOutlined />
              <span>Danh sách thành viên ({members.length})</span>
            </Space>
          }
          bordered={false}
        >
          <Table
            columns={columns}
            dataSource={members}
            pagination={false}
            scroll={{ x: 1000 }}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default MyHousehold;
