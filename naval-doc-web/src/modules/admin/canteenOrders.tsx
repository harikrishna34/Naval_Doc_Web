import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Spin, Empty, message } from 'antd';

const { Title, Text } = Typography;

interface Canteen {
  id: string;
  name: string;
  ordersCount: number;
}

const API_URL = '/api/canteens'; // Replace with your actual API endpoint

const CanteenOrdersDisplay: React.FC = () => {
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const demoCanteens: Canteen[] = [
    { id: '1', name: 'Annapurna Canteen', ordersCount: 127 },
    { id: '2', name: 'Dockyard Canteen', ordersCount: 85 },
    { id: '3', name: 'Science Wing', ordersCount: 104 },
  ];

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
        await new Promise(resolve => setTimeout(resolve, 800));
        setCanteens(demoCanteens);
      } catch (error) {
        console.error('Error fetching canteen data:', error);
        setError('Failed to load canteen data. Please try again later.');
        message.error('Failed to load canteen data');
      } finally {
        setLoading(false);
      }
    };

    fetchCanteens();
  }, []);

  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    textAlign: 'center' as const,
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
    padding: '24px',
    transition: 'all 0.3s',
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: 500 as const,
    marginBottom: '20px',
  };

  const countStyle = {
    fontSize: '16px',
    fontWeight: 400 as const,
  };

  const renderContent = () => {
    // if (loading) {
    //   return (
    //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
    //       <Spin size="large" />
    //     </div>
    //   );
    // }

    if (error) {
      return (
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
          <Empty 
            description={error} 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
        </div>
      );
    }

    // if (canteens.length === 0) {
    //   return (
    //     <div style={{ textAlign: 'center', padding: '50px 20px' }}>
    //       <Empty description="No canteens found" />
    //     </div>
    //   );
    // }

    return (
      <Row gutter={[24, 24]}>
        {canteens.map((canteen) => (
          <Col key={canteen.id} xs={12} sm={12} md={9} lg={5} xl={5}>
            <Card style={cardStyle} hoverable styles={{ body: { padding: '0px' } }}>
              <Text style={nameStyle}>{canteen.name}</Text>
              <Text style={countStyle}>
                <div style={{fontWeight:"bold", color:"#010080"}}>orders count</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px', color:"red" }}>
                  {canteen.ordersCount}
                </div>
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div style={{ padding: '20px', paddingLeft:0, paddingTop:0 }}>
      {renderContent()}
    </div>
  );
};

export default CanteenOrdersDisplay;