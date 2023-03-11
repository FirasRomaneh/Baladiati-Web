import { Article, CalendarCheck, CalendarX, Crown, FacebookLogo, InstagramLogo, Phone, TextT, WhatsappLogo } from 'phosphor-react'
import React from 'react'
import { Button } from '../../ui'

const ViewAdvertisement = ({ closeModal, defaultData }) => {
  return (
    <div className="ViewC">
        <h3 className="Text_viewC">{defaultData.type}</h3>
        <div className='Photo'>
            {defaultData.imgSrc && <img src={defaultData.imgSrc} alt="Advertisement" className="img" />}
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
                    <h5> Advertise Owner: {defaultData.advertiseOwner} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <CalendarX />
                </div>
                <div className="trans_item-data">
                    <h5> Start Date: {defaultData.startDate} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <CalendarCheck />
                </div>
                <div className="trans_item-data">
                    <h5> End Date: {defaultData.endDate} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <Phone />
                </div>
                <div className="trans_item-data">
                    <h5> Phone: {defaultData.phone} </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <FacebookLogo />
                </div>
                <div className="trans_item-data">
                    <h5> Facebook Link: {defaultData.facebook ? (
                        <a
                        href={`${defaultData.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link">
                        View Facebook Page
                        </a>) : "none"} 
                    </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <InstagramLogo />
                </div>
                <div className="trans_item-data">
                    <h5> Instagram Link: {defaultData.instagram ? (
                        <a
                        href={`${defaultData.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link">
                        View Instagram Page
                        </a>) : "none"} 
                    </h5>
                </div>
            </div>
            <div className="item_viewC">
                <div className="trans_item-icon">
                    <WhatsappLogo />
                </div>
                <div className="trans_item-data">
                    <h5> Whatsapp Number:&nbsp; {defaultData.whatsapp ? defaultData.whatsapp : "none"} 
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

export default ViewAdvertisement