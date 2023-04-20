import React, { useContext, useState } from "react";
import Dropdown from './Dropdown';
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { DataBaseContext } from "../../providers/DataBaseProvider";
import './MenuItems.scss'

const MenuItems = ({ items }) => {
  const { setUsers } = useContext(DataBaseContext);
  const [dropdown, setDropdown] = useState(false);
  const userRole = ReactSession.get("role");

  const logout = () => {
    ReactSession.remove("id");
    ReactSession.remove("role");
    ReactSession.remove("name");
    setUsers(prev => [...prev])
  }  

  const menuLogin = < Link to={items.url} >{items.title}</Link> 
  const menuLogout = < Link to={items.url} onClick={logout}>{items.title}</Link> 

  return (
    <li className="menu-items">
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{' '}
          </button>
          <Dropdown
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
          <button className="nav-buttons">
            {!userRole && menuLogin}
            {userRole && menuLogout}
          </button>
      )}
    </li>
  );
}

export default MenuItems