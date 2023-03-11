import {React,  useState} from 'react';
import { PencilLine, Trash, House } from 'phosphor-react'
import { Button, Modal} from '../../ui/index'
import sweetAlert from 'bootstrap-sweetalert';
import PropertiesForm from '../PropertiesForm/PropertiesForm';


const SingleProperties = ({ Data, handleDelete, handleClick, owner }) => {
  const [showModal, setShowModal] = useState(false)

  const DeleteFunction = () =>{
    sweetAlert({
      title: "Are you sure?",
      text: "\nYou will not be able to recover this Data of Property\n\n",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel pls!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm) {
      if (isConfirm) {
        handleDelete(Data.pid)
        sweetAlert("Deleted!", "\nThe Data of Property has been deleted.\n\n", "success");
      } else {
        sweetAlert("Cancelled", "\nThe Data of Property is safe :)\n\n", "error");
      }
    });
  }

  return (
    <div className="trans_item">

      <div className={`trans_item-icon_c ${Data.type === 'commercial' ? 'commercial' : ''}`}>
        <House />
      </div>
      <div className="trans_item-data">
        <div>
          <h5> PID: {Data.pid} </h5>
        </div>
        <div className="divData">
          <small> locationDescription: {Data.locationDescription} </small>
        </div>
        <div className="divData">
          <small> space: {Data.space} </small>, <small> value: {Data.value} </small>, <small> type: {Data.type} </small>
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
          <PropertiesForm owner={owner} closeModal={() => {setShowModal(false);handleClick()}} defaultData={Data}/>
      </Modal>
    </div>
  )
}

export default SingleProperties