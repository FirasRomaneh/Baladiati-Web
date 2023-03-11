import {React,  useState} from 'react';
import { Trash, Eye, Receipt } from 'phosphor-react'
import { Button, ModalTwo } from '../../components/ui/index'
import sweetAlert from 'bootstrap-sweetalert';
import './Complaints.css';
import ViewComplaints from '../../components/Forms/ViewComplaints/ViewComplaints';



const SingleComplaints = ({ Data, handleDelete, handleClick }) => {
  const [showModalView, setShowModalView] = useState(false)

  const DeleteFunction = () =>{
    sweetAlert({
      title: "Are you sure?",
      text: "\nYou will not be able to recover this data of complaint\n\n",
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
        sweetAlert("Deleted!", "\nThe data of complaint has been deleted.\n\n", "success");
      } else {
        sweetAlert("Cancelled", "\nThe data of complaint is safe :)\n\n", "error");
      }
    });
  }

  return (
    <div className="trans_item">
      <div className={`trans_item-icon ${Data.endDate ? 'Resolve' : 'Not'}`}>
        <Receipt />
      </div>
      <div className="trans_item-data">
        <div>
          <h5> Title: {Data.title} </h5>
        </div>
        <div className="divData">
          <small> Submitter UID: {Data.submitterId} </small>, <small>Date: {Data.submitDate}</small>
        </div>
      </div>
      <div className="trans_item-cta">
        <Button icon onClick={() => setShowModalView(true)}>
          <Eye />
        </Button>
        <Button type="error" icon onClick={DeleteFunction}>
          <Trash />
        </Button>
      </div>
      <ModalTwo visible={showModalView} closeModal={() => setShowModalView(false)} >
          <ViewComplaints closeModal={() => {setShowModalView(false)}} handleClick={handleClick} defaultData={Data}/>
      </ModalTwo>
    </div>
  )
}

export default SingleComplaints