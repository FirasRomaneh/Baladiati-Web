import { PencilLine, Power, Trash } from 'phosphor-react'
import React,{useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import sweetAlert from 'bootstrap-sweetalert';
import { Modal } from '../../components/ui';
import DonationMadeForm from '../../components/Forms/DonationMadeForm/DonationMadeForm';
import db from '../../firasbasecon';
import DonationForm from '../../components/Forms/DonationForm/DonationForm';

const SingleDonation = ({ Data, handleDelete, handleClick }) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalView, setShowModalView] = useState(false)
    const [Have, setHave] = useState(false)
      db.collection('DonationMade').where('title', '==', Data.title).get().then(function(querySnapshot) {
        if (querySnapshot.size > 0) {
          setHave(true)              
        } else {
          setHave(false)
        }
      }); 
    const DeleteFunction = () =>{
      sweetAlert({
        title: "Are you sure?",
        text: "\nYou will not be able to recover this data of donation\n\n",
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
          sweetAlert("Deleted!", "\nThe data of donation has been deleted.\n\n", "success");
        } else {
          sweetAlert("Cancelled", "\nThe data of donation is safe :)\n\n", "error");
        }
      });
    }    
    const ChangeState = async () => {
      const query = db.collection('donation').doc(Data.id);
      await query.update({
          description: Data.description,
          imgSrc: Data.imgSrc,
          title: Data.title,
          active: !Data.active,
      })
      handleClick()
    }
    return (
      <Card>
        <Card.Img variant="top" src={Data.imgSrc} title="View Donation Made" onClick={() => setShowModalView(!showModalView)} />
        <Card.Body>
          <Card.Title>{Data.title}</Card.Title>
        </Card.Body>
        <div className='buttons'>
          <Button className='Button' onClick={() => setShowModal(true)}><PencilLine className='icon'/> Edit</Button>
          {!Have ? <Button className='Button btn-Delete' onClick={DeleteFunction}><Trash className='icon'/> Delete</Button>
          : <Button className={`Button ${Data.active ? 'btn-Delete' : 'btn-on'}`} onClick={ChangeState}><Power className='icon'/>{Data.active ? "OFF" : "ON"}</Button> }
        </div>
        <Modal visible={showModal} closeModal={() => setShowModal(false)} >
          <DonationForm defaultData={Data} closeModal={() => {setShowModal(false);handleClick()}}/>
        </Modal>
        <Modal visible={showModalView} closeModal={() => setShowModalView(false)} >
          <DonationMadeForm title={Data.title} closeModal={() => {setShowModalView(false)}}/>
        </Modal>
      </Card>  
    );
}

export default SingleDonation