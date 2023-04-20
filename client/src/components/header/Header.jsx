import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {

  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          RentProof
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
