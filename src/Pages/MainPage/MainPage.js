import React from 'react'
import './MainPage.css'
import logoImg from "../../imgs/logo1.png";
import logoImg2 from "../../imgs/logo2.png";

const MainPage = () => {

  return (
  <div className="HomePage">
    <img className="img_Home1" src={logoImg} alt='Logo'/>
    <img className="img_Home2" src={logoImg2} alt='Logo'/>
    <div className='Welcome_Home'>
      <h1>أهلا وسهلا بك</h1>
      <h1>نتمى لك يوم عمل سعيد</h1>
    </div>
  </div>
  )
}

export default MainPage