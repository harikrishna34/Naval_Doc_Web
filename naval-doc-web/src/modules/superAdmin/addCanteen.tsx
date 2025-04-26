import React, { useState } from 'react';
import { Button } from 'antd';
import AddCanteenModal from './addCanteenModal';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddCanteen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values: any) => {
    console.log('Submitted values:', values);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button 
        type="primary" 
        size="large" 
        icon={ <PlusCircleOutlined style={{fontSize: '16px'}}/>} 
        onClick={showModal}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontWeight: 500
        }}
      >
        Add Canteen
      </Button>
      <AddCanteenModal 
        isOpen={isModalOpen} 
        onCancel={handleCancel} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default AddCanteen;