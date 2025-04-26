import React from 'react';
import { Typography, Space } from 'antd';

const WorldtekLogo: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>
      <Space align="center">
        <Typography.Text style={{ color: '#333', fontSize: '14px', fontWeight: 400 }}>
          powered by
        </Typography.Text>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'white',
            border: '2px solid #FF6B00',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              color: '#FF6B00',
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: 'Arial, sans-serif',
              lineHeight: 1
            }}>w</div>
          </div>
          <Typography.Text style={{ 
            color: '#333', 
            fontSize: '14px', 
            fontWeight: 500,
            marginLeft: '5px'
          }}>
            worldtek
          </Typography.Text>
        </div>
      </Space>
    </div>
  );
};

export default WorldtekLogo;