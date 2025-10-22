import React, { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Typography,
  Space,
  Button,
  Empty,
  Modal,
  Descriptions,
} from "antd";
import {
  FileTextOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const MyRequests = () => {
  const navigate = useNavigate();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  // Mock data
  const requests = [
    {
      key: "1",
      id: "REQ-001",
      type: "Thêm nhân khẩu",
      title: "Thêm con mới sinh",
      description: "Thêm con mới sinh vào hộ khẩu",
      submitDate: "2024-10-20",
      status: "pending",
    },
    {
      key: "2",
      id: "REQ-002",
      type: "Chỉnh sửa thông tin",
      title: "Cập nhật số CCCD",
      description: "Cập nhật số CCCD mới sau khi đổi",
      submitDate: "2024-10-15",
      status: "approved",
      reviewDate: "2024-10-16",
      reviewer: "Tổ trưởng",
      reviewNote: "Đã kiểm tra và phê duyệt",
    },
    {
      key: "3",
      id: "REQ-003",
      type: "Tạm vắng",
      title: "Đăng ký tạm vắng",
      description: "Đi công tác dài hạn 6 tháng",
      submitDate: "2024-10-10",
      status: "rejected",
      reviewDate: "2024-10-11",
      reviewer: "Tổ trưởng",
      reviewNote: "Thiếu giấy xác nhận từ công ty",
    },
  ];

  const statusConfig = {
    pending: {
      color: "gold",
      text: "Chờ duyệt",
      icon: <ClockCircleOutlined />,
    },
    approved: {
      color: "green",
      text: "Đã duyệt",
      icon: <CheckCircleOutlined />,
    },
    rejected: {
      color: "red",
      text: "Từ chối",
      icon: <CloseCircleOutlined />,
    },
  };

  const columns = [
    {
      title: "Mã yêu cầu",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Loại yêu cầu",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày gửi",
      dataIndex: "submitDate",
      key: "submitDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const config = statusConfig[status];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleView = (record) => {
    setCurrentRequest(record);
    setViewModalVisible(true);
  };

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <Layout>
      <div>
        {/* Page Header */}
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              <FileTextOutlined /> Yêu Cầu Của Tôi
            </Title>
            <Text type="secondary">
              Danh sách các yêu cầu chỉnh sửa hộ khẩu
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => navigate("/citizen/submit-edit-request")}
          >
            Tạo yêu cầu mới
          </Button>
        </div>

        {/* Statistics */}
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <Space size="large">
            <div>
              <Text type="secondary">Tổng yêu cầu</Text>
              <Title level={3} style={{ margin: 0 }}>
                {stats.total}
              </Title>
            </div>
            <div>
              <Text type="secondary">Chờ duyệt</Text>
              <Title level={3} style={{ margin: 0, color: "#faad14" }}>
                {stats.pending}
              </Title>
            </div>
            <div>
              <Text type="secondary">Đã duyệt</Text>
              <Title level={3} style={{ margin: 0, color: "#52c41a" }}>
                {stats.approved}
              </Title>
            </div>
            <div>
              <Text type="secondary">Từ chối</Text>
              <Title level={3} style={{ margin: 0, color: "#ff4d4f" }}>
                {stats.rejected}
              </Title>
            </div>
          </Space>
        </Card>

        {/* Table */}
        <Card bordered={false}>
          {requests.length === 0 ? (
            <Empty
              description="Bạn chưa có yêu cầu nào"
              style={{ padding: "60px 0" }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/citizen/submit-edit-request")}
              >
                Tạo yêu cầu mới
              </Button>
            </Empty>
          ) : (
            <Table
              columns={columns}
              dataSource={requests}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Tổng ${total} yêu cầu`,
              }}
              scroll={{ x: 1000 }}
            />
          )}
        </Card>

        {/* View Modal */}
        <Modal
          title="Chi tiết yêu cầu"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Đóng
            </Button>,
          ]}
          width={700}
        >
          {currentRequest && (
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Mã yêu cầu" span={2}>
                <Text strong>{currentRequest.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Loại yêu cầu" span={2}>
                <Tag color="blue">{currentRequest.type}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tiêu đề" span={2}>
                {currentRequest.title}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={2}>
                {currentRequest.description}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày gửi">
                {dayjs(currentRequest.submitDate).format("DD/MM/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {statusConfig[currentRequest.status] && (
                  <Tag
                    color={statusConfig[currentRequest.status].color}
                    icon={statusConfig[currentRequest.status].icon}
                  >
                    {statusConfig[currentRequest.status].text}
                  </Tag>
                )}
              </Descriptions.Item>
              {currentRequest.reviewDate && (
                <>
                  <Descriptions.Item label="Ngày duyệt">
                    {dayjs(currentRequest.reviewDate).format("DD/MM/YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Người duyệt">
                    {currentRequest.reviewer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú" span={2}>
                    {currentRequest.reviewNote}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default MyRequests;

