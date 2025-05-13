import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

// Page layout wrapper
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Main content container
const Container = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: auto;
  font-family: sans-serif;
  color: #333;
  margin-top: 100px;
  flex: 1; // Pushes footer to the bottom if content is short
`;

const Title = styled.h1`
  color: #010080;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
`;

const Privacy: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <Container>
        <Title>Privacy Policy</Title>
        <Paragraph>
          We respect your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.
        </Paragraph>
        <Paragraph>
          We do not share your information with third parties except as required by law or with your explicit consent.
        </Paragraph>
        <Paragraph>
          By using our website, you consent to the practices described in this Privacy Policy.
        </Paragraph>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default Privacy;
