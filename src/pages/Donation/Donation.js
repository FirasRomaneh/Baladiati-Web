import React, { useEffect, useState } from 'react'
import DonationForm from '../../components/Forms/DonationForm/DonationForm';
import { Button, Modal } from '../../components/ui/index';
import db from '../../firasbasecon';
import SingleDonation from './SingleDonation';

const Donation = () => {
    const [showModal, setShowModal] = useState(false)
    const [clicked, setClicked] = useState(false);
    const [componentLoaded, setComponentLoaded] = useState(false);
    const [filteredData, setFilteredData] = useState();
    const [Data, setData] = useState();
    const [State, setState] = useState("All");

    const handleClick = () => {
        setClicked(true);
        setComponentLoaded(false);
    };

    useEffect(() => {
        if (clicked || !componentLoaded) {
            setComponentLoaded(true);
            const data = []
            // Function to run on initial page load
            const EmployeesRef = db.collection('donation');
            EmployeesRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let newData = {...doc.data()};
                    newData.id = doc.id;
                    data.push(newData);
                });
                setFilteredData(data);
                if(State === "All"){
                    setData(data);
                } else if(State === "Yes") {
                    setData(data.filter(item => (item.active)))
                } else if(State === "No") {
                    setData(data.filter(item => (!item.active)))
                }            
            }).catch(err => {
                console.log('Errorgetting documents', err);
            });
        }
    }, [State, clicked, componentLoaded, filteredData]);

    const handleDelete = (id) => {
        db.collection("donation").doc(id).delete().then(() => {
            // console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setData((prevData) => prevData.filter(item => item.id !== id))
    };

    const handleFilter2 = (e) => {
        setState(e.target.value);
        if(e.target.value === "All"){
            setData(filteredData);
        } else if(e.target.value === "Yes") {
            setData(filteredData.filter(item => (item.active)))
        } else if(e.target.value === "No") {
            setData(filteredData.filter(item => (!item.active)))
        }
    }

    return (
    <section className="trans">
        <div className='HeaderAds'>
        <select className="selectOption4" onChange={handleFilter2}>
            <option value="All">الكل</option>
            <option value="Yes">التبرعات الفعالة</option>
            <option value="No">التبرعات الغير فعالة</option>
        </select>
        <div className='ButtonAds'>
            <Button onClick={() => setShowModal(true)}>Add Donation</Button>
        </div>
        </div>
        <div className="Adss">
            {Data && Data.length > 0 && Data.map((item) => (
                <SingleDonation Data={item} key={item.id} handleDelete={handleDelete} handleClick={handleClick}/>
            ))}
        </div>
        <Modal visible={showModal} closeModal={() => setShowModal(false)} >
          <DonationForm closeModal={() => {setShowModal(false);handleClick()}} />
        </Modal>
    </section>
    )
}

export default Donation