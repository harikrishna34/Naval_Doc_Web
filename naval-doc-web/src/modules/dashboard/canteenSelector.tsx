import React from 'react';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CanteenSelectorProps } from './types';
import { headerStyles } from './styles';

const CanteenSelector: React.FC<CanteenSelectorProps> = ({ 
  options, 
  selectedCanteen, 
  onSelect 
}) => {
  // Default options if none provided
  const defaultOptions = [
    { value: 'canteen1', label: 'Main Canteen' },
    { value: 'canteen2', label: 'Staff Canteen' },
    { value: 'canteen3', label: 'Student Canteen' },
  ];

  const canteenOptions = options.length > 0 ? options : defaultOptions;

  return (
    <Select
      placeholder="Select your Canteen"
      style={headerStyles.canteenSelect}
      onChange={onSelect}
      value={selectedCanteen}
      suffixIcon={<DownOutlined />}
      options={canteenOptions}
      size="large"
    />
  );
};

export default CanteenSelector;