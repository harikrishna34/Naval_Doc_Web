import React from 'react';
import { Card, Space, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface PaymentMethodProps {
  title: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ title }) => {
  return (
    <Card 
      style={{ 
        marginBottom: '16px', 
        borderRadius: '12px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
      styles={{body : {
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}}
    >
      <Typography.Text style={{ fontSize: '16px', color: '#5B73E8', fontWeight:"bold" }}>
        {title}
      </Typography.Text>
      <RightOutlined style={{ color: '#5B73E8' }} />
    </Card>
  );
};

export default PaymentMethod;