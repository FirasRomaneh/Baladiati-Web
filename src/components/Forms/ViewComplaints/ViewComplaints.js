import { Article, CalendarCheck, CalendarX, IdentificationCard, MapPin, NavigationArrow } from 'phosphor-react'
import React from 'react'
import db from '../../../firasbasecon'
import { Button } from '../../ui'
import "./ViewComplaints.css"

const ViewComplaints = ({ closeModal, defaultData, handleClick }) => {
    let date = new Date(parseInt(defaultData.endDate, 10));
    let newDate = date.getDate()+
                "/"+ (date.getMonth()+1)+
                "/"+ date.getFullYear()+
                " "+ date.getHours()+
                ":"+ date.getMinutes()+
                ":"+ date.getSeconds();

    const updateEndDate = async () => {
      try {
          const currentDate = new Date();
          const documentRef = db.collection('complaints').doc(defaultData.id);
          await documentRef.update({ endDate: currentDate.getTime().toString() });
      } catch (error) {
          console.error('Error updating endDate', error);
      }
      closeModal();
      handleClick();
    };

  return (
    <div className="ViewC">
        <h3 className="Text_viewC">{defaultData.title}</h3>
        <div className='Photo'>
            {defaultData.imgSrc && <img src={defaultData.imgSrc} alt="Complaints" className="img" />}
        </div>
        <div className="Data_viewC">
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <IdentificationCard />
                </div>
                <div className="trans_item-data">
                    <h5> Submitter UId: {defaultData.submitterId} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <CalendarX />
                </div>
                <div className="trans_item-data">
                    <h5> Submit Date: {defaultData.submitDate} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <NavigationArrow  />
                </div>
                <div className="trans_item-data">
                    <h5> Location: {defaultData.location} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <MapPin />
                </div>
                <div className="trans_item-data">
                <h5> Google Map: {defaultData.latitude && defaultData.longitude ? (
                    <a
                    href={`https://www.google.com/maps?q=${defaultData.latitude},${defaultData.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link">
                    View on Google Maps
                    </a>) : "none"} 
                </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <Article />
                </div>
                <div className="trans_item-data">
                    <h5> Description: {defaultData.description} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <CalendarCheck />
                </div>
                <div className="trans_item-data">
                    <h5> Resolve Date: {defaultData.endDate ?  newDate : "Still"}  </h5>
                </div>
            </div>
        </div>
        <div className="ButtonViewC">
            {!defaultData.endDate ?  <div className='ButtonCC'>
            <Button size="large" onClick={updateEndDate}>
                Resolve
            </Button>
            </div> : null}
            <div className='ButtonCC'>
            <Button size="large" onClick={closeModal}>
               Close
            </Button>
            </div>
        </div>
    </div>
  )
}

export default ViewComplaints