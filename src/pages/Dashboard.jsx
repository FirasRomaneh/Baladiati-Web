import React from "react";
import DashboardWrapper, {DashboardWrapperRight } from "../components/dashboard-wrapper/DashboardWrapper";
import { images } from '../constants'
import OverallList from '../components/overall-list/OverallList'
import './Dashboard.css'




// const titleStyles = {
//     textAlign: 'center',
//     fontSize: '20px',
//     textDecoration: 'underline',
//     color: 'black',
// };

const welcomeStyles = {
    textAlign: 'center',
};


const Dashboard = () => {

    return (

        <DashboardWrapper>
            <div className="container">
                <img className="img_Home1" src={images.logo1} alt='Logo'/>
                <img className="img_Home2" src={images.logo2} alt='Logo'/>
                <div className="texts" style={welcomeStyles} >
                    <h3>أهلا وسهلا بك</h3>
                    <h3>!نتمنى لك يوم عمل سعيد</h3>
                </div>
            </div>
            <DashboardWrapperRight>
                {/* <div className="title mb" style={titleStyles}>Overall Statistics</div>
                <div className="mb"> */}
                    <OverallList />
                {/* </div>         */}
                {/* <div className="ad">
                    <Ads />
                    </div>     */}
                </DashboardWrapperRight>
        </DashboardWrapper>

    )
}

export default Dashboard