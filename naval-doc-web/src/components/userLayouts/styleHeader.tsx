import React, { useState, useEffect } from "react";
import {
  Layout,
  Input,
  Button,
  Dropdown,
  Space,
  Avatar,
  Typography,
  Badge,
  Row,
  Col,
  Menu,
  Drawer,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { HeaderProps } from "../../modules/dashboard/types";
import { headerStyles } from "../../modules/dashboard/styles";
import CanteenSelector from "../../modules/dashboard/canteenSelector";
import CategoryFilters from "../../modules/dashboard/categoryFilters";

const { Header } = Layout;
const { Text } = Typography;

const StyledHeader: React.FC<HeaderProps> = ({
  brandName = "Well Fair canteen",
  canteenOptions = [],
  categories = ["All", "Today Special", "Tiffins", "Veg", "Non-Veg"],
}) => {
  const [selectedCanteen, setSelectedCanteen] = useState<string | null>(null);
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
      style={headerStyles.mobileMenuButton}
    />
  );

  const renderDesktopMenu = () => (
    <Menu
      mode="horizontal"
      items={menuItems}
      style={headerStyles.menu}
      theme="dark"
      selectable={false}
    />
  );

  return (
    <>
      <Header style={headerStyles.header}>
        <Row align="middle" style={headerStyles.headerRow}>
          <Col xs={6} sm={6} md={5} lg={4}>
            <div style={headerStyles.logoContainer}>
              {/* <Logo /> */}
              <div style={headerStyles.logo}>
                <Typography.Text
                  strong
                  style={{ color: "#1a237e", fontSize: "18px" }}
                >
                  W
                </Typography.Text>
              </div>
              {!isMobile && (
                <Typography.Title level={4} style={headerStyles.brandTitle}>
                  {brandName}
                </Typography.Title>
              )}
            </div>
          </Col>

          <Col xs={0} sm={0} md={12} lg={14}>
            <div style={headerStyles.centerContent}>
              <Text style={headerStyles.brandTitleCentered}>{brandName}</Text>
            </div>
          </Col>

          <Col xs={18} sm={18} md={7} lg={6}>
            <div style={headerStyles.rightContainer}>
              {isMobile ? renderMobileMenu() : renderDesktopMenu()}
              <Avatar
                size="large"
                icon={<UserOutlined style={headerStyles.avatarIcon} />}
                style={headerStyles.avatar}
              />
            </div>
          </Col>
        </Row>
      </Header>

      {/* <div style={headerStyles.subHeader}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={12} lg={10}>
            <Input
              size="large"
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={headerStyles.searchInput}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={14}>
            <CanteenSelector
              options={canteenOptions}
              selectedCanteen={selectedCanteen}
              onSelect={setSelectedCanteen}
            />
          </Col>
        </Row>
      </div>

      <CategoryFilters categories={categories} /> */}

      {/* Mobile Menu Drawer */}
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
          style={headerStyles.drawerMenu}
        />
      </Drawer>
    </>
  );
};

export default StyledHeader;
