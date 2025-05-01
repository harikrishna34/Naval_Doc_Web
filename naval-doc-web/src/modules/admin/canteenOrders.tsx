import React from "react";
import { Card, Row, Col, Typography } from "antd";

interface Canteen {
  id?: string;
  canteenName: string;
  totalOrders: number;
  totalAmount: number;
}

interface CanteenOrdersDisplayProps {
  data: Canteen[];
}

const CanteenOrdersDisplay: React.FC<CanteenOrdersDisplayProps> = ({ data }) => {
  const containerStyle = {
    padding: "24px",
    paddingLeft: 0,
    paddingTop: 0,
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

  const colSpan = getResponsiveColSpan(window.innerWidth);

  return (
    <div style={containerStyle}>
      <Row gutter={[24, 24]}>
        {data.map((canteen, index) => (
          <Col key={canteen.id || index} {...colSpan}>
            <Card
              style={{ ...cardStyle, ...getCardBackground(index?.toString()) }}
              hoverable
            >
              <Typography.Text style={nameStyle}>
                {canteen?.canteenName}
              </Typography.Text>
              <div>
                <Typography.Text style={ordersLabelStyle}>
                  orders count
                </Typography.Text>
                <Typography.Text style={ordersCountStyle}>
                  {canteen.totalOrders}
                </Typography.Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CanteenOrdersDisplay;

