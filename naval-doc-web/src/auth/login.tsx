import { Col, Row, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorldtekLogo from "../components/common/worldTekLogo";

type Language = "en" | "te"; // "en" for English and "te" for Telugu

const languageTexts = {
  en: {
    login: "LOGIN",
    mobileNumber: "Enter your Mobile Number",
    sendOtp: "Send OTP",
    enterOtp: "Enter OTP",
    loginButton: "Login",
    poweredBy: "powered by",
    worldtek: "worldtek",
    languageLabel: "తెలుగు",
    resendOtp: "Resend OTP",
    invalidMobile:
      "Please enter a valid Indian mobile number (starts with 6,7,8,9 and 10 digits).",
    invalidOtp: "Please enter a valid 6-digit OTP.",
  },
  te: {
    login: "లాగిన్",
    mobileNumber: "మీ మొబైల్ నంబర్ నమోదు చేయండి",
    sendOtp: "OTP పంపించండి",
    enterOtp: "OTP నమోదు చేయండి",
    loginButton: "లాగిన్",
    poweredBy: "చాలగా నిర్వహించబడింది",
    worldtek: "వోర్ల్డ్‌టెక్",
    languageLabel: "English",
    resendOtp: "OTP మళ్ళీ పంపించండి",
    invalidMobile:
      "దయచేసి ఒక సరైన భారతీయ మొబైల్ నంబర్ నమోదు చేయండి (6,7,8,9 తో ప్రారంభమై, 10 అంకెలు ఉండాలి).",
    invalidOtp: "దయచేసి ఒక సరైన 6 అంకెల OTP నమోదు చేయండి.",
  },
};

const LoginScreen: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [language, setLanguage] = useState<Language>("en"); // Default language is "en"
  const navigate = useNavigate();

  const API_URL_SEND = "http://localhost:3002/api/login";
  const API_URL_VERIFY = "http://localhost:3002/api/verifyOtp";

  // Set language based on localStorage when the page first loads
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage === "en" || savedLanguage === "te") {
      setLanguage(savedLanguage);
    } else {
      setLanguage("en"); // Default to English if no language is stored
    }
  }, []);

  // Do not persist language to localStorage after updates
  useEffect(() => {
    // Do not save language to localStorage
  }, [language]);

  const texts = languageTexts[language];

  const validateMobile = (mobile: string) => {
    const indianMobilePattern = /^[6-9]\d{9}$/;
    return indianMobilePattern.test(mobile);
  };

  const handleSendOtp = async () => {
    if (!validateMobile(mobileNumber)) {
      setMobileError(texts.invalidMobile);
      return;
    }
    setMobileError("");
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(API_URL_SEND, {
        mobile: mobileNumber,
      });

      if (response.status === 200) {
        setOtpSent(true);
        setOtpSuccess("OTP Sent Successfully");
      } else {
        setMobileError("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMobileError("Error sending OTP");
    }
  };

  const handleLogin = async () => {
    if (otp.length !== 6) {
      setOtpError(texts.invalidOtp);
      return;
    }
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(API_URL_VERIFY, {
        mobile: mobileNumber,
        otp: otp,
      });

      if (
        response.status === 200 &&
        response.data.message === "OTP verified successfully"
      ) {
        const token = response.data.token;
        localStorage.setItem("Token", token);
        navigate("/dashboard");
      } else {
        setOtpError("Invalid OTP or verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Verification failed. Try again.");
    }
  };

  const toggleLanguage = (checked: boolean) => {
    const selectedLanguage = checked ? "te" : "en"; // Set language to Telugu if checked, else English
    setLanguage(selectedLanguage);

    // Save selected language to localStorage only on toggle
    localStorage.setItem("language", selectedLanguage);
  };

  return (
    <Row className="login-container">
      <Col span={12} className="form-column">
        <div style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"
        }}>
          <div className="form-container" style={{justifyContent:"center"}}>
            <div className="language-toggle">
              <Switch
                checked={language === "te"} // Toggle to Telugu if language is "te"
                onChange={toggleLanguage}
                checkedChildren="తెలుగు"
                unCheckedChildren="English"
              />
            </div>

            <div className="login-form-box">
              <h1 className="login-title">{texts.login}</h1>

              <div className="input-group">
                <label htmlFor="mobile">{texts.mobileNumber}</label>
                <div style={{ display: "flex", alignItems: "center", marginTop:"5px" }}>
                  <span
                    style={{
                      padding: "8px 12px",
                      background: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      borderRadius: "6px 0 0 6px",
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    id="mobile"
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder={
                      language === "en" ? "9876543210" : "9876543210"
                    }
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "0 6px 6px 0",
                      borderLeft: "none",
                    }}
                  />
                </div>
                {mobileError && (
                  <div
                    style={{ color: "red", marginTop: "5px", fontSize: "12px" }}
                  >
                    {mobileError}
                  </div>
                )}
                <button
                  className="otp-button"
                  onClick={handleSendOtp}
                  disabled={mobileNumber.length !== 10}
                  style={{ marginTop: "10px" }}
                >
                  {texts.sendOtp}
                </button>
              </div>

              {otpSent && (
                <div className="otp-box">
                  <label
                    htmlFor="otp"
                    className="otp-label"
                    style={{ marginTop: "20px" }}
                  >
                    {texts.enterOtp}
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="otp-input"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder={
                      language === "en"
                        ? "Enter 6-digit OTP"
                        : "6 అంకెల OTP నమోదు చేయండి"
                    }
                    style={{ marginTop: "10px" }}
                  />
                  {otpError && (
                    <div
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {otpError}
                    </div>
                  )}
                  {otpSuccess && (
                    <div
                      style={{
                        color: "green",
                        marginTop: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {otpSuccess}
                    </div>
                  )}
                  <button
                    className="resend-otp-button"
                    onClick={handleSendOtp}
                    style={{ marginTop: "10px" }}
                  >
                    {texts.resendOtp}
                  </button>
                </div>
              )}

              <button
                className="login-button"
                onClick={handleLogin}
                disabled={!otpSent || otp.length !== 6}
                style={{ marginTop: "20px" }}
              >
                {texts.loginButton}
              </button>
            </div>
          </div>
          <WorldtekLogo />
        </div>
      </Col>

      <Col span={12} className="login-right">
        <img
          src="https://www.joinindiannavy.gov.in/images/octaginal-crest.png"
          alt="Logo"
          className="login-logo"
        />
      </Col>
    </Row>
  );
};

export default LoginScreen;
