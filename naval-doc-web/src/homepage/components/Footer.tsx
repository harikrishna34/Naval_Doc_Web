import styled from "styled-components";
import logo from "../images/Logo.png";
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";  

const FooterContainer = styled.footer`
  background-color: #010080;
  color: #fff;
  padding: 40px 20px 10px;
  font-family: sans-serif;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 30px;
`;

const Section = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h4`
  color: #fff;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 6px;
  font-size: 14px;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// const SocialIcons = styled.div`
//   a {
//     margin-right: 10px;
//     font-size: 18px;
//     color: #fff;
//     background-color: #010080;
//     padding: 8px;
//     border-radius: 50%;
//     display: inline-block;

//     &:hover {
//       background-color: #0033cc;
//     }
//   }
// `;



export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Logo Section */}
        <Section>
          <Logo src={logo} alt="Naval Logo" />
          <p>
            Naval Dockyard is known as one of the most reliable, efficient,
            and excellent service providers in the field of catering and housekeeping services.
          </p>
        </Section>

        {/* Useful Links */}
        <Section>
          <SectionTitle>Browse</SectionTitle>
          <List>
            <ListItem><Link to="/">HOME</Link></ListItem>   
            <ListItem><Link to="#about">ABOUT</Link></ListItem> 
            <ListItem><Link to="#services">SERVICES</Link></ListItem> 
            <ListItem><Link to="#gallery">GALLERY</Link></ListItem> 
            <ListItem><Link to="#contact">CONTACT US</Link></ListItem> 
          </List>
        </Section>

        {/* Other Section with Terms and Privacy Links */}
        <Section>
          <SectionTitle>Other</SectionTitle>
          {/* <SocialIcons>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaWhatsapp /></a>
          </SocialIcons> */}
          <List style={{ marginTop: "15px" }}>
            <ListItem><Link to="/terms">Terms and Conditions</Link></ListItem> 
            <ListItem><Link to="/privacy">Privacy Policy</Link></ListItem> 
          </List>
        </Section>
      </FooterContent>
    </FooterContainer>
  );
}
