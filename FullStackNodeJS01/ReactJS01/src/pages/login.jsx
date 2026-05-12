import { Button, Col, Form, Input, notification, Row } from "antd";
import { loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);

    if (res && res.EC === 0) {
      localStorage.setItem("access_token", res.access_token);
      setAuth({
        isAuthenticated: true,
        user: {
          email: res.user.email,
          name: res.user.name,
          role: res.user.role,
        },
      });
      notification.success({
        message: "Thành công",
        description: "Đăng nhập thành công",
      });
      navigate("/");
    } else {
      notification.error({
        message: "Lỗi",
        description: res.EM ?? "Lỗi đăng nhập",
      });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{ padding: "15px", border: "1px solid #ccc" }}>
          <legend>Đăng Nhập</legend>
          <Form layout="vertical" onFinish={onFinish}>
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
              Đăng nhập
            </Button>
          </Form>
          <div style={{ marginTop: 10 }}>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};
export default LoginPage;
