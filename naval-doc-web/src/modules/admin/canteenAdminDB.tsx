import { useNavigate } from "react-router-dom";
import menuImage from "../../assets/images/menu.jpg";
import ordersImage from "../../assets/images/orders.jpg";
import itemsImage from "../../assets/images/items.jpg";
import { Card, Col, Row, Space, Typography } from "antd";
const { Title, Text } = Typography;

const canteenAdminDB = () => {
  const navigate = useNavigate();
  const featureCards = [
    { title: "Menu", image: menuImage },
    { title: "Orders", image: ordersImage },
    { title: "Users", image: itemsImage },
  ];

  const handleCardClick = (cardName: string) => {
    if (cardName === "Canteens") {
      navigate("/canteens-list");
    } else if (cardName === "Items") {
      navigate("/items-list");
    } else if (cardName === "Menu") {
      navigate("/menus-list");
    } else if (cardName === "Users") {
      navigate("/users-list");
    }
  };

  return (
    <div>
      <div style={{ padding: "20px", paddingBottom: 0 }}>
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

export default canteenAdminDB;
