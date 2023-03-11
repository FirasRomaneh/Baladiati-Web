import React from 'react'
import './recent-ads.css'
import Ads from "../Ads/Ads";
import { updateAd } from '../../constants'


const recentAds =() => {
    return (
        <div className="rightside">
            <div>
                <h3>Recent Advertisments</h3>
                <Ads />
            </div>

            </div>
    );

};

export default recentAds;
