import React, { useState } from "react";
import { Input, Button, Row, Col, Typography, Form } from "antd";
import "../App.css"

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = () => {
    console.log("Phone:", phone);
    console.log("OTP:", otp);
    // Implement your login logic here
  };

  return (
    <Row className="login-container">
      {/* Left Side */}
      <Col span={12} className="login-left">
        <div className="login-form">
          <Title level={2}>Login</Title>
          <Form layout="vertical">
            <Form.Item label="Phone Number">
              <Input
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="OTP">
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block onClick={handleLogin}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>

      {/* Right Side */}
      <Col span={12} className="login-right">
        <img
          src="https://www.joinindiannavy.gov.in/images/octaginal-crest.png" // Replace with actual path
          alt="Logo"
          className="login-logo"
        />
      </Col>
    </Row>
  );
};

export default LoginPage;
