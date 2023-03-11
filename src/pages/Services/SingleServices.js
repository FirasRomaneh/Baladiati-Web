import {React,  useState} from 'react';
import { PencilLine, Trash, List } from 'phosphor-react'
import { Button, Modal } from '../../components/ui/index'
import sweetAlert from 'bootstrap-sweetalert';
import ServicesForm from '../../components/Forms/ServicesForm/ServicesForm';

const SingleServices = ({ Data, handleDelete, handleClick }) => {
    const [showModal, setShowModal] = useState(false)

    const DeleteFunction = () =>{
      sweetAlert({
        title: "Are you sure?",
        text: "\nYou will not be able to recover this data of services\n\n",
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
          sweetAlert("Deleted!", "\nThe data of services has been deleted.\n\n", "success");
        } else {
          sweetAlert("Cancelled", "\nThe data of services is safe :)\n\n", "error");
        }
      });
    }
  
    return (
      <div className="trans_item">
        <div className="trans_item-icon">
          <List />
        </div>
        <div className="trans_item-data">
          <div>
            <h5> Title: {Data.title} </h5>
          </div>
          <div className="divData">
            <small> Required Documents: {Data.requiredDocuments} </small>, <small> Cost: {Data.cost} </small>
          </div>
          <div className="divData">
            <small> Waiting Days: {Data.waitingDays} </small>, <small> Description: {Data.description} </small>
          </div>
        </div>
        <div className="trans_item-cta">
          <Button icon onClick={() => setShowModal(true)}>
            <PencilLine />
          </Button>
          <Button type="error" icon onClick={DeleteFunction}>
            <Trash />
          </Button>
        </div>
        <Modal visible={showModal} closeModal={() => setShowModal(false)} >
          <ServicesForm parentTitle={Data.parentTitle} closeModal={() => {setShowModal(false);handleClick()}} handleClick={handleClick} defaultData={Data}/>
        </Modal>
      </div>
    )
  }

export default SingleServices