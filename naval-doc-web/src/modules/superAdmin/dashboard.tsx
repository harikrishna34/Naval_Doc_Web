import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DashboardContainer = styled.div`
  padding: 40px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const AddButton = styled.button`
  background-color: rgb(85, 204, 89);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 1000px;
  font-weight: bold;
  &:hover {
    background-color: #45a049;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 48%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const FeatureCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 50px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 16px;
  color: #333;
`;

const SuperAdminDashboard: React.FC = () => {
  // Placeholder images - replace with your actual image paths
  const canteenImage = "https://via.placeholder.com/80";
  const menuImage = "https://via.placeholder.com/80";
  const ordersImage = "https://via.placeholder.com/80";
  const inventoriesImage = "https://via.placeholder.com/80";
  const navigate = useNavigate();

  const handleCardClick = (cardName: string) => {
    if (cardName === "Canteens") {
      navigate("/canteens-list");
    }
  };

  return (
    <DashboardContainer>
      <StatsContainer>
        <StatCard onClick={() => handleCardClick("Total Orders")}>
          <StatTitle>TOTAL ORDERS</StatTitle>
          <StatValue>1000</StatValue>
        </StatCard>
        <StatCard onClick={() => handleCardClick("Revenue")}>
          <StatTitle>REVENUE</StatTitle>
          <StatValue>10,000</StatValue>
        </StatCard>
      </StatsContainer>

      <FeaturesContainer>
        <FeatureCard onClick={() => handleCardClick("Canteens")}>
          <FeatureImage src={canteenImage} alt="Canteens" />
          <FeatureTitle>Canteens</FeatureTitle>
        </FeatureCard>
        <FeatureCard onClick={() => handleCardClick("Menu")}>
          <FeatureImage src={menuImage} alt="Menu" />
          <FeatureTitle>Menu</FeatureTitle>
        </FeatureCard>
        <FeatureCard onClick={() => handleCardClick("Orders")}>
          <FeatureImage src={ordersImage} alt="Orders" />
          <FeatureTitle>Orders</FeatureTitle>
        </FeatureCard>
        <FeatureCard onClick={() => handleCardClick("Inventories")}>
          <FeatureImage src={inventoriesImage} alt="Inventories" />
          <FeatureTitle>Inventories</FeatureTitle>
        </FeatureCard>
      </FeaturesContainer>
    </DashboardContainer>
  );
};

export default SuperAdminDashboard;
