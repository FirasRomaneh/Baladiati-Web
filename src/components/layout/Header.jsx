import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

import logoImg from "../../imgs/logo.png";
import { SignOut } from "phosphor-react";
import { AuthContext } from "../../context/AuthContext";

const DLink = ({ slug, end, title, children }) => {
  return (
    <Nav.Link as="span">
      <NavLink className={styles.navLink} to={slug} end={!!end}>
        {title} {children}
      </NavLink>
    </Nav.Link>
  );
};

const Header = () => {
  const { logout } = useContext(AuthContext)
  return (
    <header className={styles.header}>
      <Navbar className={styles.Nav}>
        <Container>
          <Navbar.Brand as="span">
            <DLink slug="/MainPage">
              <img src={logoImg} alt="Codv logo" />
            </DLink>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <DLink title="Home" slug="/MainPage" end/>
            <DLink title="Employees" slug="/MainPage/Employees"/>
            <DLink title="Citizen" slug="/MainPage/Citizen" />
            <DLink title="Complaints" slug="/MainPage/Complaints" />
            <DLink title="Taxes" slug="/MainPage/Taxes"/>
            <DLink title="Services" slug="/MainPage/Services" />
            <DLink title="Events" slug="/MainPage/Events" />
            <DLink title="Ads" slug="/MainPage/Ads" />
            <DLink title="Donations" slug="/MainPage/Donations" />
          </Nav>
        </Container>
          {/* signoutIcon */}
        <div className={styles.menuItem} onClick={logout}>
          <SignOut />
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
