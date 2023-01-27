import React from 'react'
// import Sidebar from '../../components/Sidebar'
import MainDash from '../../components/MainDash/MainDash'
import RightSide from '../../components/RigtSide/RightSide'
import './MainPage.css'

const MainPage = () => {
  return (
    <div className="Main">
    <div className="MainGlass">
      {/* <Sidebar/> */}
      <MainDash/>
      <RightSide/>
    </div>
  </div>
  )
}

export default MainPage