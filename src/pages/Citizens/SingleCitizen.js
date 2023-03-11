import {React,  useState} from 'react';
import { User, PencilLine, Trash, Eye, House } from 'phosphor-react'
import { Button, Modal, ModalTwo } from '../../components/ui/index'
 import ViewCitizenForm from '../../components/Forms/ViewCitizenForm/ViewCitizenForm';
import CitizenForm from '../../components/Forms/CitizenForm/CitizenForm';
import sweetAlert from 'bootstrap-sweetalert';
import Properties from '../../components/Forms/Properties/Properties';


const SingleCitizen = ({ Data, handleDelete, handleClick }) => {
  const [showModalAE, setShowModalAE] = useState(false)
  const [showModalView, setShowModalView] = useState(false)
  const [showModalAq, setShowModalAq] = useState(false)

  const DeleteFunction = () =>{
    sweetAlert({
      title: "Are you sure?",
      text: "\nYou will not be able to recover this data of citizen\n\n",
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
        sweetAlert("Deleted!", "\nThe data of citizen has been deleted.\n\n", "success");
      } else {
        sweetAlert("Cancelled", "\nThe data of citizen is safe :)\n\n", "error");
      }
    });
  }

  return (
    <div className="trans_item">

      <div className="trans_item-icon_c">
        <User />
      </div>
      <div className="trans_item-data">
        <div>
          <h5> UID: {Data.uid} </h5>
        </div>
        <div className="divData">
          <small> Name: {Data.name} </small>
        </div>
      </div>
      <div className="trans_item-cta">
      <Button icon type="success" onClick={() => setShowModalAq(true)}>
          <House />
        </Button>
      <Button icon type="view" onClick={() => setShowModalView(true)}>
          <Eye />
        </Button>
        <Button icon onClick={() => setShowModalAE(true)}>
          <PencilLine />
        </Button>
        <Button type="error" icon onClick={DeleteFunction}>
          <Trash />
        </Button>
      </div>
      <Modal visible={showModalAE} closeModal={() => setShowModalAE(false)} >
          <CitizenForm closeModal={() => {setShowModalAE(false);handleClick()}} defaultData={Data}/>
      </Modal>
      <Modal visible={showModalView} closeModal={() => setShowModalView(false)} >
          <ViewCitizenForm closeModal={() => {setShowModalView(false);}} defaultData={Data}/>
      </Modal>
      <ModalTwo visible={showModalAq} closeModal={() => setShowModalAq(false)} >
          <Properties uid={Data.uid} closeModal={() => {setShowModalAq(false);}}/>
      </ModalTwo>
    </div>
  )
}

export default SingleCitizen