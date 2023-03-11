import {React,  useState} from 'react';
import { PencilLine, Trash, Eye, Popcorn, Download } from 'phosphor-react'
import { Button, Modal, ModalTwo} from '../../components/ui/index'
import sweetAlert from 'bootstrap-sweetalert';
import TaxesForm from '../../components/Forms/TaxesForm/TaxesForm';
import ViewTaxes from '../../components/Forms/ViewTaxes/ViewTaxes';


const SingleTaxes = ({ Data, handleDelete, handleClick }) => {
  const [showModalAE, setShowModalAE] = useState(false)
  const [showModalView, setShowModalView] = useState(false)

  const DeleteFunction = () =>{
    sweetAlert({
      title: "Are you sure?",
      text: "\nYou will not be able to recover this data of taxes\n\n",
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
        sweetAlert("Deleted!", "\nThe data of taxes has been deleted.\n\n", "success");
      } else {
        sweetAlert("Cancelled", "\nThe data of taxes is safe :)\n\n", "error");
      }
    });
  }

  const generate = async (e) => {
    e.preventDefault();
    const body = {taxName: Data.title};
    const res = await fetch('https://important-foal-buckle.cyclic.app/generateTaxes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }, 
    })
    if (res.ok) {
        sweetAlert("Tax was generated successfully", "\n", "success")
    } else {
        sweetAlert("There is an issue with tax generation", "\n", "error");
    }
  };

  return (
    <div className="trans_item">

      <div className="trans_item-icon_c">
        <Popcorn />
      </div>
      <div className="trans_item-data">
        <div>
          <h5> Title: {Data.title} </h5>
        </div>
        <div className="divData">
          <small> Type: {Data.type} </small>, <small> Amount Percentage: {Data.amountPercentage} </small>, <small>Calculate By: {Data.calculateBy} </small>
        </div>
      </div>
      <div className="trans_item-cta">
      <Button icon type="on" onClick={generate}>
          <Download  />
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
        <TaxesForm closeModal={() => {setShowModalAE(false);handleClick()}} defaultData={Data}/>
      </Modal>
      <ModalTwo visible={showModalView} closeModal={() => setShowModalView(false)} >
        <ViewTaxes closeModal={() => {setShowModalView(false);handleClick()}} title={Data.title}/>
      </ModalTwo>
    </div>
  )
}

export default SingleTaxes