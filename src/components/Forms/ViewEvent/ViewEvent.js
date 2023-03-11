import { Article, CalendarCheck, CalendarX, Crown, MapPin, NavigationArrow, TextT } from 'phosphor-react'
import React from 'react'
import { Button } from '../../ui'

const ViewEvent = ({ closeModal, defaultData }) => {
  return (
    <div className="ViewC">
        <h3 className="Text_viewC">{defaultData.title}</h3>
        <div className='Photo'>
            {defaultData.imgSrc && <img src={defaultData.imgSrc} alt="Event" className="img" />}
        </div>
        <div className="Data_viewC">
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <TextT />
                </div>
                <div className="trans_item-data">
                    <h5> Title: {defaultData.title} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <Crown />
                </div>
                <div className="trans_item-data">
                    <h5> Advertise Owner: {defaultData.owner} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <CalendarX />
                </div>
                <div className="trans_item-data">
                    <h5> Start Date: {defaultData.eventDate} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <CalendarCheck />
                </div>
                <div className="trans_item-data">
                    <h5> End Date: {defaultData.eventEndDate} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <NavigationArrow />
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
                    <h5> Google map Link: {defaultData.googlemap ? (
                        <a
                        href={`${defaultData.googlemap}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link">
                        View Google map
                        </a>) : "none"} 
                    </h5>
                </div>
            </div>
        <div className="item_viewCD">
                <div className="trans_item-icon">
                    <Article />
                </div>
                <div className="trans_item-data">
                    <h5> Description: {defaultData.description} </h5>
                </div>
            </div>
        </div>
        <div className="ButtonViewC">
            <div className='ButtonCC'>
            <Button size="large" onClick={closeModal}>
               Close
            </Button>
            </div>
        </div>
    </div>
  )
}

export default ViewEvent