import { Link } from "react-router-dom/cjs/react-router-dom";
import './Dropdown.scss'

const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <Link to={submenu.url}>{submenu.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;