import styled from "styled-components";
import { Link,  useLocation } from "react-router-dom"; // Added useLocation
import logo from "/public/Naval.jpg";

const HeaderWrapper = styled.header`
  display: flex;
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
  height: 80px;
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

// const EnquireButton = styled.button`
//   background-color: white;
//   color: #010080;
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-left: auto;
//   &:hover {
//     transition: background-color 0.3s, color 0.3s;
//   }
// `;

export default function Header() {
  // const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // const handleLoginPage = () => {
  //   navigate("/login");
  // };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      // If already on home page, scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    // Otherwise, the Link component will handle navigation
  };

  return (
    <HeaderWrapper>
      <Link to="/" onClick={handleLogoClick}>
        <LogoImage src={logo} alt="Naval Logo" />
      </Link>
      <CenterTitle>INDUSTRIAL NDY CANTEEN</CenterTitle>
      {/* <EnquireButton onClick={handleLoginPage}>
        <b>Login Now</b>
      </EnquireButton> */}
    </HeaderWrapper>
  );
}