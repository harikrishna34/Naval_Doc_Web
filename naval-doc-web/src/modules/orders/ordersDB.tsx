import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import BackHeader from "../../components/common/backHeader";
import { useParams } from "react-router-dom";
import { adminDashboardService } from "../../auth/apiService";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  title: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, title }) => {
  

  return (
    <Card
      style={{
        margin: "10px 0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
      }}
      styles={{
        body: {
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        },
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          fontSize: "24px",
          color: "#666",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "14px",
          color: "#666",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </div>
    </Card>
  );
};

const OrdersDashboard: React.FC = () => {
  const route = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let response;
      if (route?.canteenId) {
        response = await adminDashboardService.getTotalOrders(
          parseInt(route?.canteenId)
        );
      } else {
        response = await adminDashboardService.getTotalOrders();
      }

      if (response && response?.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "20px", paddingTop: "2px" }}>
      <BackHeader
        path={`/canteens-list/canteen-dashboard/${1}`}
        title="Orders Dashboard"
        styles={{ marginBottom: "16px" }}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={<DollarCircleOutlined />}
            value="₹ 10,000"
            title="Total Revenue"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={<ShoppingCartOutlined />}
            value={orders?.length > 0 ? orders?.length : 0}
            title="Total Orders"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={<CheckCircleOutlined />}
            value="940"
            title="Total Delivered"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={<CloseCircleOutlined />}
            value="60"
            title="Total Canceled"
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Button
            type="default"
            size="large"
            block
            style={{
              height: "60px",
              fontSize: "18px",
              borderRadius: "4px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              backgroundColor: "#fff",
            }}
          >
            View Item Wise List
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default OrdersDashboard;
