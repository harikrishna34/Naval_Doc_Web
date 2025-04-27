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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddCanteenModal from "./addCanteenModal";
import { canteenService } from "../../auth/apiService";
import WorldtekLogo from "../../components/common/worldTekLogo";

const { Title } = Typography;
const { Content } = Layout;

interface CanteenProps {
  id: number;
  name: string;
  location?: string;
  image: string;
  code: string;
}

const CanteenList: React.FC = () => {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [canteens, setCanteens] = useState<CanteenProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch canteens on component mount
  useEffect(() => {
    fetchCanteens();
  }, []);

  // Function to fetch canteens from API
  const fetchCanteens = async () => {
    try {
      setLoading(true);
      const response = await canteenService.getAllCanteens();

      if (response && response.data) {
        // Transform API data to match our component's expected format
        const formattedCanteens = response.data.map((canteen: any) => ({
          id: canteen.id,
          name: canteen.canteenName,
          code: canteen.canteenCode,
          location: canteen.location || "Not specified",
          image: canteen.canteenImage || "/api/placeholder/250/150",
        }));

        setCanteens(formattedCanteens);
      } else {
        setCanteens([]);
      }
    } catch (error) {
      console.error("Error fetching canteens:", error);
      message.error("Failed to load canteens. Please try again.");
      setCanteens([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCanteenClick = (canteenId: number) => {
    console.log(`Navigating to canteen with ID: ${canteenId}`);
    // Replace with your actual navigation logic
  };

  const handleAddCanteen = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCanteen = (values: any) => {
    console.log("Submitted values:", values);
    // No need to handle API call here as it's now handled inside the modal component
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
        description="No Canteens Added Yet"
        style={{ marginBottom: "20px" }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddCanteen}
        size="large"
      >
        Add Your First Canteen
      </Button>
    </div>
  );

  return (
    <Layout>
      <Content
        style={{
          maxWidth: "100%",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "left",
            marginBottom: "30px",
            marginTop: "-5px",
          }}
        >
          Canteens Management
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
        ) : canteens.length === 0 ? (
          <EmptyState />
        ) : (
          <Row gutter={[16, 16]}>
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
                onClick={handleAddCanteen}
              >
                <div style={{ marginBottom: "8px" }}>
                  <PlusOutlined
                    style={{ fontSize: "32px", color: "#52c41a" }}
                  />
                </div>
                <Typography.Text strong>Add New Canteen</Typography.Text>
              </Card>
            </Col>
            {canteens.map((canteen) => (
              <Col xs={24} sm={12} md={8} lg={6} key={canteen.id}>
                <Card
                  hoverable
                  style={{ height: "100%" }}
                  cover={
                    <img
                      alt={canteen.name}
                      src={canteen.image}
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  onClick={() => handleCanteenClick(canteen.id)}
                >
                  <Card.Meta
                    title={
                      canteen?.name
                        ? canteen.name.charAt(0).toUpperCase() +
                          canteen.name.slice(1)
                        : ""
                    }
                    description={
                      <>
                        <h5 style={{ marginBottom: 0, marginTop: 0 }}>
                          Code: {canteen.code}
                        </h5>
                      </>
                    }
                    style={{ textAlign: "center", fontSize: "23px" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add Canteen Modal */}
        <AddCanteenModal
          isOpen={isModalOpen}
          onCancel={handleCancelModal}
          onSubmit={handleSubmitCanteen}
          onSuccess={fetchCanteens}
        />
      </Content>
    </Layout>
  );
};

export default CanteenList;
