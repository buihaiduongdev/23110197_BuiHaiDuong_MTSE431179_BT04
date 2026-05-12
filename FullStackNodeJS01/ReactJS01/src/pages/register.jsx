import { Button, Col, Form, Input, notification, Row } from "antd";
import { createUserApi } from "../util/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserApi(name, email, password);
    if (res && res.EC === 0) {
      notification.success({ message: "Thành công", description: res.EM });
      navigate("/login");
    } else {
      notification.error({ message: "Lỗi", description: res.EM });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: "15px", border: "1px solid #ccc" }}>
          <legend>Đăng Ký Tài Khoản</legend>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span style={{ color: "#ccc" }}>Họ và tên</span>}
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: "#ccc" }}>Email</span>}
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: "#ccc" }}>Password</span>}
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};
export default RegisterPage;
