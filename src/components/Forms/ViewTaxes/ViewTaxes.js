import {React,  useState, useEffect} from 'react';
import db from "../../../firasbasecon";
import { Button} from '../../ui/index';
import SingleViewTaxes from './SingleViewTaxes';
import "./ViewTaxes.css"


const ViewTaxes = ({ closeModal, title }) => {

  const [filteredData, setFilteredData] = useState();
  const [Data, setData] = useState();
  const [PaidAmount, setPaidAmount] = useState(0);
  const [UnPaidAmount, setUnPaidAmount] = useState(0);
  const [State, setState] = useState("All");
  const [search, setSearch] = useState('');

  useEffect(() => {
      const data = []
      let PaidTotal = 0
      let UnPaidTotal = 0
      // Function to run on initial page load
      const PropertiesRef = db.collection('taxesPayment');
      PropertiesRef.where("taxType", "==", title).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let docData = doc.data();
          if(docData.paymentDate){
            PaidTotal = PaidTotal + parseInt(doc.data().amount, 10);
          } else {
            UnPaidTotal = UnPaidTotal + parseInt(doc.data().amount, 10);
          }
          docData.id = doc.id;
          data.push(docData);
        });
        setPaidAmount(PaidTotal);
        setUnPaidAmount(UnPaidTotal)
        setFilteredData(data);
        setData(data);
      })
      .catch(err => {
        console.log('Errorgetting documents', err);
      });
  }, [title]);
  
    const handleSearch = (event) => {
      setSearch(event.target.value);
      if(State === "All"){
        setData(filteredData.filter((item) =>
            item.owner.toString().includes(event.target.value)
        ));
      } else if(State === "Yes") {
        setData(filteredData.filter((d) =>  (d.owner.toString().includes(event.target.value)) && (d.paymentDate)));   
      } else if(State === "No") {
        setData(filteredData.filter((d) =>  (d.owner.toString().includes(event.target.value)) && (!d.paymentDate)));   
      }
    };

    const handleFilter2 = (e) => {
        setState(e.target.value);
        if(e.target.value === "All"){
            setData(filteredData.filter((d) =>  d.owner.toString().includes(search)));   
        } else if(e.target.value === "Yes") {
            setData(filteredData.filter((d) =>  (d.owner.toString().includes(search)) && (d.paymentDate)));   
        } else if(e.target.value === "No") {
            setData(filteredData.filter((d) =>  (d.owner.toString().includes(search)) && (!d.paymentDate)));   
        }
    }

  return (
    <section className="trans">
      <div className='HeadTax'>
        <input
          type="number"
          placeholder="Search by owner id"
          className='input_Tax'
          value={search}
          onChange={handleSearch}
        />
        <select onChange={handleFilter2} className="selectOptionTax">
              <option value="All">الكل</option>
              <option value="Yes">الضرائب المدفوعة</option>
              <option value="No">الضرائب الغير مدفوعة</option>
          </select>
        <div className='HeaderTaxx'>
            Paid Amounts: {PaidAmount}
        </div>
        <div className='HeaderTaxx'>
            Unpaid Amounts: {UnPaidAmount}
        </div>
      </div>
        <div className="trans_contentTax">
            {Data && Data.length > 0 && Data.map((item) => (
            <div className='Taxxx'>
                <SingleViewTaxes Data={item} key={item.id}/>
            </div>
            ))}
        </div>
        <div className='ModelClose'>
            <Button onClick={closeModal}>Close</Button>
        </div>
    </section>
  )
}

export default ViewTaxes