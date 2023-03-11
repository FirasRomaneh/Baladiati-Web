import { Popcorn } from 'phosphor-react'
import React from 'react'

const SingleViewTaxes = ({ Data }) => {
  return (
    <div className="trans_item">
    <div className={`trans_item-icon ${Data.paymentDate ? 'Resolve' : 'Not'}`}>
      <Popcorn />
    </div>
    <div className="trans_item-data">
      <div>
        <h5> Pid: {Data.pid} </h5>
      </div>
      <div className="divData">
        <small>Owner: {Data.owner} </small>, <small> Amount: {Data.amount} </small>
      </div>
    </div>
    </div>
  )
}

export default SingleViewTaxes