import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Button,
  List,
  Tag,
  Avatar,
  Statistic,
} from "antd";
import {
  TeamOutlined,
  FileTextOutlined,
  GiftOutlined,
  BellOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const { Title, Text, Paragraph } = Typography;

const CitizenDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const householdInfo = {
    id: "HK-001",
    headOfHousehold: "Nguyễn Văn A",
    address: "123 Đường ABC, Phường 1, Quận 1",
    members: 4,
  };

  const myRequests = [
    {
      id: "REQ-001",
      type: "Thêm nhân khẩu",
      date: "2024-10-20",
      status: "pending",
    },
    {
      id: "REQ-002",
      type: "Chỉnh sửa thông tin",
      date: "2024-10-15",
      status: "approved",
    },
  ];

  const myRewards = [
    {
      id: "RW-001",
      event: "Trung Thu 2024",
      amount: "200,000 VNĐ",
      date: "2024-09-15",
    },
    {
      id: "RW-002",
      event: "Học sinh giỏi",
      amount: "500,000 VNĐ",
      date: "2024-08-01",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Yêu cầu của bạn đã được duyệt",
      description: "Yêu cầu REQ-002 đã được phê duyệt",
      time: "2 giờ trước",
      read: false,
    },
    {
      id: 2,
      title: "Thông báo khen thưởng mới",
      description: "Sự kiện Tết Thiếu Nhi 1-6 sắp diễn ra",
      time: "1 ngày trước",
      read: true,
    },
  ];

  return (
    <Layout>
      <div>
        {/* Welcome Header */}
        <Card
          style={{
            marginBottom: 24,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
          }}
          bodyStyle={{ padding: "32px" }}
        >
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar size={64} icon={<UserOutlined />} />
            </Col>
            <Col flex="auto">
              <Title level={3} style={{ color: "white", marginBottom: 4 }}>
                Chào mừng trở lại, {householdInfo.headOfHousehold}!
              </Title>
              <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
                Hộ khẩu: {householdInfo.id} | {householdInfo.members} thành viên
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Quick Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Card bordered={false} hoverable>
              <Statistic
                title="Thành viên hộ gia đình"
                value={householdInfo.members}
                prefix={<TeamOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} hoverable>
              <Statistic
                title="Yêu cầu đã gửi"
                value={myRequests.length}
                prefix={<FileTextOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} hoverable>
              <Statistic
                title="Khen thưởng nhận được"
                value={myRewards.length}
                prefix={<GiftOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Household Info */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <TeamOutlined />
                  <span>Thông tin hộ khẩu</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => navigate("/citizen/household")}
                >
                  Xem chi tiết
                </Button>
              }
              bordered={false}
              style={{ height: "100%" }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div>
                  <Text type="secondary">Mã hộ khẩu:</Text>
                  <br />
                  <Text strong>{householdInfo.id}</Text>
                </div>
                <div>
                  <Text type="secondary">Chủ hộ:</Text>
                  <br />
                  <Text strong>{householdInfo.headOfHousehold}</Text>
                </div>
                <div>
                  <Text type="secondary">Địa chỉ:</Text>
                  <br />
                  <Text strong>{householdInfo.address}</Text>
                </div>
                <div>
                  <Text type="secondary">Số thành viên:</Text>
                  <br />
                  <Text strong>{householdInfo.members} người</Text>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Quick Actions */}
          <Col xs={24} lg={12}>
            <Card
              title="Thao tác nhanh"
              bordered={false}
              style={{ height: "100%" }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Button
                  type="primary"
                  icon={<FileTextOutlined />}
                  size="large"
                  block
                  onClick={() => navigate("/citizen/submit-edit-request")}
                >
                  Gửi yêu cầu chỉnh sửa
                </Button>
                <Button
                  type="default"
                  icon={<TrophyOutlined />}
                  size="large"
                  block
                  onClick={() => navigate("/citizen/submit-reward-proposal")}
                >
                  Đề xuất khen thưởng
                </Button>
                <Button
                  type="default"
                  icon={<TeamOutlined />}
                  size="large"
                  block
                  onClick={() => navigate("/citizen/household")}
                >
                  Xem hộ khẩu của tôi
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* Recent Requests */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <FileTextOutlined />
                  <span>Yêu cầu gần đây</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => navigate("/citizen/my-requests")}
                >
                  Xem tất cả
                </Button>
              }
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={myRequests}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={
                            item.status === "approved" ? (
                              <CheckCircleOutlined />
                            ) : (
                              <ClockCircleOutlined />
                            )
                          }
                          style={{
                            backgroundColor:
                              item.status === "approved"
                                ? "#52c41a"
                                : "#faad14",
                          }}
                        />
                      }
                      title={
                        <Space>
                          <Text strong>{item.type}</Text>
                          <Tag
                            color={
                              item.status === "approved" ? "success" : "warning"
                            }
                          >
                            {item.status === "approved"
                              ? "Đã duyệt"
                              : "Chờ duyệt"}
                          </Tag>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={0}>
                          <Text type="secondary">{item.id}</Text>
                          <Text type="secondary">{item.date}</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Recent Rewards */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <GiftOutlined />
                  <span>Khen thưởng gần đây</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => navigate("/citizen/my-rewards")}
                >
                  Xem tất cả
                </Button>
              }
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={myRewards}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<TrophyOutlined />}
                          style={{ backgroundColor: "#eb2f96" }}
                        />
                      }
                      title={<Text strong>{item.event}</Text>}
                      description={
                        <Space direction="vertical" size={0}>
                          <Text type="secondary">{item.amount}</Text>
                          <Text type="secondary">{item.date}</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Notifications */}
        <Card
          title={
            <Space>
              <BellOutlined />
              <span>Thông báo</span>
            </Space>
          }
          extra={
            <Button type="link" onClick={() => navigate("/notifications")}>
              Xem tất cả
            </Button>
          }
          bordered={false}
          style={{ marginTop: 16 }}
        >
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                style={{
                  backgroundColor: item.read ? "transparent" : "#f0f5ff",
                  padding: "12px 16px",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<BellOutlined />}
                      style={{
                        backgroundColor: item.read ? "#d9d9d9" : "#1890ff",
                      }}
                    />
                  }
                  title={<Text strong={!item.read}>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">{item.description}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.time}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default CitizenDashboard;
