import {React,  useState} from 'react';
import { User, PencilLine, Trash } from 'phosphor-react'
import { Button, Modal } from '../../components/ui/index'
import EmployeeForm from '../../components/Forms/EmployeeForm/EmployeeForm';
import sweetAlert from 'bootstrap-sweetalert';

const SingleEmployee = ({ Data, handleDelete, handleClick }) => {
  const [showModal, setShowModal] = useState(false)

  const DeleteFunction = () =>{
    sweetAlert({
      title: "Are you sure?",
      text: "\nYou will not be able to recover this data of employee\n\n",
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
        handleDelete(Data.uid)
        sweetAlert("Deleted!", "\nThe data of employee has been deleted.\n\n", "success");
      } else {
        sweetAlert("Cancelled", "\nThe data of employee is safe :)\n\n", "error");
      }
    });
  }

  return (
    <div className="trans_item">

      <div className={`trans_item-icon ${Data.administrator ? 'administrator' : ''}`}>
        <User />
      </div>
      <div className="trans_item-data">
        <div>
          <h5> UID: {Data.uid} </h5>
        </div>
        <div className="divData">
          <small> Name: {Data.name} </small>, <small> Email: {Data.email} </small> <small>  {Data.administrator ? ", Administrator: Yes" : ""}</small>
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
          <EmployeeForm closeModal={() => {setShowModal(false);handleClick()}} defaultData={Data}/>
      </Modal>
    </div>
  )
}

export default SingleEmployee