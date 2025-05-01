import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Layout,
  Empty,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddCanteenModal from "./addCanteenModal";
import { canteenService, adminDashboardService } from "../../auth/apiService";
import BackHeader from "../../components/common/backHeader";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader";
import CanteenOrdersDisplay from "../admin/canteenOrders";

const { Content } = Layout;

interface CanteenProps {
  id: number;
  name: string;
  location?: string;
  image: string;
  code: string;
}

const CanteenList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [canteens, setCanteens] = useState<CanteenProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [countsData, setCountsData] = React.useState<any>([]);

  useEffect(() => {
    fetchCanteens();
  }, []);

  useEffect(() => {
    adminDashboardService
      .getOrdersByCanteen()
      .then((response) => {
        setCountsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchCanteens = async () => {
    try {
      setLoading(true);
      const response = await canteenService.getAllCanteens();

      if (response && response.data) {
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

  const handleCanteenClick = (canteenId: number, canteenName:string) => {
    console.log(`Navigating to canteen with ID: ${canteenId}`);
    console.log(canteenId, "canteeId", canteenName, "canteenName");
    navigate(`/canteens-list/canteen-dashboard/${canteenId}/${canteenName}`);
    // /canteens-list/canteen-dashboard/:canteenId/:canteenName/menu
  };

  const handleAddCanteen = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCanteen = (values: any) => {
    console.log("Submitted values:", values);
  };

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
        <BackHeader path="/dashboard" title="Canteens Management" />
        {countsData?.length !== 0 && <CanteenOrdersDisplay data={countsData}/>}
        {/* <CanteenOrdersDisplay /> */}
        {loading ? (
          <Loader />
        ) : canteens.length === 0 ? (
          <EmptyState />
        ) : (
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={8} md={6} lg={5}>
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
                styles={{
                  body: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    padding: "30px",
                  },
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
              <Col xs={12} sm={8} md={6} lg={5} key={canteen.id}>
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
                  // onClick={() => handleCanteenClick(canteen.id)}
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
                        {/* <h5 style={{ marginBottom: 0, marginTop: 0 }}>
                          Code: {canteen.code}
                        </h5> */}
                        <Button onClick={() => handleCanteenClick(canteen.id, canteen?.name?.charAt(0).toUpperCase() + canteen.name.slice(1))}>
                          Go to Canteen Dashboard
                        </Button>
                      </>
                    }
                    style={{ textAlign: "center", fontSize: "23px" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}

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
