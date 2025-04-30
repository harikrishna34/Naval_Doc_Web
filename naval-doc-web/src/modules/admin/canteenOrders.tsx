import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Spin, Empty, message } from "antd";

const { Text } = Typography;

interface Canteen {
  id: string;
  name: string;
  ordersCount: number;
}

const API_URL = "/api/canteens";

const CanteenOrdersDisplay: React.FC = () => {
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const demoCanteens: Canteen[] = [
    { id: "1", name: "Annapurna Canteen", ordersCount: 127 },
    { id: "2", name: "Dockyard Canteen", ordersCount: 85 },
    { id: "3", name: "Science Wing", ordersCount: 104 },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        setLoading(true);

        // UNCOMMENT THIS CODE AND REMOVE THE DEMO DATA IN PRODUCTION
        // const response = await fetch(API_URL);
        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status}`);
        // }
        // const data = await response.json();
        // setCanteens(data);

        // For demo purposes only - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        setCanteens(demoCanteens);
      } catch (error) {
        console.error("Error fetching canteen data:", error);
        setError("Failed to load canteen data. Please try again later.");
        message.error("Failed to load canteen data");
      } finally {
        setLoading(false);
      }
    };

    fetchCanteens();
  }, []);

  const containerStyle = {
    padding: "24px",
    paddingLeft: 0,
    paddingTop: 0,
  };

  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  };

  const emptyContainerStyle = {
    textAlign: "center" as const,
    padding: "50px 20px",
  };

  const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    textAlign: "center" as const,
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    padding: "24px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.06)",
    minHeight: "180px",
  };

  const cardHoverStyle = {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
  };

  const nameStyle = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#262626",
    marginBottom: "16px",
    lineHeight: 1.4,
    display: "block",
  };

  const ordersLabelStyle = {
    fontSize: "14px",
    color: "#1890ff",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginBottom: "8px",
  };

  const ordersCountStyle = {
    fontSize: "32px",
    fontWeight: 700,
    color: "#f5222d",
    lineHeight: 1.2,
    transition: "transform 0.3s ease",
  };

  const getResponsiveColSpan = (width: number) => {
    if (width < 576) {
      return { xs: 24 };
    } else if (width < 768) {
      return { xs: 24, sm: 12 };
    } else if (width < 992) {
      return { xs: 24, sm: 12, md: 8 };
    } else if (width < 1200) {
      return { xs: 24, sm: 12, md: 8, lg: 6 };
    } else {
      return { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 };
    }
  };

  const getCardBackground = (id: string) => {
    const gradients = {
      "1": "linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%)",
      "2": "linear-gradient(135deg, #ffffff 0%, #f9fffd 100%)",
      "3": "linear-gradient(135deg, #ffffff 0%, #fff9f9 100%)",
    };

    return {
      background: gradients[id as keyof typeof gradients] || "#ffffff",
    };
  };

  const handleMouseEnter = (id: string) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardStyles = (id: string) => {
    return {
      ...cardStyle,
      ...(hoveredCard === id ? cardHoverStyle : {}),
      ...getCardBackground(id),
    };
  };

  const getCountStyle = (id: string) => {
    return {
      ...ordersCountStyle,
      transform: hoveredCard === id ? "scale(1.1)" : "scale(1)",
    };
  };

  const renderContent = () => {
    // if (loading) {
    //   return (
    //     <div style={loadingContainerStyle}>
    //       <Spin size="large" />
    //     </div>
    //   );
    // }

    if (error) {
      return (
        <div style={emptyContainerStyle}>
          <Empty description={error} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      );
    }

    // if (canteens.length === 0) {
    //   return (
    //     <div style={emptyContainerStyle}>
    //       <Empty description="No canteens found" />
    //     </div>
    //   );
    // }

    const colSpan = getResponsiveColSpan(windowWidth);

    return (
      <Row gutter={[24, 24]}>
        {canteens.map((canteen) => (
          <Col key={canteen.id} {...colSpan}>
            <Card
              style={getCardStyles(canteen.id)}
              hoverable
              styles={{ body: { padding: "0px" } }}
              onMouseEnter={() => handleMouseEnter(canteen.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Text style={nameStyle}>{canteen.name}</Text>
              <div>
                <div style={ordersLabelStyle}>orders count</div>
                <div style={getCountStyle(canteen.id)}>
                  {canteen.ordersCount}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return <div style={containerStyle}>{renderContent()}</div>;
};

export default CanteenOrdersDisplay;
