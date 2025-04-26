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
  Popover,
} from "antd";
import {
  ShoppingCartOutlined,
  WalletOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  MenuOutlined,
  BellFilled,
} from "@ant-design/icons";
import NotificationsDropdown from "../../modules/notifications/notificationDropdown";
import navyLogo from "../../assets/images/navy_image.png";

const { Header } = Layout;
const { Text } = Typography;

interface HeaderProps {
  brandName?: string;
  navigate?: (path: string) => void;
}

const StyledHeader: React.FC<HeaderProps> = ({
  brandName = "Well Fair canteen",
  navigate,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [notifications] = useState([
    {
      id: "1",
      message: "Your order #1234 has been confirmed",
      isRead: false,
      timestamp: "2024-03-15T10:30:00",
    },
    {
      id: "2",
      message: "Special offer: 20% off on all meals today!",
      isRead: false,
      timestamp: "2024-03-15T09:15:00",
    },
    {
      id: "3",
      message: "Your order #1233 is ready for pickup",
      isRead: true,
      timestamp: "2024-03-14T15:45:00",
    },
  ]);

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

  const handleNavigation = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path;
    }

    if (drawerVisible) {
      setDrawerVisible(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  const renderDesktopNavItems = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "24px",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          gap: "5px",
        }}
        onClick={() => handleNavigation("/cart")}
      >
        <Badge count={0} size="small">
          <ShoppingCartOutlined
            style={{ fontSize: "29px", color: "ghostwhite" }}
          />
        </Badge>
        <span>Cart</span>
      </div> */}

      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          gap: "5px",
        }}
        onClick={() => handleNavigation("/wallet")}
      >
        <WalletOutlined style={{ fontSize: "25px", color: "ghostwhite" }} />
        <span>Wallet</span>
      </div> */}

      <Popover
        content={
          <NotificationsDropdown
            notifications={notifications}
            onViewAll={() => handleNavigation("/notifications")}
          />
        }
        trigger="click"
        placement="bottomRight"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            cursor: "pointer",
            gap: "5px",
          }}
        >
          <Badge count={unreadCount}>
            <BellFilled style={{ fontSize: "25px", color: "ghostwhite" }} />
          </Badge>
          <span>Notification</span>
        </div>
      </Popover>

      <Popover
        content={
          <Menu style={{ width: 200 }}>
            <Menu.Item key="help-faq" onClick={() => handleNavigation("/faq")}>
              FAQ
            </Menu.Item>
            <Menu.Item
              key="help-support"
              onClick={() => handleNavigation("/support")}
            >
              Contact Support
            </Menu.Item>
            <Menu.Item
              key="help-terms"
              onClick={() => handleNavigation("/terms")}
            >
              Terms & Conditions
            </Menu.Item>
            <Menu.Item
              key="help-privacy"
              onClick={() => handleNavigation("/privacy")}
            >
              Privacy Policy
            </Menu.Item>
          </Menu>
        }
        trigger="click"
        placement="bottomRight"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            cursor: "pointer",
            gap: "5px",
          }}
        >
          <QuestionCircleOutlined
            style={{ fontSize: "25px", color: "ghostwhite" }}
          />
          <span>Help</span>
        </div>
      </Popover>
    </div>
  );

  return (
    <>
      <Header
        className="site-header"
        style={{
          // background: "#3F51B5",
          backgroundColor: "rgb(1, 0, 128)",
          padding: "0 16px",
          height: "92px",
          position: "sticky",
          top: 0,
          zIndex: 999,
          width: "100%",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Row align="middle" style={{ height: "100%" }}>
          <Col xs={6} sm={6} md={5} lg={4}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/")}
            >
              <div
                style={{
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <img src={navyLogo} style={{ height: "73px", width: "73px" }} />
            </div>
          </Col>

          <Col xs={0} sm={0} md={12} lg={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/")}
            >
              <Text
                style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}
              >
                {brandName}
              </Text>
            </div>
          </Col>

          <Col xs={18} sm={18} md={7} lg={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {isMobile ? renderMobileMenu() : renderDesktopNavItems()}
              <Avatar
                size="large"
                icon={<UserOutlined style={{ color: "#3F51B5" }} />}
                style={{ background: "white", cursor: "pointer" }}
                onClick={() => handleNavigation("/profile")}
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
        <Menu mode="vertical" style={{ border: "none" }}>
          <Menu.Item
            key="cart"
            icon={<ShoppingCartOutlined />}
            onClick={() => handleNavigation("/cart")}
          >
            Cart
          </Menu.Item>
          <Menu.Item
            key="wallet"
            icon={<WalletOutlined />}
            onClick={() => handleNavigation("/wallet")}
          >
            Wallet
          </Menu.Item>
          <Menu.Item
            key="notification"
            icon={
              <Badge count={unreadCount}>
                <BellFilled style={{ fontSize: "18px" }} />
              </Badge>
            }
            onClick={() => handleNavigation("/notifications")}
          >
            Notification
          </Menu.Item>
          <Menu.SubMenu
            key="help"
            icon={<QuestionCircleOutlined />}
            title="Help"
          >
            <Menu.Item key="help-faq" onClick={() => handleNavigation("/faq")}>
              FAQ
            </Menu.Item>
            <Menu.Item
              key="help-support"
              onClick={() => handleNavigation("/support")}
            >
              Contact Support
            </Menu.Item>
            <Menu.Item
              key="help-terms"
              onClick={() => handleNavigation("/terms")}
            >
              Terms & Conditions
            </Menu.Item>
            <Menu.Item
              key="help-privacy"
              onClick={() => handleNavigation("/privacy")}
            >
              Privacy Policy
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Drawer>
    </>
  );
};

export default StyledHeader;
