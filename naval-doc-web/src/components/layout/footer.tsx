import React from "react";
import { Layout } from "antd";
import WorldtekLogo from "../common/worldTekLogo";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <WorldtekLogo />
      <AntFooter
        style={{
          flexShrink: 0,
          textAlign: "center",
          background: "#fff",
          borderTop: "1px solid #e8e8e8",
          padding: "12px 0",
          fontSize: "14px",
          color: "#666",
        }}
      >
        © {currentYear} Navel Docyard. All rights reserved. | Powered by{" "}
        <strong>XTS</strong>
      </AntFooter>
    </div>
  );
};

export default Footer;
