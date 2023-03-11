import { Money } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import db from '../../../firasbasecon'
import { Button } from '../../ui'
import SingleDonationMadeForm from './SingleDonationMadeForm'
import "./style.css"

const DonationMadeForm = ({title, closeModal}) => {
    const [Have, setHave] = useState(false)
    const [MadeData, setMadeData] = useState()
    const [TotalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
      if(!Have){
        let data = []
        let Total = 0
        db.collection('DonationMade').where('title', '==', title).get().then(async function(querySnapshot) {
          if (querySnapshot.size > 0) {
            setHave(true)              
            querySnapshot.forEach(doc => {
              Total = Total + parseInt(doc.data().amount, 10);
              let newData = {...doc.data()};
              let date = new Date(parseInt(newData.issueDate, 10));
              let newDate = date.getDate().toString().padStart(2, '0') + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getFullYear();
              let newTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');
              newData.issueDate = newDate + " " + newTime;
              newData.Date = date;
              newData.id = doc.id;
              data.push(newData);
            })
          } else {
            setHave(false)
          }
          setTotalAmount(Total);
          let sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
          setMadeData(sortedData);          
          }); 
        } 
    },[title, Have, TotalAmount]);
  return (
    <section className="trans">
      <div className='Headermade'>
        <Money className='icon'/>TotalAmount: {TotalAmount}
      </div>
      <div className="trans_content">
          {MadeData && MadeData.length > 0 && MadeData.map((item) => (
              <SingleDonationMadeForm Data={item} key={item.id}/>
          ))}
      </div>
      <div className='ModelClose'>
            <Button onClick={closeModal}>Close</Button>
        </div>
    </section>
  )
}

export default DonationMadeForm