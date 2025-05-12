
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; // import Link and useNavigate for navigation
import logo from "../images/Logo.png";

const HeaderWrapper = styled.header`
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #010080;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 300;
`;

const LogoImage = styled.img`
text-align: center;
  height: 60px;
  width: auto;
  cursor: pointer;
`;

const CenterTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin: 0;
  flex-grow: 1;
  text-align: center;
  margin-left: 3rem;
`;

const EnquireButton = styled.button`
  background-color: white;
  color: #010080;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    transition: background-color 0.3s, color 0.3s;}
`;

export default function Header() {
const navigate = useNavigate();
  const  handleLoginPage = () => {
    navigate("/login");
  }

  return (
    <HeaderWrapper>
      
      <Link to="/">
        <LogoImage src={logo} alt="Naval Logo" />
      </Link>
      <CenterTitle>INDUSTRIAL NDY CANTEEN</CenterTitle>
      <EnquireButton onClick={handleLoginPage}><b>Login Now</b></EnquireButton>
    </HeaderWrapper>
  );
}
