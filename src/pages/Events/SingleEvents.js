import React, { useState } from 'react'
import { Button, Card} from "react-bootstrap";
import sweetAlert from 'bootstrap-sweetalert';
import { Calendar, PencilLine, Trash } from 'phosphor-react';
import { ModalTwo, Modal } from '../../components/ui';
import EventsForm from '../../components/Forms/EventsForm/EventsForm';
import ViewEvent from '../../components/Forms/ViewEvent/ViewEvent';

const SingleEvents = ({ Data, handleDelete, handleClick }) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalView, setShowModalView] = useState(false)

    const DeleteFunction = () =>{
        sweetAlert({
          title: "Are you sure?",
          text: "\nYou will not be able to recover this data of event\n\n",
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
            sweetAlert("Deleted!", "\nThe data of event has been deleted.\n\n", "success");
          } else {
            sweetAlert("Cancelled", "\nThe data of event is safe :)\n\n", "error");
          }
        });
      }    

      return (
          <Card>
            <Card.Img variant="top" src={Data.imgSrc} title="View Event Details" onClick={() => setShowModalView(!showModalView)} />
            <Card.Body>
              <Card.Title>{Data.title}</Card.Title>
              <Card.Text><Calendar className='icon'/>{Data.eventDate} to {Data.eventEndDate}</Card.Text>
            </Card.Body>
            <div className='buttons'>
                <Button className='Button' onClick={() => setShowModal(true)}><PencilLine className='icon'/> Edit</Button>
                <Button className='Button btn-Delete' onClick={DeleteFunction}><Trash className='icon'/> Delete</Button>
              </div>
          <Modal visible={showModal} closeModal={() => setShowModal(false)} >
              <EventsForm closeModal={() => {setShowModal(false);handleClick()}} handleClick={handleClick} defaultData={Data}/>
          </Modal>
          <ModalTwo visible={showModalView} closeModal={() => setShowModalView(false)} >
            <ViewEvent closeModal={() => {setShowModalView(false)}} defaultData={Data}/>
          </ModalTwo>
        </Card>
      );
  }

export default SingleEvents