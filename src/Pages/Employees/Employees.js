import {React,  useState, useEffect} from 'react';
import SingleEmployee from "./SingleEmployee";
import db from "../../firasbasecon";
import './Employees.css';


const Employees = () => {
    const [Data, setData] = useState();
  
    useEffect(() => {
      const data = []
      // Function to run on initial page load
      const EmployeesRef = db.collection('Employees');
      EmployeesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          data.push(doc.data());
        });
        setData(data);
      })
      .catch(err => {
        console.log('Errorgetting documents', err);
      });
    },[]);

  return (
    <section className="trans">
        <div className="trans_content">
            {Data && Data.length > 0 && Data.map((item) => (
            <SingleEmployee Data={item} key={item.uid}/>
            ))}
        </div>
    </section>
  )
}

export default Employees