import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Space,
  Typography,
} from "antd";
import WorldtekLogo from "../../components/common/worldTekLogo";

const { Option } = Select;
const { Text } = Typography;

interface AddCanteenModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const AddCanteenModal: React.FC<AddCanteenModalProps> = ({
  isOpen,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleSendOTP = () => {
    setShowOtpInput(true);
  };

  const formItemStyle = {
    marginBottom: "16px",
  };

  const inputStyle = {
    width: "100%",
    height: "40px",
  };

  return (
    <Modal
      className="add-canteen-modal"
      title="Add Canteen"
      open={isOpen}
      onCancel={onCancel}
      width={920}
      centered
      footer={null}
      bodyStyle={{ maxHeight: "75vh", overflowY: "auto", padding: "24px" }}
    >
      <Form form={form} layout="vertical" name="add_canteen_form">
        <Row gutter={24}>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="canteenName"
              label="Canteen Name"
              rules={[{ required: true, message: "Please enter canteen name" }]}
              style={formItemStyle}
            >
              <Input placeholder="Enter Canteen name" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="canteenCode"
              label="Canteen CODE"
              rules={[{ required: true, message: "Please enter canteen code" }]}
              style={formItemStyle}
            >
              <Input placeholder="Enter Canteen Code" style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter first name" }]}
              style={formItemStyle}
            >
              <Input placeholder="Enter First Name" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please enter last name" }]}
              style={formItemStyle}
            >
              <Input placeholder="Enter Last Name" style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="dob"
              label="DOB"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
              style={formItemStyle}
            >
              <DatePicker
                placeholder="DD/MM/YYYY"
                style={inputStyle}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender" }]}
              style={formItemStyle}
            >
              <Select placeholder="Select Gender" style={inputStyle}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please enter mobile number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              ]}
              style={formItemStyle}
            >
              <Input placeholder="Enter Mobile Number" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="emailId"
              label="Email ID"
              rules={[
                { required: true, message: "Please enter email ID" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              style={formItemStyle}
            >
              <Input placeholder="Enter Email ID" style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item
              name="aadhaarCardNumber"
              label="Aadhaar Card Number"
              rules={[
                { required: true, message: "Please enter Aadhaar Card Number" },
                {
                  pattern: /^[0-9]{12}$/,
                  message: "Please enter a valid 12-digit Aadhaar number",
                },
              ]}
              style={formItemStyle}
            >
              <Input.Group compact>
                <Input
                  placeholder="Enter Aadhaar Card Number"
                  style={{
                    width: "48.5%",
                    height: "40px",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  type="link"
                  onClick={handleSendOTP}
                  style={{
                    width: "80px",
                    height: "40px",
                    color: "#1890ff",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Send OTP
                </Button>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>

        {showOtpInput && (
          <Row style={{ marginBottom: "24px" }}>
            <Col span={24}>
              <Form.Item
                name="otp"
                label="Enter OTP"
                rules={[{ required: true, message: "Please enter OTP" }]}
              >
                <Row justify="center" gutter={16}>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <Col key={index}>
                      <Input
                        maxLength={1}
                        style={{
                          width: "50px",
                          height: "50px",
                          textAlign: "center",
                          fontSize: "20px",
                          marginRight: index < 5 ? "8px" : "0",
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row justify="center" style={{ marginTop: "24px" }}>
          <Col xs={24} sm={12} md={8}>
            <Button
              type="primary"
              block
              onClick={handleOk}
              style={{ height: "40px" }}
            >
              Confirm
            </Button>
          </Col>
        </Row>

        <WorldtekLogo />
      </Form>
    </Modal>
  );
};

export default AddCanteenModal;
