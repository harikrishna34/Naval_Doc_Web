import React, { useEffect, useState } from "react";
import {
  Empty,
  message,
  Card,
  Button,
  Typography,
  Tag,
  Row,
  Col,
  Space,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { menuService } from "../../auth/apiService";
import { Menu } from "./types";
import AddMenuModal from "./addMenuModal";
import EditMenuModal from "./editMenuModal";
import ViewMenuModal from "./viewMenuModal";
import MenuConfigurationModal from "./menuConfigurationModal";
import dayjs from "dayjs";
import lunchImage from "../../assets/images/menu_lunch.avif";
import tiffinImage from "../../assets/images/menu_tiffin.avif";
import snacksImage from "../../assets/images/menu_snacks.jpg";
import BackHeader from "../../components/common/backHeader";
import Loader from "../../components/common/loader";

const { Paragraph, Text } = Typography;

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [existingMenuTypes, setExistingMenuTypes] = useState<string[] | any>(
    []
  );

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    if (menus && menus.length > 0) {
      const menuTypes = menus
        .filter((menu) => menu.menuConfiguration && menu.menuConfiguration.name)
        .map((menu) => menu?.menuConfiguration?.name);
      setExistingMenuTypes(menuTypes);
    } else {
      setExistingMenuTypes([]);
    }
  }, [menus]);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await menuService.getAllMenus();
      if (response && response?.data) {
        setMenus(response.data);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
      message.error("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenu = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddMenuSuccess = () => {
    setIsAddModalVisible(false);
    fetchMenus();
    message.success("Menu added successfully");
  };

  const handleViewMenu = (menu: Menu) => {
    setSelectedMenu(menu);
    setEditMode(false);
    setIsViewOpen(true);
  };

  const handleEditMenu = (menu: Menu) => {
    setSelectedMenu(menu);
    setEditMode(true);
    setIsEditOpen(true);
  };

  const handleDeleteMenu = async (menuId: number) => {
    try {
      await menuService.deleteMenu(menuId);
      fetchMenus();
      message.success("Menu deleted successfully");
    } catch (error) {
      console.error("Error deleting menu:", error);
      message.error("Failed to delete menu");
    }
  };

  const handleEditModalCancel = () => {
    setIsEditOpen(false);
    setSelectedMenu(null);
  };

  const handleViewModalCancel = () => {
    setIsViewOpen(false);
    setSelectedMenu(null);
  };

  const handleUpdateMenuSuccess = () => {
    setIsEditOpen(false);
    setSelectedMenu(null);
    fetchMenus();
    message.success("Menu updated successfully");
  };

  const formatDate = (timestamp: number) => {
    return dayjs(timestamp * 1000).format("MMM D, YYYY");
  };

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <BackHeader path="/dashboard" title="Menu Management" />
        <Button
          type="default"
          icon={<SettingOutlined />}
          onClick={() => setIsConfigModalOpen(true)}
          style={{
            fontWeight: "bold",
            border: "1px solid",
            marginTop: "-18px",
          }}
        >
          Menu Configuration
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8} xl={6}>
          <Card
            hoverable
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "1px dashed #d9d9d9",
            }}
            styles={{
              body: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                padding: "48px 24px",
              },
            }}
            onClick={handleAddMenu}
          >
            <PlusOutlined
              style={{
                fontSize: "32px",
                color: "#bfbfbf",
                marginBottom: "8px",
              }}
            />
            <Paragraph style={{ marginBottom: 0 }}>Add New Menu</Paragraph>
          </Card>
        </Col>
        {menus.map((menu) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={menu.id}>
            <Card
              cover={
                <div style={{ height: "192px", overflow: "hidden" }}>
                  <img
                    alt={menu.name}
                    src={
                      menu?.menuConfiguration?.name === "Lunch"
                        ? lunchImage
                        : menu?.menuConfiguration?.name === "Snacks"
                        ? snacksImage
                        : tiffinImage
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              }
              styles={{body: { padding: "16px" }}}
            >
              <div style={{textAlign:"center"}}>
                <ClockCircleOutlined style={{ marginRight: "8px" }} />
                <Text type="secondary" style={{ fontWeight: "700" }}>
                  {menu.menuConfiguration && menu.menuConfiguration.name}
                </Text>
                <Tag color="blue" style={{ marginLeft: "10px" }}>
                  {menu.menuItems ? menu.menuItems.length : 0} items
                </Tag>
              </div>

              <div style={{ marginTop: "12px", textAlign:"center" }}>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <div >
                    <CalendarOutlined style={{ marginRight: "8px" }} />
                    <Text type="secondary" style={{ fontWeight: "700" }}>
                      {formatDate(menu.startTime)} - {formatDate(menu.endTime)}
                    </Text>
                  </div>
                </Space>
              </div>

              <Divider style={{ margin: "12px 0" }} />
              <Space
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewMenu(menu)}
                />
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEditMenu(menu)}
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteMenu(menu.id)}
                />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {menus.length === 0 && !loading && (
        <Empty description="No menus found" style={{ marginTop: "32px" }} />
      )}

      <AddMenuModal
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        onSuccess={handleAddMenuSuccess}
        existingMenuTypes={existingMenuTypes}
      />

      {selectedMenu && (
        <EditMenuModal
          visible={isEditOpen}
          menu={selectedMenu}
          onCancel={handleEditModalCancel}
          onSuccess={handleUpdateMenuSuccess}
          existingMenuTypes={existingMenuTypes.filter(
            (type: string | any) =>
              type !== selectedMenu.menuConfiguration?.name
          )}
        />
      )}

      {selectedMenu && (
        <ViewMenuModal
          visible={isViewOpen}
          menu={selectedMenu}
          onCancel={handleViewModalCancel}
        />
      )}

      {isConfigModalOpen && (
        <MenuConfigurationModal
          visible={isConfigModalOpen}
          onClose={() => setIsConfigModalOpen(false)}
          onSuccess={() => {
            setIsConfigModalOpen(false);
          }}
        />
      )}

      {loading && <Loader/>}
    </div>
  );
};

export default MenuList;
