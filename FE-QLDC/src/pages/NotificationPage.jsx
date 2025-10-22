import React, { useState } from "react";
import {
  Card,
  List,
  Tag,
  Typography,
  Space,
  Button,
  Avatar,
  Empty,
  Badge,
  Segmented,
} from "antd";
import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const { Title, Text } = Typography;

const NotificationPage = () => {
  const [filter, setFilter] = useState("all");

  // Mock data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Yêu cầu của bạn đã được duyệt",
      description: "Yêu cầu REQ-002 chỉnh sửa thông tin đã được phê duyệt",
      time: "2024-10-20 14:30:00",
      read: false,
      icon: CheckCircleOutlined,
      color: "#52c41a",
    },
    {
      id: 2,
      type: "info",
      title: "Thông báo khen thưởng mới",
      description:
        "Sự kiện Tết Thiếu Nhi 1-6 sắp diễn ra. Mời bạn tham gia đăng ký",
      time: "2024-10-19 10:00:00",
      read: false,
      icon: GiftOutlined,
      color: "#1890ff",
    },
    {
      id: 3,
      type: "pending",
      title: "Yêu cầu đang được xử lý",
      description: "Yêu cầu REQ-003 đang được tổ trưởng xem xét",
      time: "2024-10-18 16:45:00",
      read: true,
      icon: ClockCircleOutlined,
      color: "#faad14",
    },
    {
      id: 4,
      type: "info",
      title: "Cập nhật hệ thống",
      description: "Hệ thống sẽ bảo trì vào 22:00 hôm nay",
      time: "2024-10-17 09:00:00",
      read: true,
      icon: InfoCircleOutlined,
      color: "#722ed1",
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Layout>
      <div>
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space>
            <Title level={2} style={{ marginBottom: 0 }}>
              <BellOutlined /> Thông Báo
            </Title>
            {unreadCount > 0 && (
              <Badge
                count={unreadCount}
                style={{ backgroundColor: "#ff4d4f" }}
              />
            )}
          </Space>
          {unreadCount > 0 && (
            <Button type="primary" onClick={handleMarkAllAsRead}>
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>

        <Card bordered={false} style={{ marginBottom: 16 }}>
          <Segmented
            options={[
              { label: `Tất cả (${notifications.length})`, value: "all" },
              { label: `Chưa đọc (${unreadCount})`, value: "unread" },
              {
                label: `Đã đọc (${notifications.length - unreadCount})`,
                value: "read",
              },
            ]}
            value={filter}
            onChange={setFilter}
            block
          />
        </Card>

        <Card bordered={false}>
          {filteredNotifications.length === 0 ? (
            <Empty description="Không có thông báo nào" />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={filteredNotifications}
              renderItem={(item) => {
                const IconComponent = item.icon;
                return (
                  <List.Item
                    style={{
                      backgroundColor: item.read ? "transparent" : "#f0f5ff",
                      padding: "16px",
                      borderRadius: 8,
                      marginBottom: 12,
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onClick={() => !item.read && handleMarkAsRead(item.id)}
                    actions={[
                      !item.read && (
                        <Button
                          type="link"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(item.id);
                          }}
                        >
                          Đánh dấu đã đọc
                        </Button>
                      ),
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={!item.read} offset={[-5, 5]}>
                          <Avatar
                            icon={<IconComponent />}
                            style={{
                              backgroundColor: item.color,
                              width: 48,
                              height: 48,
                            }}
                          />
                        </Badge>
                      }
                      title={
                        <Space>
                          <Text strong={!item.read}>{item.title}</Text>
                          {!item.read && (
                            <Tag color="blue" style={{ marginLeft: 8 }}>
                              Mới
                            </Tag>
                          )}
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={4}>
                          <Text type="secondary">{item.description}</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            <ClockCircleOutlined /> {dayjs(item.time).fromNow()}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default NotificationPage;
