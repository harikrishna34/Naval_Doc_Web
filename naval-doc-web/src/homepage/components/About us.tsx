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
        <Title>About Us</Title>
        <h3>Naval Dockyard Canteen, Visakhapatnam</h3><br />
        <Paragraph>
          • The Naval Dockyard, Visakhapatnam provides canteen facilities to its workers in close proximity to their workplace. The Industrial Canteens—namely Annapoorna, Amruth, and Aahar—are located in building Nos. P-48, P-49, and P-17 of Naval Dockyard (V), as per the provisions of Section 46 of the Factory Act, 1948. These Industrial Canteens serve breakfast, tea, snacks, and lunch to yard employees daily.<br />

          • Operating on a ‘No Loss, No Profit’ basis, these canteens play a crucial role in supporting the morale and well-being of the Defence community by offering hygienic and wholesome meals every day.

        </Paragraph>
        <h3>Core Objective and Commitment
        </h3>
        <br />
        <Paragraph>
          • Established with a mission to ensure quality and affordability, the canteens serve exclusively to all dockyard employees, offering a wide variety of meals and snacks. With strict access protocols, modernized billing systems, and a customer-centric approach, the canteens provide a dignified and seamless dining experience to every yard employee.
        </Paragraph>
        <h3>Innovation and Operational Excellence
        </h3><br />
        <h4>Over the years, the Naval Dockyard canteen system has embraced innovation by:
        </h4><br />
        <Paragraph>
          • Implementing secure digital payment options<br />
          • Introducing inventory management systems<br />
          • Enhancing customer service for operational efficiency <br />
          • The operations strictly adhere to the governance and policies of the Indian Navy and the Factories Act 1948, ensuring compliance, transparency, and reliability.<br />
        </Paragraph>
        <h3>A Model of Service and Discipline
        </h3>
        <br />
        <Paragraph>
          • Recognized as one of the most prominent defence canteens, the Industrial Wet Canteens of the Dockyard serve as a model of service, discipline, and care, embodying the values and ethos of the Indian Navy.
        </Paragraph>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default Terms;
