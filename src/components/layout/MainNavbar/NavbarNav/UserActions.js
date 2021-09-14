import React from "react";
import { Link } from "react-router-dom";
import { getUser, removeUserSession } from '../../../../utils/auth';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

function Dashboard(props) {
 
  const user = getUser();

  if(!user){
    window.open("/login", "_self");
  }

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/');
  }

  const toggleUserActions = () => {
 
  }

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          className="user-avatar rounded-circle mr-2"
          src={require("./../../../../images/avatars/0.jpg")}
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">Hi {user.name}!</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={1}>
        <DropdownItem tag={Link} to="/" onClick={handleLogout} className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
}

export default Dashboard;