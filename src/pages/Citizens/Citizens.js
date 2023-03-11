import {React,  useState, useEffect} from 'react';
import db from "../../firasbasecon";
import { Button, Modal} from '../../components/ui/index';
import './Citizens.css';
import CitizenForm from '../../components/Forms/CitizenForm/CitizenForm';
import SingleCitizen from './SingleCitizen';


const Citizens = () => {

  const [clicked, setClicked] = useState(false);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [filteredData, setFilteredData] = useState();
  const [Data, setData] = useState();
  const [search, setSearch] = useState('');

  const handleClick = () => {
    setClicked(true);
    setComponentLoaded(false);
  };

  useEffect(() => {
    if (clicked || !componentLoaded) {
        setComponentLoaded(true);
      const data = []
      // Function to run on initial page load
      const EmployeesRef = db.collection('Citizens');
      EmployeesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let docData = doc.data();
          delete docData.password;
          data.push(docData);
        });
        setFilteredData(data);
        setData(data);
      })
      .catch(err => {
        console.log('Errorgetting documents', err);
      });
  }
  }, [clicked, componentLoaded]);
  
    const handleSearch = (event) => {
      setSearch(event.target.value);
      setData(filteredData.filter((item) =>
         item.uid.toString().includes(event.target.value)
      ));
    };

    const handleDelete = (uid) => {
      db.collection("Citizens")
      .where("uid", "==", uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
      setData((prevData) => prevData.filter(item => item.uid !== uid))
    };

  return (
    <section className="trans">
      <div className='HeaderEmp'>
        <input
          type="number"
          placeholder="Search by uid"
          className='input_Em'
          value={search}
          onChange={handleSearch}
        />
        <Button onClick={() => setShowModal(true)}>Add Citizen</Button>
      </div>
        <div className="trans_content">
            {Data && Data.length > 0 && Data.map((item) => (
            <SingleCitizen Data={item} key={item.uid} handleDelete={handleDelete} handleClick={handleClick}/>
            ))}
        </div>
        <Modal visible={showModal} closeModal={() => setShowModal(false)} >
          <CitizenForm closeModal={() => {
            setShowModal(false)
            handleClick()}} />
        </Modal>
    </section>
  )
}

export default Citizens