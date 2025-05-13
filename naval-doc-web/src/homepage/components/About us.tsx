import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

// Wrapper for the entire page
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Makes the page take full height of the viewport */
`;

// Main content container
const Container = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: auto;
  font-family: sans-serif;
  color: #333;
//   margin-top: 30px;
  flex: 1; /* Allows this to take up remaining space, pushing the footer down */
`;

const Title = styled.h1`
  color: #010080;
  margin-bottom: 20px;
`;

// Removed unused Paragraph styled component

const About: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <Container>
        <Title>About Us</Title>
        <h2>Naval Dockyard Canteen, Visakhapatnam
        </h2><br/>
        
        <ul>
          <li>
            The Naval Dockyard Canteen, Visakhapatnam, is a dedicated welfare establishment committed to serving the needs of Indian Navy personnel, civilian defense staff, and their families. Located within the Eastern Naval Command’s prestigious Naval Dockyard premises in Vizag, the canteen plays a vital role in supporting the morale and well-being of the defense community through the provision of essential goods at subsidized rates.
          </li><br/>
          <li>
            Established with the core objective of delivering quality and affordability, the canteen caters exclusively to serving and retired Navy personnel, offering a wide range of products—from groceries and daily essentials to select consumer goods. With strict access protocols, modernized billing systems, and a customer-centric approach, the canteen ensures a seamless and dignified shopping experience for all authorized users.
          </li><br/>
          <li>
            Over the years, the Naval Dockyard Canteen has embraced innovation, adopting secure digital payment options, inventory management systems, and customer service enhancements to improve operational efficiency. It continues to operate under the governance and policies laid down by the Indian Navy and the Canteen Stores Department (CSD), ensuring compliance, transparency, and reliability.
          </li><br/>
          <li>
            As one of the most prominent defense canteens on the east coast, the Vizag Naval Dockyard Canteen stands as a model of service, discipline, and care—reflecting the values and ethos of the Indian Navy.
          </li>
        </ul>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default About ;
