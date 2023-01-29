import {React,  useState} from 'react';
import { Person, PencilLine, Trash } from 'phosphor-react'
import { Button, Modal } from '../../components/ui/index'
import EmployeeForm from '../../components/Forms/EmployeeForm';

const SingleEmployee = ({ Data, handleDelete, handleClick }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="trans_item">

      <div className="trans_item-icon">
        <Person />
      </div>
      <div className="trans_item-data">
        <h5> UID: {Data.uid} </h5>
        <div>
          <small> Name: {Data.name} </small>, <small> Password: {Data.password} </small>
        </div>
      </div>
      <div className="trans_item-cta">

        <Button icon onClick={() => setShowModal(true)}>
          <PencilLine />
        </Button>
        <Button type="error" icon onClick={() => handleDelete(Data.uid)}>
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