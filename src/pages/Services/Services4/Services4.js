import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import ServicesForm from '../../../components/Forms/ServicesForm/ServicesForm';
import { Modal } from '../../../components/ui';
import db from '../../../firasbasecon';
import SingleServices from '../SingleServices';

const Services4 = () => {
    const [clicked, setClicked] = useState(false);
    const [componentLoaded, setComponentLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [Data, setData] = useState();
  
    const handleClick = () => {
      setClicked(true);
      setComponentLoaded(false);
    };
  
    useEffect(() => {
      if (clicked || !componentLoaded) {
          setComponentLoaded(true);
        const data = []
        db.collection('services').where("parentTitle", "==", "خدمات الزراعة والبستنة").get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let newData = {...doc.data()};
            newData.id = doc.id;
            data.push(newData);
          });
          setData(data);
        })
        .catch(err => {
          console.log('Errorgetting documents', err);
        });
    }
    }, [clicked, componentLoaded]);
    
      const handleDelete = (id) => {
        db.collection("services").doc(id).delete().then(() => {
            // console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setData((prevData) => prevData.filter(item => item.id !== id))
      };
  
    return (
      <section className="trans">
        <div className='HeaderAds'>
          <Button onClick={() => setShowModal(true)}>Add Services</Button>
        </div>
          <div className="trans_content">
              {Data && Data.length > 0 && Data.map((item) => (
              <SingleServices Data={item} key={item.id} handleDelete={handleDelete} handleClick={handleClick}/>
              ))}
          </div>
          <Modal  visible={showModal} closeModal={() => setShowModal(false)} >
            <ServicesForm parentTitle="خدمات الزراعة والبستنة" closeModal={() => {setShowModal(false);handleClick()}} />
          </Modal>
      </section>
    )
  }

export default Services4