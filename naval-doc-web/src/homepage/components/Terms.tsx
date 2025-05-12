import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

// Wrapper for the entire page
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the viewport */
`;

// Main content container
const Container = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: auto;
  font-family: sans-serif;
  color: #333;
  margin-top: 100px;
  flex: 1; /* Allows this to take up remaining space */
  overflow-y: auto; /* Makes the content scrollable */
`;

const Title = styled.h1`
  color: #010080;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
`;

const Terms: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <Container>
        <Title>Terms and Conditions</Title>
        <h2>Naval Dockyard Canteen, Visakhapatnam</h2>
        <br />
        <h3>1. Eligibility for Access</h3>
        <br />
        <Paragraph>
          • Access to the canteen is strictly restricted to serving and retired Indian Navy personnel, civilian defense employees, and authorized dependents with valid identity cards.
          • Unauthorized entry or usage of another individual’s ID card is strictly prohibited and may lead to cancellation of canteen privileges.
        </Paragraph>
        <h3>2. Purchase Limits</h3>
        <br />
        <Paragraph>
          • Monthly purchase limits may apply as per CSD norms for select categories such as liquor, appliances, and high-value goods.
          • Bulk or resale purchases are not permitted under any circumstances.
        </Paragraph>
        <h3>3. Payment Methods</h3>
        <br />
        <Paragraph>
          • The canteen supports digital payment modes including UPI, debit/credit cards, and approved government payment platforms.
          • No credit transactions are allowed; all payments must be made in full at the time of purchase.
        </Paragraph>
        <h3>4. Product Availability</h3>
        <br />
        <Paragraph>
          • All items are subject to availability. The canteen reserves the right to revise or limit stock based on supply and demand.
          • Product pricing is regulated under government/CSD guidelines and is non-negotiable.
        </Paragraph>
        <h3>5. Returns and Exchanges</h3>
        <br />
        <Paragraph>
          • Returns or exchanges will be accepted only for defective or damaged items and must be reported within 48 hours of purchase.
          • Customers are required to present the original bill and product packaging for any returns.
        </Paragraph>
        <h3>6. Timings and Entry Protocol</h3>
        <br />
        <Paragraph>
          • Entry will be permitted only during official canteen working hours as displayed at the entrance.
          • All patrons must carry valid ID and follow entry protocols including queue systems and security checks.
        </Paragraph>
        <h3>7. Code of Conduct</h3>
        <br />
        <Paragraph>
          • Patrons are expected to maintain decorum within canteen premises. Misconduct, verbal abuse, or non-compliance with staff instructions may result in a ban from future access.
          • Smoking, photography, and use of mobile phones in billing areas are prohibited.
        </Paragraph>
        <h3>8. Amendments</h3>
        <br />
        <Paragraph>
          • The canteen management reserves the right to update or modify these terms and conditions at any time without prior notice.
        </Paragraph>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default Terms;
