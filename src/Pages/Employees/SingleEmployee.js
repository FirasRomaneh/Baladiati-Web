import {React } from 'react'
import { Person, PencilLine, Trash } from 'phosphor-react'
import { Button } from '../../components/ui'

const SingleEmployee = ({ Data }) => {

  return (
    <div className="trans_item">

      <div className="trans_item-icon">
        <Person />
      </div>
      <div className="trans_item-data">
        <h4> {Data.name} </h4>
        <div>
          <small> {Data.password} </small>
        </div>

      </div>
      <div className="trans_item-cta">

        <Button icon>
          <PencilLine />
        </Button>
        <Button type="error" icon>
          <Trash />
        </Button>
      </div>
{/* 
      <Modal visible={showModal} closeModal={() => setShowModal(false)} >
         <BudgetForm closeModal={() => setShowModal(false)} defaultData={} />
      </Modal> */}
    </div>
  )
}

export default SingleEmployee