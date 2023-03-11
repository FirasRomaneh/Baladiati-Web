import { Button } from "../../ui/index"
import React from 'react'
import './ViewCitizenForm.css'
import { Envelope, IdentificationBadge, IdentificationCard, Money , Phone} from "phosphor-react"

const ViewCitizenForm = ({ closeModal, defaultData }) => {

  return (
    <div className="View">
        <h2 className="Text_view">View Citizen Info</h2>
        <div className="Data_view">
            <div className="item_view">
                <div className="trans_item-icon">
                    <IdentificationCard />
                </div>
                <div className="trans_item-data">
                    <h5> UID: {defaultData.uid} </h5>
                </div>
            </div>
            <div className="item_view">
                <div className="trans_item-icon">
                    <Envelope />
                </div>
                <div className="trans_item-data">
                    <h5> Email: {defaultData.email} </h5>
                </div>
            </div>
            <div className="item_view">
                <div className="trans_item-icon">
                    <IdentificationBadge />
                </div>
                <div className="trans_item-data">
                    <h5> Name: {defaultData.name} </h5>
                </div>
            </div>
            <div className="item_view">
                <div className="trans_item-icon">
                    <Money />
                </div>
                <div className="trans_item-data">
                    <h5> Credit: {defaultData.credit} </h5>
                </div>
            </div>
            <div className="item_view">
                <div className="trans_item-icon">
                    <Phone />
                </div>
                <div className="trans_item-data">
                    <h5> Phone Number: {defaultData.phoneNumber} </h5>
                </div>
            </div>
        </div>
        <div className="ButtonView">
            <Button size="large" onClick={closeModal}>
               Close
            </Button>
        </div>
    </div>
  )
}

export default ViewCitizenForm