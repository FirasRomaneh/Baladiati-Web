import { React, useState, useContext } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)
  const Links = ["/MainPage", "/MainPage", "/MainPage/Employees", "/MainPage", "/MainPage"]

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="menu">
        { SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={item.key}
              onClick={() => setSelected(index)}
            >
              <NavLink to={Links[item.key-1]}>
              <item.icon />
              </NavLink>
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem" onClick={logout}>
          <UilSignOutAlt /> Log out
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
