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
        <h2>Industrial Wet Canteen – Naval Dockyard, Visakhapatnam
        </h2>
        <br />
        <Paragraph>
          Welcome to the Industrial Wet Canteen of Naval Dockyard, Visakhapatnam. To ensure smooth and disciplined operations, all users are required to follow the terms outlined below:


        </Paragraph>
        <h3>1.⁠ ⁠Booking Limits</h3>
        <br />
        <Paragraph>
          • Each individual is allowed to book up to 3 food items (meals, snacks, or breakfast) per day.
        </Paragraph>
        <h3>2.⁠ ⁠Payment Policy
        </h3>
        <br />
        <Paragraph>
          • We accept digital payments only (UPI, debit/credit cards, and authorized government platforms).

          • No credit or postpaid transactions are allowed. Full payment must be made during booking.

        </Paragraph>
        <h3>3.⁠ ⁠Product Availability
        </h3>
        <br />
        <Paragraph>
          • Food items are subject to availability of ingredients and stock. We recommend early bookings to avoid inconvenience.
        </Paragraph>
        <h3>4.⁠ ⁠Conduct Guidelines
        </h3>
        <br />
        <Paragraph>
          • All users must maintain discipline and respectful behavior within canteen premises.

          •Misconduct, verbal abuse, or non-compliance may result in disciplinary action.

        </Paragraph>
        <h3>5.⁠ ⁠Booking & Cancellation Timings
        </h3>
        <br />
        <Paragraph>
          • Breakfast bookings close at 11:00 AM (previous day)
          • Snacks bookings close at 09:00 AM (same day)
          • Lunch bookings close at 10:00 AM (same day)
          • Cancellations are permitted if made 1–2 days in advance, in accordance with service-specific cut-off times.
        </Paragraph>
        ⚠️ Note: Canteen Management reserves the right to update or revise these terms at any time without prior notice.
       
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default Terms;
