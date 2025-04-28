// import React, { useEffect, useState } from "react";
// import {
//   Empty,
//   Spin,
//   message,
//   Card,
//   Button,
//   Typography,
//   Tag,
//   Row,
//   Col,
//   Space,
//   Divider,
// } from "antd";
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import { menuService } from "../../auth/apiService";
// import { Menu } from "./types";
// import AddMenuModal from "./addMenuModal";
// import ViewEditMenuModal from "./ViewEditMenuModal";
// import MenuConfigurationModal from "./menuConfigurationModal";

// const { Title, Paragraph } = Typography;

// const MenuList: React.FC = () => {
//   const [menus, setMenus] = useState<Menu[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
//   const [isViewEditModalVisible, setIsViewEditModalVisible] =
//     useState<boolean>(false);
//   const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
//   const [editMode, setEditMode] = useState<boolean>(false);
//   const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

//   useEffect(() => {
//     fetchMenus();
//   }, []);

//   const fetchMenus = async () => {
//     try {
//       setLoading(true);
//       const response = await menuService.getAllMenus();
//       console.log(response, "menus-res");

//       if (response && response?.data) {
//         setMenus(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching menus:", error);
//       message.error("Failed to load menus");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddMenu = () => {
//     setIsAddModalVisible(true);
//   };

//   const handleAddModalCancel = () => {
//     setIsAddModalVisible(false);
//   };

//   const handleAddMenuSuccess = () => {
//     setIsAddModalVisible(false);
//     fetchMenus();
//     message.success("Menu added successfully");
//   };

//   const handleViewMenu = (menu: Menu) => {
//     setSelectedMenu(menu);
//     setEditMode(false);
//     setIsViewEditModalVisible(true);
//   };

//   const handleEditMenu = (menu: Menu) => {
//     setSelectedMenu(menu);
//     setEditMode(true);
//     setIsViewEditModalVisible(true);
//   };

//   const handleDeleteMenu = async (menuId: number) => {
//     try {
//       await menuService.deleteMenu(menuId);
//       fetchMenus();
//       message.success("Menu deleted successfully");
//     } catch (error) {
//       console.error("Error deleting menu:", error);
//       message.error("Failed to delete menu");
//     }
//   };

//   const handleViewEditModalCancel = () => {
//     setIsViewEditModalVisible(false);
//     setSelectedMenu(null);
//   };

//   const handleUpdateMenuSuccess = () => {
//     setIsViewEditModalVisible(false);
//     setSelectedMenu(null);
//     fetchMenus();
//     message.success("Menu updated successfully");
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "256px",
//         }}
//       >
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "16px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           marginBottom: "16px",
//         }}
//       >
//         <button
//           onClick={() => setIsConfigModalOpen(true)}
//           aria-label="Menu Configuration"
//         >
//           <SettingOutlined />
//           <span>Menu Configuration</span>
//         </button>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "24px",
//         }}
//       >
//         <Title level={2} style={{ margin: 0 }}>
//           Menus
//         </Title>
//       </div>

//       <Row gutter={[24, 24]}>
//         {menus.map((menu) => (
//           <Col xs={24} sm={12} lg={8} xl={6} key={menu.id}>
//             <Card
//               cover={
//                 <div style={{ height: "192px", overflow: "hidden" }}>
//                   {/* <img
//                     alt={menu.name}
//                     src={
//                       menu.items[0]?.item?.image ||
//                       "https://via.placeholder.com/300x200"
//                     }
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   /> */}
//                 </div>
//               }
//               bodyStyle={{ padding: "16px" }}
//             >
//               <Card.Meta
//                 title={menu.name}
//                 description={menu.description}
//                 style={{ marginBottom: "8px" }}
//               />
//               <div style={{ marginTop: "8px" }}>
//                 <Tag color="blue">{menu.items.length} items</Tag>
//               </div>
//               <Divider style={{ margin: "12px 0" }} />
//               <Space
//                 style={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 <Button
//                   type="text"
//                   icon={<EyeOutlined />}
//                   onClick={() => handleViewMenu(menu)}
//                 />
//                 <Button
//                   type="text"
//                   icon={<EditOutlined />}
//                   onClick={() => handleEditMenu(menu)}
//                 />
//                 <Button
//                   type="text"
//                   danger
//                   icon={<DeleteOutlined />}
//                   onClick={() => handleDeleteMenu(menu.id)}
//                 />
//               </Space>
//             </Card>
//           </Col>
//         ))}

