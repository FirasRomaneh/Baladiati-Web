import React from "react"
import './main-layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from "../components/sidebar/Sidebar"
import TopNav from "../components/topnav/TopNav"

const MainLayout = ({flag = true}) => {

    return(
        <>
        <Sidebar/>
        <div className="main">
            <div className="main__content">
                {flag ? 
                <TopNav/> : null }
                <Outlet/>
            </div>
        </div>


        </>
    )


}

export default MainLayout