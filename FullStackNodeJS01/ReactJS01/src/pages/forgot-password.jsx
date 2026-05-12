import { Button, Col, Form, Input, notification, Row } from "antd";
import { forgotPasswordApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, oldPassword, newPassword } = values;
    const res = await forgotPasswordApi(email, oldPassword, newPassword);

    if (res && res.EC === 0) {
      notification.success({
        message: "Cập nhật mật khẩu",
        description: res.EM,
      });
      navigate("/login");
    } else {
      notification.error({ message: "Lỗi", description: res.EM });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: "15px", border: "1px solid #ccc" }}>
          <legend>Quên mật khẩu</legend>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span style={{ color: "#ccc" }}>Email</span>}
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: "#ccc" }}>Mật khẩu cũ</span>}
              name="oldPassword"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: "#ccc" }}>Mật khẩu mới</span>}
              name="newPassword"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form>
          <div style={{ marginTop: 10 }}>
            <Link to="/login">Quay lại đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};
export default ForgotPasswordPage;
