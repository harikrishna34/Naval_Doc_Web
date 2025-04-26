import { Col, Row, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import wordTekLogo from "../assets/images/logo.png";

type Language = "en" | "hi";

const languageTexts = {
  en: {
    login: "LOGIN",
    mobileNumber: "Enter your Mobile Number",
    sendOtp: "Send OTP",
    enterOtp: "Enter OTP",
    loginButton: "Login",
    poweredBy: "powered by",
    worldtek: "worldtek",
    languageLabel: "हिंदी",
    resendOtp: "Resend OTP",
  },
  hi: {
    login: "लॉग इन",
    mobileNumber: "अपना मोबाइल नंबर दर्ज करें",
    sendOtp: "OTP भेजें",
    enterOtp: "OTP दर्ज करें",
    loginButton: "लॉग इन",
    poweredBy: "द्वारा संचालित",
    worldtek: "वर्ल्डटेक",
    languageLabel: "English",
    resendOtp: "OTP पुनः भेजें",
  },
};

const LoginScreen: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const navigate = useNavigate()

  const API_URL_SEND = "http://localhost:3002/api/login";
  const API_URL_VERIFY = "http://localhost:3002/api/verifyOtp";

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage === "en" || savedLanguage === "hi") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const texts = languageTexts[language];

  const handleSendOtp = async () => {
    if (mobileNumber.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.post(API_URL_SEND, {
        mobile: mobileNumber,
      });

      if (response.status === 200) {
        alert("OTP Sent Successfully");
        setOtpSent(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP");
    }
  };

  const handleLogin = async () => {
    if (otp.length < 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(API_URL_VERIFY, {
        mobile: mobileNumber,
        otp: otp,
      });
      console.log(response,"res");
      

      if (response.status === 200 && response.data.message === "OTP verified successfully") {        
        const token = response.data.token;
        localStorage.setItem("Token", token);
        navigate("/dashboard");
        // alert("Login successful!");
      } else {
        alert("Invalid OTP or verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Verification failed. Try again.");
    }
  };

  const toggleLanguage = (checked: boolean) => {
    setLanguage(checked ? "hi" : "en");
  };

  return (
    <Row className="login-container">
      <Col span={12} className="form-column">
        <div className="form-container">
          <div className="language-toggle">
            <Switch
              checked={language === "hi"}
              onChange={toggleLanguage}
              checkedChildren="हिंदी"
              unCheckedChildren="English"
            />
          </div>

          <div className="login-form-box">
            <h1 className="login-title">{texts.login}</h1>

            <div className="input-group">
              <label htmlFor="mobile">{texts.mobileNumber}</label>
              <input
                type="tel"
                id="mobile"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder={
                  language === "en" ? "e.g. 9876543210" : "जैसे 9876543210"
                }
              />
              <button
                className="otp-button"
                onClick={handleSendOtp}
                disabled={mobileNumber.length < 10}
              >
                {texts.sendOtp}
              </button>
            </div>

            {otpSent && (
              <div className="otp-box">
                <label htmlFor="otp" className="otp-label">
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
                      : "6 अंकों का OTP दर्ज करें"
                  }
                />

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
              disabled={!otpSent || otp.length < 6}
            >
              {texts.loginButton}
            </button>

            {/* Uncomment this footer if needed */}
            {/* <div className="footer-text">
              <span>{texts.poweredBy}</span>
              <span className="company-name">
                <img src={wordTekLogo} alt="logo" className="company-logo" />
              </span>
            </div> */}
          </div>
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