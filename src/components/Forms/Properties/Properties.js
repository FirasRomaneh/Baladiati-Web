import {React,  useState, useEffect} from 'react';
import db from "../../../firasbasecon";
import { Button, Modal} from '../../ui/index';
import './Properties.css';
import SingleProperties from './SingleProperties';
import PropertiesForm from '../PropertiesForm/PropertiesForm';


const Properties = ({ closeModal, uid }) => {

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
      const PropertiesRef = db.collection('properties');
      PropertiesRef.where("owner", "==", uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let docData = doc.data();
          data.push(docData);
        });
        setFilteredData(data);
        setData(data);
      })
      .catch(err => {
        console.log('Errorgetting documents', err);
      });
  }
  }, [clicked, componentLoaded, uid]);
  
    const handleSearch = (event) => {
      setSearch(event.target.value);
      setData(filteredData.filter((item) =>
         item.pid.toString().includes(event.target.value)
      ));
    };

    const handleDelete = (pid) => {
      db.collection("properties")
      .where("pid", "==", pid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
      setData((prevData) => prevData.filter(item => item.pid !== pid))
    };

  return (
    <section className="trans">
      <div className='HeaderEmp'>
        <input
          type="number"
          placeholder="Search by pid"
          className='input_Emp'
          value={search}
          onChange={handleSearch}
        />
        <Button onClick={() => setShowModal(true)}>Add Property</Button>
      </div>
        <div className="trans_content">
            {Data && Data.length > 0 && Data.map((item) => (
            <SingleProperties owner={uid} Data={item} key={item.pid} handleDelete={handleDelete} handleClick={handleClick}/>
            ))}
        </div>
        <div className='ModelClose'>
            <Button onClick={closeModal}>Close</Button>
        </div>
        <Modal visible={showModal} closeModal={() => setShowModal(false)} >
          <PropertiesForm owner={uid} closeModal={() => {
            setShowModal(false)
            handleClick()}} />
        </Modal>
    </section>
  )
}

export default Properties