import React, { useContext, useEffect, useState } from 'react'
import './sidebar.scss'
import { Link, useLocation } from 'react-router-dom'
import { images } from '../../constants'
import sidebarNav from '../../configs/sidebarNav'
import { AuthContext } from '../../context/AuthContext'

const Sidebar = () => {
    const { logout, isAdmin } = useContext(AuthContext)
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation()

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = sidebarNav.findIndex(item => item.section === curPath)

        setActiveIndex(curPath.length === 0 ? 0 : activeItem)
    }, [location])

    const closeSidebar = () => {
        document.body.classList.remove('sidebar-open')
        document.querySelector('.main__content').style = ''
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img src={images.logo} alt="logo" />
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className="sidebar__menu">
                {
                    sidebarNav.map((nav, index) => {
                        return (
                          nav.text === 'Employees' ? 
                            isAdmin ? (
                              <Link 
                                to={nav.link} 
                                key={`nav-${index}`} 
                                className={`sidebar__menu__item ${activeIndex === index && 'active'}`} 
                                onClick={closeSidebar}
                              >
                                <div className="sidebar__menu__item__icon">
                                  {nav.icon}
                                </div>
                                <div className="sidebar__menu__item__txt">
                                  {nav.text}
                                </div>
                              </Link>
                            ) : null
                          : (
                            <Link 
                              to={nav.link} 
                              key={`nav-${index}`} 
                              className={`sidebar__menu__item ${activeIndex === index && 'active'}`} 
                              onClick={closeSidebar}
                            >
                              <div className="sidebar__menu__item__icon">
                                {nav.icon}
                              </div>
                              <div className="sidebar__menu__item__txt">
                                {nav.text}
                              </div>
                            </Link>
                          )
                        );
                      })
                }                      
                <div className="sidebar__menu__item">
                    <div className="sidebar__menu__item__icon">
                        <i className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt" onClick={logout}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
