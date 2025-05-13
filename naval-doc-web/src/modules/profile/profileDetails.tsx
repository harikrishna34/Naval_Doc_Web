import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

interface ProfileData {
  name: string;
  gender: string;
  dateOfBirth: string;
  mobileNo: string;
  emailId: string;
}

const ProfileDetails: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    gender: "",
    dateOfBirth: "",
    mobileNo: "",
    emailId: "",
  });

  const handleEdit = () => {
    form.setFieldsValue({
      name: profileData.name !== "" ? profileData.name : "",
      gender: profileData.gender !== "" ? profileData.gender : undefined,
      dateOfBirth:
        profileData.dateOfBirth !== ""
          ? dayjs(profileData.dateOfBirth)
          : undefined,
      mobileNo: profileData.mobileNo !== "" ? profileData.mobileNo : "",
      emailId: profileData.emailId !== "" ? profileData.emailId : "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSubmit = (values: any) => {
    setProfileData({
      name: values.name,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD")
        : "-",
      mobileNo: values.mobileNo,
      emailId: values.emailId,
    });
    setIsEditing(false);
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: "20px",
    border: "2px solid #2657BC",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    marginBottom: "20px",
    width: "100%",
  };

  const titleStyle: React.CSSProperties = {
    color: "#2657BC",
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "26px",
    textAlign: "center",
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: "30px",
    fontSize: "14px",
  };

  const labelStyle: React.CSSProperties = {
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "left",
    display: "block",
    wordBreak: "break-word",
  };

  const valueStyle: React.CSSProperties = {
    color: "#666",
    fontSize: "18px",
    wordBreak: "break-word", // Prevents text overflow
  };

  const colLabelStyle: React.CSSProperties = {
    textAlign: "left",
    paddingLeft: "20px",
  };

  const colValueStyle: React.CSSProperties = {
    textAlign: "left",
  };

  // Use responsive column sizes
  const getColSpans = () => {
    // For screens smaller than 576px
    const xs = { labelSpan: 24, valueSpan: 24, separatorSpan: 0 };
    // For screens 576px and larger (sm)
    const sm = { labelSpan: 8, valueSpan: 15, separatorSpan: 1 };
    // For screens 992px and larger (lg)
    const lg = { labelSpan: 5, valueSpan: 18, separatorSpan: 1 };

    return { xs, sm, lg };
  };

  const colSpans = getColSpans();

  // Field definitions for both viewing and editing mode
  const profileFields = [
    {
      label: "Name",
      value: profileData.name || "-",
      editField: (
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
          style={{ margin: 0 }}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      label: "Gender",
      value: profileData.gender || "-",
      editField: (
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Please select your gender" }]}
          style={{ margin: 0 }}
        >
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      label: "Date Of Birth",
      value: profileData.dateOfBirth || "-",
      editField: (
        <Form.Item
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please select your date of birth" },
          ]}
          style={{ margin: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      ),
    },
    {
      label: "Mobile No",
      value: profileData.mobileNo || "-",
      editField: (
        <Form.Item
          name="mobileNo"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            {
              pattern: /^\d{10}$/,
              message: "Please enter a valid 10-digit mobile number",
            },
          ]}
          style={{ margin: 0 }}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      label: "Email Id",
      value: profileData.emailId || "-",
      editField: (
        <Form.Item
          name="emailId"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          style={{ margin: 0 }}
        >
          <Input />
        </Form.Item>
      ),
    },
  ];

  return (
    <Card style={cardStyle} styles={{body:{ padding: "16px" }}}>
      <Typography.Title level={4} style={titleStyle}>
        Profile Details
      </Typography.Title>

      {!isEditing ? (
        // View mode
        <>
          {profileFields.map((field, index) => (
            <Row key={index} style={fieldStyle} gutter={[16, 8]}>
              <Col
                xs={colSpans.xs.labelSpan}
                sm={colSpans.sm.labelSpan}
                lg={colSpans.lg.labelSpan}
                style={colLabelStyle}
              >
                <Text style={labelStyle}>{field.label}</Text>
              </Col>

              {/* Separator - hidden on mobile */}
              <Col
                xs={colSpans.xs.separatorSpan}
                sm={colSpans.sm.separatorSpan}
                lg={colSpans.lg.separatorSpan}
                style={{ textAlign: "center" }}
              >
                <Text style={valueStyle}>:-</Text>
              </Col>

              <Col
                xs={colSpans.xs.valueSpan}
                sm={colSpans.sm.valueSpan}
                lg={colSpans.lg.valueSpan}
                style={colValueStyle}
              >
                <Text style={valueStyle}>{field.value}</Text>
              </Col>
            </Row>
          ))}

          <div
            style={{
              textAlign: "right",
              marginTop: "30px",
              borderTop: "2px solid rgb(208 197 197)",
              paddingTop: "16px",
            }}
          >
            <Button
              type="text"
              onClick={handleEdit}
              style={{
                color: "#2657BC",
                padding: "4px 16px",
                height: "auto",
                fontSize: "18px",
                border: "1px solid #2657BC",
                fontWeight: "500",
              }}
            >
              Edit
            </Button>
          </div>
        </>
      ) : (
        // Edit mode
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: "8px" }}
        >
          {profileFields.map((field, index) => (
            <Row key={index} style={fieldStyle} gutter={[16, 8]} align="middle">
              <Col
                xs={colSpans.xs.labelSpan}
                sm={colSpans.sm.labelSpan}
                lg={colSpans.lg.labelSpan}
                style={colLabelStyle}
              >
                <Text style={labelStyle}>{field.label}</Text>
              </Col>

              {/* Separator - hidden on mobile */}
              <Col
                xs={colSpans.xs.separatorSpan}
                sm={colSpans.sm.separatorSpan}
                lg={colSpans.lg.separatorSpan}
                style={{ textAlign: "center" }}
              >
                <Text style={valueStyle}>:-</Text>
              </Col>

              <Col
                xs={colSpans.xs.valueSpan}
                sm={colSpans.sm.valueSpan}
                lg={colSpans.lg.valueSpan}
                style={colValueStyle}
              >
                {field.editField}
              </Col>
            </Row>
          ))}

          <div
            style={{
              textAlign: "right",
              marginTop: "16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={handleCancel}
              style={{
                padding: "4px 16px",
                height: "auto",
                fontSize: "14px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: "#2657BC",
                padding: "4px 16px",
                height: "auto",
                fontSize: "14px",
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </Card>
  );
};

export default ProfileDetails;
