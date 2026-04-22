import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  return (
    <>
      
    </>
  );
};
export default Footer;
