// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   Typography,
//   Button,
//   Layout,
//   Empty,
//   Spin,
//   message,
//   Tag,
// } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import AddItemModal from "./addItemModal";
// import { itemService } from "../../auth/apiService";

// const { Title } = Typography;
// const { Content } = Layout;

// interface ItemProps {
//   id: number;
//   name: string;
//   description: string;
//   type: string;
//   quantity: number;
//   quantityUnit: string;
//   price: number;
//   startDate: string;
//   endDate: string;
//   image: string;
//   status: string;
// }

// const ItemsList: React.FC = () => {
//   // State variables
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [items, setItems] = useState<ItemProps[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch items on component mount
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Function to fetch items from API
//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const response = await itemService.getAllItems();

//       if (response && response.data) {
//         // Transform API data to match our component's expected format
//         const formattedItems = response.data.map((item: any) => ({
//           id: item.id,
//           name: item.name,
//           description: item.description,
//           type: item.type,
//           quantity: item.quantity,
//           quantityUnit: item.quantityUnit,
//           price: item.price,
//           startDate: item.startDate,
//           endDate: item.endDate,
//           image: item.image || "/api/placeholder/250/150",
//           status: item.status,
//         }));

//         setItems(formattedItems);
//       } else {
//         setItems([]);
//       }
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       message.error("Failed to load items. Please try again.");
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleItemClick = (itemId: number) => {
//     console.log(`Navigating to item with ID: ${itemId}`);
//     // Replace with your actual navigation logic
//   };

//   const handleAddItem = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancelModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSubmitItem = (values: any) => {
//     console.log("Submitted values:", values);
//     // No need to handle API call here as it's now handled inside the modal component
//   };

//   // Get appropriate tag color based on item type
//   const getTagColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case "veg":
//         return "green";
//       case "non-veg":
//         return "red";
//       case "beverage":
//         return "blue";
//       case "dessert":
//         return "purple";
//       default:
//         return "default";
//     }
//   };

//   // Empty state component
//   const EmptyState = () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "60px 0",
//       }}
//     >
//       <Empty
//         image={Empty.PRESENTED_IMAGE_SIMPLE}
//         description="No Items Added Yet"
//         style={{ marginBottom: "20px" }}
//       />
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={handleAddItem}
//         size="large"
//       >
//         Add Your First Item
//       </Button>
//     </div>
//   );

//   return (
//     <Layout>
//       <Content
//         style={{
//           padding: "20px",
//           maxWidth: "100%",
//           marginLeft: "25px",
//           marginRight: "25px",
//         }}
//       >
//         <Title
//           level={2}
//           style={{
//             textAlign: "left",
//             marginBottom: "45px",
//             marginTop: "-5px",
//           }}
//         >
//           Menu Items
//         </Title>

//         {loading ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "200px",
//             }}
//           >
//             <Spin size="large" />
//           </div>
//         ) : items.length === 0 ? (
//           <EmptyState />
//         ) : (
//           <Row gutter={[16, 16]}>
//             {items.map((item) => (
//               <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
//                 <Card
//                   hoverable
//                   style={{ height: "100%" }}
//                   cover={
//                     <img
//                       alt={item.name}
//                       src={item.image}
//                       style={{
//                         height: "150px",
//                         objectFit: "cover",
//                       }}
//                     />
//                   }
//                   onClick={() => handleItemClick(item.id)}
//                 >
//                   <Card.Meta
//                     title={
//                       item?.name
//                         ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
//                         : ""
//                     }
//                     description={
//                       <>
//                         <p style={{ marginBottom: 5 }}>{item.description}</p>
//                         <Tag color={getTagColor(item.type)}>
//                           {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
//                         </Tag>
//                         <div style={{ marginTop: 8 }}>
//                           <strong>₹{item.price}</strong> • {item.quantity} {item.quantityUnit}
//                         </div>
//                       </>
//                     }
//                   />
//                 </Card>
//               </Col>
//             ))}

//             <Col xs={24} sm={12} md={8} lg={6}>
//               <Card
//                 hoverable
//                 style={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   textAlign: "center",
//                   border: "1px dashed #d9d9d9",
//                   backgroundColor: "#fafafa",
//                   cursor: "pointer",
//                 }}
//                 bodyStyle={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "100%",
//                   width: "100%",
//                   padding: "30px",
//                 }}
//                 onClick={handleAddItem}
//               >
//                 <div style={{ marginBottom: "8px" }}>
//                   <PlusOutlined
//                     style={{ fontSize: "32px", color: "#52c41a" }}
//                   />
//                 </div>
//                 <Typography.Text strong>Add New Item</Typography.Text>
//               </Card>
//             </Col>
//           </Row>
//         )}

//         {/* Add Item Modal */}
//         <AddItemModal
//           isOpen={isModalOpen}
//           onCancel={handleCancelModal}
//           onSubmit={handleSubmitItem}
//           onSuccess={fetchItems} // Refresh item list after successful addition
//         />
//       </Content>
//     </Layout>
//   );
// };

// export default ItemsList;



import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Layout,
  Empty,
  Spin,
  message,
  Tag,
  Popover,
  Modal,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import AddItemModal from "./addItemModal";
import { itemService } from "../../auth/apiService";

const { Title, Text } = Typography;
const { Content } = Layout;

interface ItemProps {
  id: number;
  name: string;
  description: string;
  type: string;
  quantity: number;
  quantityUnit: string;
  price: number;
  currency: string;
  startDate: string;
  endDate: string;
  image: string;
  status: string;
}

const ItemsList: React.FC = () => {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch items from API
  const fetchItems22 = async () => {
    try {
      setLoading(true);
      const response = await itemService.getAllItems();

      if (response && response.data) {
        // Transform API data to match our component's expected format
        const formattedItems = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          type: item.type,
          quantity: item.quantity,
          quantityUnit: item.quantityUnit,
          price: item.pricing?.price || 0,
          currency: item.pricing?.currency || "INR",
          startDate: item.pricing?.startDate || "",
          endDate: item.pricing?.endDate || "",
          image: item.image || "/api/placeholder/250/150",
          status: item.status,
        }));

        setItems(formattedItems);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      message.error("Failed to load items. Please try again.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch items from API
const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemService.getAllItems();
  
      if (response && response.data) {
        // Transform API data to match our component's expected format
        const formattedItems = response.data.map((item: any) => {
          // Handle image properly - check if it's a Buffer object
          let imageUrl = "/api/placeholder/250/150"; // Default placeholder
          
          if (item.image) {
            if (item.image.type === "Buffer" && Array.isArray(item.image.data)) {
              // Convert Buffer data to base64 string for display
              const buffer = Buffer.from(item.image.data);
              imageUrl = `data:image/jpeg;base64,${buffer.toString('base64')}`;
            } else if (typeof item.image === 'string') {
              imageUrl = item.image;
            }
          }
          
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            type: item.type,
            quantity: item.quantity,
            quantityUnit: item.quantityUnit,
            price: item.pricing?.price || 0,
            currency: item.pricing?.currency || "INR",
            startDate: item.pricing?.startDate || "",
            endDate: item.pricing?.endDate || "",
            image: imageUrl,
            status: item.status,
          };
        });
  
        setItems(formattedItems);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      message.error("Failed to load items. Please try again.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitItem = (values: any) => {
    console.log("Submitted values:", values);
    // API call handled in modal component
  };

  // Handle view item details
  const handleViewItem = (item: ItemProps) => {
    setSelectedItem(item);
    setViewModalVisible(true);
  };

  // Handle edit item
  const handleEditItem = (item: ItemProps) => {
    setSelectedItem(item);
    setEditModalVisible(true);
  };

  // Handle delete item
  const handleDeleteItem = (item: ItemProps) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!selectedItem) return;
    
    try {
      // Add your delete API call here
      // await itemService.deleteItem(selectedItem.id);
      message.success(`${selectedItem.name} has been deleted successfully`);
      fetchItems(); // Refresh items list
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete item. Please try again.");
    } finally {
      setDeleteModalVisible(false);
      setSelectedItem(null);
    }
  };

  // Get appropriate tag color based on item type
  const getTagColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "veg":
        return "green";
      case "non-veg":
        return "red";
      case "beverage":
        return "blue";
      case "dessert":
        return "purple";
      default:
        return "default";
    }
  };

  // Empty state component
  const EmptyState = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 0",
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No Items Added Yet"
        style={{ marginBottom: "20px" }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddItem}
        size="large"
      >
        Add Your First Item
      </Button>
    </div>
  );

  return (
    <Layout>
      <Content
        style={{
          padding: "20px",
          maxWidth: "100%",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "left",
            marginBottom: "45px",
            marginTop: "-5px",
          }}
        >
         Items
        </Title>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Spin size="large" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <Row gutter={[16, 16]}>
            {items.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Card
                  hoverable
                  style={{ height: "100%" }}
                  cover={
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <Card.Meta
                    title={
                      item?.name
                        ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                        : ""
                    }
                    description={
                      <>
                        <p style={{ marginBottom: 5 }}>{item.description}</p>
                        <Tag color={getTagColor(item.type)}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Tag>
                        
                        {/* Enhanced pricing display */}
                        <div style={{ marginTop: 8, marginBottom: 12 }}>
                          <Text strong style={{ fontSize: '16px' }}>
                            {item.currency === "INR" ? "₹" : "$"}{item.price}
                          </Text>
                          <Text style={{ marginLeft: 8 }}>
                            • {item.quantity} {item.quantityUnit}
                          </Text>
                        </div>
                      </>
                    }
                  />
                  
                  {/* Action buttons container */}
                  <div 
                    style={{ 
                      borderTop: '1px solid #f0f0f0',
                      paddingTop: 12,
                      marginTop: 8,
                      display: 'flex',
                      justifyContent: 'space-around'
                    }}
                  >
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewItem(item);
                      }}
                    />
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditItem(item);
                      }}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item);
                      }}
                    />
                  </div>
                </Card>
              </Col>
            ))}

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px dashed #d9d9d9",
                  backgroundColor: "#fafafa",
                  cursor: "pointer",
                }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                  padding: "30px",
                }}
                onClick={handleAddItem}
              >
                <div style={{ marginBottom: "8px" }}>
                  <PlusOutlined
                    style={{ fontSize: "32px", color: "#52c41a" }}
                  />
                </div>
                <Typography.Text strong>Add New Item</Typography.Text>
              </Card>
            </Col>
          </Row>
        )}

        {/* Add Item Modal */}
        <AddItemModal
          isOpen={isModalOpen}
          onCancel={handleCancelModal}
          onSubmit={handleSubmitItem}
          onSuccess={fetchItems} // Refresh item list after successful addition
        />

        {/* View Item Modal */}
        <Modal
          title={`Item Details - ${selectedItem?.name || ""}`}
          visible={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Close
            </Button>
          ]}
          width={600}
        >
          {selectedItem && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  style={{ maxWidth: "100%", maxHeight: 300, objectFit: "contain" }}
                />
              </div>
              
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title level={4}>{selectedItem.name}</Title>
                  <Tag color={getTagColor(selectedItem.type)} style={{ marginBottom: 10 }}>
                    {selectedItem.type}
                  </Tag>
                </Col>
                
                <Col span={24}>
                  <Text strong>Description:</Text>
                  <p>{selectedItem.description}</p>
                </Col>
                
                <Col span={12}>
                  <Text strong>Price:</Text>
                  <p>{selectedItem.currency === "INR" ? "₹" : "$"}{selectedItem.price}</p>
                </Col>
                
                <Col span={12}>
                  <Text strong>Quantity:</Text>
                  <p>{selectedItem.quantity} {selectedItem.quantityUnit}</p>
                </Col>
                
                <Col span={12}>
                  <Text strong>Start Date:</Text>
                  <p>{selectedItem.startDate ? new Date(parseInt(selectedItem.startDate)).toLocaleDateString() : "N/A"}</p>
                </Col>
                
                <Col span={12}>
                  <Text strong>End Date:</Text>
                  <p>{selectedItem.endDate ? new Date(parseInt(selectedItem.endDate)).toLocaleDateString() : "N/A"}</p>
                </Col>
                
                <Col span={12}>
                  <Text strong>Status:</Text>
                  <p>{selectedItem.status === "active" ? 
                    <Tag color="green">Active</Tag> : 
                    <Tag color="red">Inactive</Tag>}
                  </p>
                </Col>
              </Row>
            </div>
          )}
        </Modal>

        {/* Edit Item Modal - You would integrate this with your existing edit form */}
        <Modal
          title={`Edit Item - ${selectedItem?.name || ""}`}
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={null} // Form would have its own submit/cancel buttons
        >
          {selectedItem && (
            <p>Edit form would go here, populated with selectedItem data</p>
            // You would integrate your existing form component here
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Confirm Deletion"
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onOk={confirmDelete}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete "{selectedItem?.name}"? This action cannot be undone.</p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ItemsList;