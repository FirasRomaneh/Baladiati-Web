import { Money } from 'phosphor-react';
import {React} from 'react';


const SingleDonationMadeForm = ({ Data}) => {
  return (
    <div className="trans_item">
      <div className="trans_item-icon_c">
        <Money />
      </div>
      <div className="trans_item-data">
        <div>
          <h5> Donation Maker: {Data.donationMaker} </h5>
        </div>
        <div className="divData">
          <small> Amount: {Data.amount} </small>, <small>Date: {Data.issueDate}</small>
        </div>
      </div>
    </div>
  )
}

export default SingleDonationMadeForm