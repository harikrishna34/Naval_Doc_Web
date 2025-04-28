import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Typography, Space } from "antd";
import canteenImg from "../../assets/images/canteens.jpg";
import menuImage from "../../assets/images/menu.jpg";
import ordersImage from "../../assets/images/orders.jpg";
import itemsImage from "../../assets/images/items.jpg";

const { Title, Text } = Typography;

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardName: string) => {
    if (cardName === "Canteens") {
      navigate("/canteens-list");
    } else if (cardName === "Items") {
      navigate("/items-list");
    } else if (cardName === "Menu") {
      navigate("/menus-list");
    } else if (cardName === "Orders") {
      navigate("/orders-list");
    }
  };

  const statCards = [
    { title: "TOTAL ORDERS", value: "1000" },
    { title: "REVENUE", value: "10,000" },
  ];

  const featureCards = [
    { title: "Canteens", image: canteenImg },
    { title: "Menu", image: menuImage },
    { title: "Orders", image: ordersImage },
    { title: "Items", image: itemsImage },
  ];

  return (
    <div>
      <div style={{ padding: "20px" }}>
        {/* Stats Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: "30px" }}>
          {statCards.map((stat, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                }}
                onClick={() => handleCardClick(stat.title)}
              >
                <Title level={4} style={{ margin: 0, color: "#333" }}>
                  {stat.title}
                </Title>
                
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#4caf50",
                  }}
                >
                  {stat.value}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Feature Cards Section */}
        <Row gutter={[16, 16]}>
          {featureCards.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Space
                direction="vertical"
                style={{ width: "100%", textAlign: "center" }}
              >
                <Card
                  hoverable
                  style={{
                    borderRadius: "10px",
                    padding: 0,
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    height: "288px",
                  }}
                  bodyStyle={{ padding: 0 }}
                  cover={
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt={feature.title}
                        src={feature.image}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  }
                  onClick={() => handleCardClick(feature.title)}
                />
                <Title
                  level={5}
                  style={{ margin: "8px 0 0", textAlign: "center" }}
                >
                  {feature.title}
                </Title>
              </Space>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
