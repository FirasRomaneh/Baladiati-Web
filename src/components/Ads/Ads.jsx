import React from "react";
import "./Ads.css";
import { data } from '../../constants'

const Ads = () => {
  return (
    <div className="Ads">
      {data.updateAd.map((update) => {
        return (
          <div className="update">
            <img src={update.img} alt="profile" />
            <div className="noti">
              <div  style={{marginBottom: '0.5rem'}}>
                <span>{update.name}</span>
                <span> {update.noti}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ads;
