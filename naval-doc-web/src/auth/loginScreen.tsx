import { Col, Row, Switch, Form, Input, Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WorldtekLogo from "../components/common/worldTekLogo";
import { languageTexts } from "../utils/data";
type Language = "en" | "te";

const LoginScreen: React.FC = () => {
  const [form] = Form.useForm();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
  const navigate = useNavigate();

  // Create refs for each OTP input field
  const otpRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const API_URL_SEND = "http://localhost:3002/api/login";
  const API_URL_VERIFY = "http://localhost:3002/api/verifyOtp";

  // Set language based on localStorage when the page first loads
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage === "en" || savedLanguage === "te") {
      setLanguage(savedLanguage);
    } else {
      setLanguage("en");
    }
  }, []);

  const texts = languageTexts[language];

  const validateMobile = (mobile: string) => {
    const indianMobilePattern = /^[6-9]\d{9}$/;
    return indianMobilePattern.test(mobile);
  };

  const handleSendOtp = async () => {
    try {
      // Validate form first
      await form.validateFields(["mobile"]);

      const mobileValue = form.getFieldValue("mobile");

      // Double check validation
      if (!validateMobile(mobileValue)) {
        form.setFields([
          {
            name: "mobile",
            errors: [texts.invalidMobile],
          },
        ]);
        return;
      }

      setLoading(true);
      setOtpButtonDisabled(true); // Disable the button when OTP is being sent

      try {
        const response = await axios.post(API_URL_SEND, {
          mobile: mobileValue,
        });

        if (response.status === 200) {
          setOtpSent(true);
          message.success("OTP Sent Successfully");

          // Reset OTP values
          setOtpValues(Array(6).fill(""));

          // Focus on the first OTP input
          setTimeout(() => {
            if (otpRefs.current[0]) {
              otpRefs.current[0].focus();
            }
          }, 100);
        } else {
          message.error("Failed to send OTP");
          setOtpButtonDisabled(false); // Re-enable if failed
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        message.error("Error sending OTP");
        setOtpButtonDisabled(false); // Re-enable if error
      } finally {
        setLoading(false);
      }
    } catch (err) {
      // Form validation error
      console.log("Validation failed:", err);
      setOtpButtonDisabled(false); // Re-enable if validation fails
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const sanitizedValue = value.replace(/\D/g, "");

    // Update the OTP value at the specified index
    const newOtpValues = [...otpValues];
    newOtpValues[index] = sanitizedValue;
    setOtpValues(newOtpValues);

    // Update form field with combined OTP
    form.setFieldsValue({ otp: newOtpValues.join("") });

    // Auto-focus to next input if current input is filled
    if (sanitizedValue && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // When backspace is pressed on an empty input, focus the previous input
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .substring(0, 6);

    if (pastedData) {
      // Fill in OTP boxes with pasted data
      const newOtpValues = [...otpValues];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newOtpValues[i] = pastedData[i];
        }
      }
      setOtpValues(newOtpValues);

      // Update form field
      form.setFieldsValue({ otp: newOtpValues.join("") });

      // Focus the next empty input or the last one if all are filled
      const nextEmptyIndex = newOtpValues.findIndex((value) => !value);
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
        otpRefs.current[nextEmptyIndex]?.focus();
      } else {
        otpRefs.current[5]?.focus();
      }
    }
  };

  const handleLogin = async () => {
    try {
      // Validate form first
      await form.validateFields(["otp"]);

      setLoading(true);

      try {
        const response = await axios.post(API_URL_VERIFY, {
          mobile: form.getFieldValue("mobile"),
          otp: form.getFieldValue("otp"),
        });

        if (
          response.status === 200 &&
          response.data.message === "OTP verified successfully"
        ) {
          const token = response?.data?.token;

          // Save token to localStorage
          localStorage.setItem("Token", token);

          // Use setTimeout to ensure token is saved before navigation
          setTimeout(() => {
            navigate("/dashboard");
          }, 100);

          message.success("Login successful!");
        } else {
          message.error("Invalid OTP or verification failed.");
          form.setFields([
            {
              name: "otp",
              errors: ["Invalid OTP or verification failed."],
            },
          ]);
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        message.error("Verification failed. Try again.");
        form.setFields([
          {
            name: "otp",
            errors: ["Verification failed. Try again."],
          },
        ]);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      // Form validation error
      console.log("Validation failed:", err);
    }
  };

  const toggleLanguage = (checked: boolean) => {
    const selectedLanguage = checked ? "te" : "en";
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  // Custom validator for Indian mobile number
  const validateIndianMobile = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your mobile number"));
    }
    if (!validateMobile(value)) {
      return Promise.reject(new Error(texts.invalidMobile));
    }
    return Promise.resolve();
  };

  // Custom validator for OTP
  const validateOtp = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please enter the OTP"));
    }
    if (!/^\d{6}$/.test(value)) {
      return Promise.reject(new Error(texts.invalidOtp));
    }
    return Promise.resolve();
  };

  return (
    <Row style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <Switch
              checked={language === "te"}
              onChange={toggleLanguage}
              checkedChildren="తెలుగు"
              unCheckedChildren="English"
            />
          </div>

          <div
            style={{
              width: "100%",
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: " 4px solid #010080",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              {texts.login}
            </h1>

            <Form
              form={form}
              layout="vertical"
              initialValues={{ mobile: "", otp: "" }}
              style={{ width: "100%" }}
            >
              <Form.Item
                name="mobile"
                label={texts.mobileNumber}
                rules={[{ validator: validateIndianMobile }]}
                validateTrigger={["onBlur", "onChange"]}
              >
                <Input
                  addonBefore="+91"
                  type="tel"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setMobileNumber(value);
                    form.setFieldsValue({ mobile: value });
                  }}
                  placeholder="9876543210"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="send-otp-button"
                  type="primary"
                  onClick={handleSendOtp}
                  loading={loading}
                  disabled={
                    otpButtonDisabled ||
                    !form.getFieldValue("mobile") ||
                    form.getFieldValue("mobile").length !== 10
                  }
                  block
                  style={{
                    marginBottom: otpSent ? "-3px" : "0",
                    fontSize: "16px",
                    fontWeight: "500",
                    padding: "20px",
                    backgroundColor: "#010080",
                    color: "white",
                  }}
                >
                  {texts.sendOtp}
                </Button>
              </Form.Item>

              {otpSent && (
                <>
                  <Form.Item
                    name="otp"
                    label={texts.enterOtp}
                    rules={[{ validator: validateOtp }]}
                    validateTrigger={["onBlur", "onChange"]}
                    style={{ display: "none" }} // Hidden field to store the combined OTP value
                  >
                    <Input type="hidden" />
                  </Form.Item>

                  {/* OTP Input Boxes */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", marginBottom: "8px" }}>
                      {texts.enterOtp}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      {Array(6)
                        .fill(0)
                        .map((_, index) => (
                          <Input
                            key={index}
                            ref={(el: any) => (otpRefs.current[index] = el)}
                            maxLength={1}
                            style={{
                              width: "40px",
                              height: "40px",
                              textAlign: "center",
                              padding: "4px",
                              fontSize: "16px",
                              borderRadius: "4px",
                            }}
                            value={otpValues[index]}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            onPaste={index === 0 ? handleOtpPaste : undefined}
                          />
                        ))}
                    </div>
                    {form.getFieldError("otp") && (
                      <div
                        style={{
                          color: "#ff4d4f",
                          fontSize: "14px",
                          marginTop: "8px",
                        }}
                      >
                        {form.getFieldError("otp")}
                      </div>
                    )}
                  </div>

                  <Form.Item style={{ marginBottom: "10px" }}>
                    <Button
                      type="link"
                      onClick={handleSendOtp}
                      loading={loading}
                      style={{ paddingLeft: 0 }}
                    >
                      {texts.resendOtp}
                    </Button>
                  </Form.Item>

                  <Form.Item style={{ marginBottom: "10px" }}>
                    <Button
                      type="primary"
                      onClick={handleLogin}
                      loading={loading}
                      style={{
                        backgroundColor: "#010080",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "500",
                        padding: "20px",
                      }}
                      disabled={otpValues.join("").length !== 6}
                      block
                    >
                      {texts.loginButton}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          </div>

          <div style={{ marginTop: "13px" }}>
            <WorldtekLogo />
          </div>
        </div>
      </Col>

      <Col
        xs={0}
        sm={0}
        md={12}
        lg={12}
        style={{
          backgroundColor: "#00205B",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://www.joinindiannavy.gov.in/images/octaginal-crest.png"
          alt="Logo"
          style={{ maxWidth: "70%", maxHeight: "70%" }}
        />
      </Col>
    </Row>
  );
};

export default LoginScreen;