//         {/* Add Menu Card */}
//         <Col xs={24} sm={12} lg={8} xl={6}>
//           <Card
//             hoverable
//             style={{
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               cursor: "pointer",
//               border: "1px dashed #d9d9d9",
//             }}
//             bodyStyle={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//               width: "100%",
//               padding: "48px 24px",
//             }}
//             onClick={handleAddMenu}
//           >
//             <PlusOutlined
//               style={{
//                 fontSize: "32px",
//                 color: "#bfbfbf",
//                 marginBottom: "8px",
//               }}
//             />
//             <Paragraph style={{ marginBottom: 0 }}>Add New Menu</Paragraph>
//           </Card>
//         </Col>
//       </Row>

//       {menus.length === 0 && !loading && (
//         <Empty description="No menus found" style={{ marginTop: "32px" }} />
//       )}

//       {/* Add Menu Modal */}
//       <AddMenuModal
//         visible={isAddModalVisible}
//         onCancel={handleAddModalCancel}
//         onSuccess={handleAddMenuSuccess}
//       />

//       {/* View/Edit Menu Modal */}
//       {selectedMenu && (
//         <ViewEditMenuModal
//           visible={isViewEditModalVisible}
//           menu={selectedMenu}
//           editMode={editMode}
//           onCancel={handleViewEditModalCancel}
//           onSuccess={handleUpdateMenuSuccess}
//         />
//       )}

//       {isConfigModalOpen && (
//         <MenuConfigurationModal
//           visible={isConfigModalOpen}
//           onClose={() => setIsConfigModalOpen(false)}
//           onSuccess={() => {
//             // onRefreshMenuConfig();
//             setIsConfigModalOpen(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default MenuList;

import React, { useEffect, useState } from "react";
import {
  Empty,
  Spin,
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

const { Title, Paragraph, Text } = Typography;

const MenuList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await menuService.getAllMenus();
      console.log(response, "menus-res");

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

  // Helper function to format timestamps to readable dates
  const formatDate = (timestamp: number) => {
    return dayjs(timestamp * 1000).format("MMM D, YYYY");
  };

  // Helper function to get the base64 image source
  const getImageSource = (base64String: string) => {
    if (!base64String) return "https://via.placeholder.com/300x200";
    return `data:image/jpeg;base64,${base64String}`;
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "256px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "2px" }}>
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
          style={{ fontWeight: "bold", border: "1px solid" }}
        >
          Menu Configuration
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* Add Menu Card */}
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
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              padding: "48px 24px",
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
              bodyStyle={{ padding: "16px" }}
            >
              <div>
                <ClockCircleOutlined style={{ marginRight: "8px" }} />
                <Text type="secondary" style={{ fontWeight: "700" }}>
                  {menu.menuConfiguration && menu.menuConfiguration.name}
                </Text>
                <Tag color="blue" style={{ marginLeft: "10px" }}>
                  {menu.menuItems ? menu.menuItems.length : 0} items
                </Tag>
              </div>

              <div style={{ marginTop: "12px" }}>
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <div>
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

      {/* Add Menu Modal */}
      <AddMenuModal
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        onSuccess={handleAddMenuSuccess}
      />

      {/* View/Edit Menu Modal */}
      {selectedMenu && (
        <EditMenuModal
          visible={isEditOpen}
          menu={selectedMenu}
          onCancel={handleEditModalCancel}
          onSuccess={handleUpdateMenuSuccess}
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
    </div>
  );
};

export default MenuList;
