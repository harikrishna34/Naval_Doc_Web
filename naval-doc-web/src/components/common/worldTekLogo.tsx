import React from "react";
import { Typography, Space } from "antd";
import Logo from "../../assets/images/logo.png";

const WorldtekLogo: React.FC = () => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "27px", marginBottom: "0px" }}
    >
      <Space align="center">
        <div style={{ marginTop: "10px" }}>
          <Typography.Text
            style={{
              color: "#333",
              fontSize: "15px",
              fontWeight: 400,
              marginTop: "50px",
            }}
          >
            powered by
          </Typography.Text>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "120px",
              height: "50px",
              marginTop: "30px",
              marginBottom: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden", // Important to make image fit inside circle
              position: "relative",
            }}
          >
            <img
              src={Logo}
              alt="logo"
              style={{
                width: "100%",
                marginTop: "30px",
                marginLeft: "32px",
                marginRight: "35px",
                height: "420%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </Space>
    </div>
  );
};

export default WorldtekLogo;
