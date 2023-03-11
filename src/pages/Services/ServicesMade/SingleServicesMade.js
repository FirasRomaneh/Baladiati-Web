import {React, useState} from 'react';
import { Check, File, Record } from 'phosphor-react'
import { Button, Modal} from '../../../components/ui/index'
import ServicesMadeForm from '../../../components/Forms/ServicesMadeForm/ServicesMadeForm';
import db from '../../../firasbasecon';

const SingleServicesMade = ({ Data, handleClick }) => {
  const [showModal, setShowModal] = useState(false)
  const updateEndDate = async () => {
    try {
        const currentDate = new Date();
        const documentRef = db.collection('serviceMade').doc(Data.id);
        await documentRef.update({ endDate: currentDate.getTime().toString() });
    } catch (error) {
        console.error('Error updating endDate', error);
    }
    handleClick();
  };
  return (
    <div className="trans_item">
      <div className={`trans_item-icon ${Data.endDate ? 'Resolve' : 'Not'}`}>
        <Record />
      </div>
      <div className="trans_item-data">
        <div>
          <h5> Title: {Data.title} </h5>
        </div>
        <div className="divData">
          <small> Submitter UID: {Data.submitterId} </small>, <small>Date: {Data.submitDate}</small> <small>, Documents:&nbsp;    
          {Data.documents ?                
             <a
              href={Data.documents}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link">
              View Documents
            </a>: "none"} </small>
        </div>
      </div>
      <div className="trans_item-cta">
      {!Data.endDate ? <Button icon onClick={updateEndDate}>
        <Check />
        </Button> : 
        <Button icon onClick={() => setShowModal(true)}>
          <File />
        </Button>
        }
      </div>
      <Modal visible={showModal} closeModal={() => setShowModal(false)} >
          <ServicesMadeForm  closeModal={() => {setShowModal(false)}} defaultData={Data}/>
      </Modal>
    </div>
  )
}

export default SingleServicesMade