import React from 'react';
import { Card, Typography, Empty } from 'antd';

const { Title } = Typography;

const PastOrders: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    borderRadius: '20px',
    border: '2px solid #2657BC',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: '20px'
  };

  const titleStyle: React.CSSProperties = {
    color: '#2657BC',
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '24px',
    textAlign: 'center'
  };

  return (
    <Card style={cardStyle} bodyStyle={{ padding: '24px' }}>
      <Title level={4} style={titleStyle}>
        Past Orders
      </Title>
      
      <Empty 
        description="No orders yet" 
        style={{ 
          margin: '40px 0',
          opacity: 0.7
        }} 
      />
    </Card>
  );
};

export default PastOrders;