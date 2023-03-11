import React, { useEffect, useState } from 'react'
import TaxesForm from '../../components/Forms/TaxesForm/TaxesForm';
import { Button, Modal } from '../../components/ui';
import db from '../../firasbasecon';
import SingleTaxes from './SingleTaxes';
import "./Taxes.css"

const Taxes = () => {
    const [clicked, setClicked] = useState(false);
    const [componentLoaded, setComponentLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [Data, setData] = useState();

    const handleClick = () => {
        setClicked(true);
        setComponentLoaded(false);
    };

    useEffect(() => {
        if (clicked || !componentLoaded) {
            setComponentLoaded(true);
          const data = []
          // Function to run on initial page load
          const EmployeesRef = db.collection('taxes');
          EmployeesRef.get()
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
        db.collection("taxes").doc(id).delete().then(() => {
            setData((prevData) => prevData.filter(item => item.id !== id));
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    return (
        <section className="trans">
            <div className='HeaderTax'>
                <div className='Buttons'>
                    <Button onClick={() => setShowModal(true)}>Add Tax</Button>
                </div>
            </div>
            <div className="trans_content">
                {Data && Data.length > 0 && Data.map((item) => (
                <SingleTaxes Data={item} key={item.id} handleDelete={handleDelete} handleClick={handleClick}/>
                ))}
            </div>
            <Modal visible={showModal} closeModal={() => setShowModal(false)} >
                <TaxesForm closeModal={() => {setShowModal(false);handleClick()}} />
            </Modal>
        </section>
    )
}

export default Taxes