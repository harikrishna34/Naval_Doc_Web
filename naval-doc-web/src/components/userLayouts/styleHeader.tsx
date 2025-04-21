import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Avatar,
  Typography,
  Badge,
  Row,
  Col,
  Menu,
  Drawer,
} from "antd";
import {
  ShoppingCartOutlined,
  WalletOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

interface HeaderProps {
  brandName?: string;
}

const StyledHeader: React.FC<HeaderProps> = ({
  brandName = "Well Fair canteen",
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const menuItems = [
    {
      key: "cart",
      icon: (
        <Badge count={0} size="small">
          <ShoppingCartOutlined />
        </Badge>
      ),
      label: "Cart",
    },
    {
      key: "wallet",
      icon: <WalletOutlined />,
      label: "Wallet",
    },
    {
      key: "notification",
      icon: (
        <Badge dot>
          <BellOutlined />
        </Badge>
      ),
      label: "Notification",
    },
    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: "Help",
    },
  ];

  const renderMobileMenu = () => (
    <Button
      type="text"
      icon={<MenuOutlined />}
      onClick={() => setDrawerVisible(true)}
      style={{
        color: "white",
      }}
    />
  );

  const renderDesktopMenu = () => (
    <Menu
      mode="horizontal"
      items={menuItems}
      style={{
        background: "transparent",
        border: "none",
        color: "white",
      }}
      theme="dark"
      selectable={false}
    />
  );

  return (
    <>
      <Header
        className="site-header"
        style={{
          background: "#3F51B5",
          padding: "0 16px",
          height: "64px",
          position: "sticky",
          top: 0,
          zIndex: 999,
          width: "100%",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Row align="middle" style={{ height: "100%" }}>
          <Col xs={6} sm={6} md={5} lg={4}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "white",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography.Text
                  strong
                  style={{ color: "#1a237e", fontSize: "18px" }}
                >
                  W
                </Typography.Text>
              </div>
            </div>
          </Col>

          <Col xs={0} sm={0} md={12} lg={14}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
                {brandName}
              </Text>
            </div>
          </Col>

          <Col xs={18} sm={18} md={7} lg={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {isMobile ? renderMobileMenu() : renderDesktopMenu()}
              <Avatar
                size="large"
                icon={<UserOutlined style={{ color: "#3F51B5" }} />}
                style={{ background: "white" }}
              />
            </div>
          </Col>
        </Row>
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          style={{ border: "none" }}
        />
      </Drawer>
    </>
  );
};

export default StyledHeader;