import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Space,
  message,
  Upload,
} from "antd";
import {
  FileTextOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SubmitEditRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requestTypes = [
    { value: "add_member", label: "Thêm nhân khẩu" },
    { value: "remove_member", label: "Xóa nhân khẩu" },
    { value: "update_info", label: "Chỉnh sửa thông tin" },
    { value: "split_household", label: "Tách hộ khẩu" },
    { value: "temporary_absence", label: "Tạm vắng" },
    { value: "temporary_residence", label: "Tạm trú" },
    { value: "other", label: "Khác" },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form values:", values);
      message.success("Gửi yêu cầu thành công!");
      form.resetFields();
      navigate("/citizen/my-requests");
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            <FileTextOutlined /> Gửi Yêu Cầu Chỉnh Sửa
          </Title>
          <Text type="secondary">
            Điền thông tin dưới đây để gửi yêu cầu chỉnh sửa hộ khẩu
          </Text>
        </div>

        <Card bordered={false}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark="optional"
          >
            <Form.Item
              name="requestType"
              label="Loại yêu cầu"
              rules={[
                { required: true, message: "Vui lòng chọn loại yêu cầu" },
              ]}
            >
              <Select
                size="large"
                placeholder="Chọn loại yêu cầu"
                options={requestTypes}
              />
            </Form.Item>

            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input size="large" placeholder="Nhập tiêu đề ngắn gọn" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả chi tiết"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả chi tiết" },
                { min: 20, message: "Mô tả phải có ít nhất 20 ký tự" },
              ]}
            >
              <TextArea
                rows={6}
                placeholder="Mô tả chi tiết yêu cầu của bạn..."
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Form.Item
              name="documents"
              label="Tài liệu đính kèm"
              extra="Tải lên các giấy tờ liên quan (nếu có)"
            >
              <Upload
                listType="picture"
                maxCount={5}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Chọn file</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại liên hệ"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Nhập số điện thoại"
                addonBefore="+84"
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<SendOutlined />}
                  loading={loading}
                >
                  Gửi yêu cầu
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate("/citizen/my-requests")}
                >
                  Hủy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default SubmitEditRequest;
