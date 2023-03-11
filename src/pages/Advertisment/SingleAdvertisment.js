import React, { useState } from 'react'
import { Button, Card} from "react-bootstrap";
import sweetAlert from 'bootstrap-sweetalert';
import "./postCard.css";
import { Calendar, PencilLine, Trash } from 'phosphor-react';
import { ModalTwo } from '../../components/ui';
import AdvertisementForm from '../../components/Forms/AdvertisementForm/AdvertisementForm';
import ViewAdvertisement from '../../components/Forms/ViewAdvertisement/ViewAdvertisement';

const SingleAdvertisment = ({ Data, handleDelete, handleClick }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalView, setShowModalView] = useState(false)

    const DeleteFunction = () =>{
        sweetAlert({
          title: "Are you sure?",
          text: "\nYou will not be able to recover this data of advertisement\n\n",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            handleDelete(Data.id)
            sweetAlert("Deleted!", "\nThe data of advertisement has been deleted.\n\n", "success");
          } else {
            sweetAlert("Cancelled", "\nThe data of advertisement is safe :)\n\n", "error");
          }
        });
      }    

      return (
          <Card>
            <Card.Img variant="top" src={Data.imgSrc} title="View Advertisement Details"  onClick={() => setShowModalView(!showModalView)} />
            <Card.Body>
              <Card.Title>{Data.title}</Card.Title>
              <Card.Text><Calendar className='icon'/>{Data.startDate} to {Data.endDate}</Card.Text>
            </Card.Body>
            <div className='buttons'>
              <Button className='Button' onClick={() => setShowModal(true)}><PencilLine className='icon'/> Edit</Button>
              <Button className='Button btn-Delete' onClick={DeleteFunction}><Trash className='icon'/> Delete</Button>
            </div>
          <ModalTwo visible={showModal} closeModal={() => setShowModal(false)} >
              <AdvertisementForm closeModal={() => {setShowModal(false);handleClick()}} handleClick={handleClick} defaultData={Data}/>
          </ModalTwo>
          <ModalTwo visible={showModalView} closeModal={() => setShowModalView(false)} >
            <ViewAdvertisement closeModal={() => {setShowModalView(false)}} defaultData={Data}/>
          </ModalTwo>
        </Card>
      );
  }

export default SingleAdvertisment