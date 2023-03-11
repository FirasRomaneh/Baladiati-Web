import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import { Button, Modal } from '../../components/ui/index';
import 'react-calendar/dist/Calendar.css';
import db from '../../firasbasecon';
import SingleEvents from './SingleEvents';
import EventsForm from '../../components/Forms/EventsForm/EventsForm';

const Events = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ViewCalender, setViewCalender] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [componentLoaded, setComponentLoaded] = useState(false);
    const [filteredData, setFilteredData] = useState();
    const [Data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
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
            const EmployeesRef = db.collection('events');
            EmployeesRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let date1 = new Date(parseInt(doc.data().eventDate, 10));
                    let newDate = date1.getDate()+
                    "/"+ (date1.getMonth()+1)+
                    "/"+ date1.getFullYear();
                    let year1 = date1.getFullYear();
                    let month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
                    let day1 = date1.getDate().toString().padStart(2, '0');
                    let newDate3 = `${year1}-${month1}-${day1}`;  
                    let newData = {...doc.data()};
                    newData.id = doc.id;
                    newData.eventDate = newDate;
                    newData.startDate2 = newDate3;
                    newData.date1 = date1;
                    let date2 = new Date(parseInt(doc.data().eventEndDate, 10));
                    let newDate2 = date2.getDate()+
                    "/"+ (date2.getMonth()+1)+
                    "/"+ date2.getFullYear();
                    newData.eventEndDate = newDate2;
                    let year = date2.getFullYear();
                    let month = (date2.getMonth() + 1).toString().padStart(2, '0');
                    let day = date2.getDate().toString().padStart(2, '0');
                    let newDate4 = `${year}-${month}-${day}`;                    
                    newData.endDate2 = newDate4;
                    newData.date2 = date2;
                    data.push(newData);
                });
                setFilteredData(data.sort((a, b) => b.date1 - a.date1));
                if(State === "All"){
                    if(ViewCalender){
                        setData(data.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
                    } else {
                        setData(data);
                    }
                } else if(State === "Yes") {
                    if(ViewCalender){
                        setData(data.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
                    } else {
                        setData(data.filter((d) => (new Date().getTime() > d.date2.getTime())));
                    }
                } else if(State === "No") {
                    if(ViewCalender){
                        setData(data.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
                    } else {
                        setData(data.filter((d) => (new Date().getTime() <= d.date2.getTime())));
                    }
                }
            }).catch(err => {
                    console.log('Errorgetting documents', err);
            });
        }
    }, [State, ViewCalender, clicked, componentLoaded, selectedDate]);

    const handleDelete = (id) => {
        db.collection("events").doc(id).delete().then(() => {
            // console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setData((prevData) => prevData.filter(item => item.id !== id))
    };
    const handleCalender = () => {
        setViewCalender(!ViewCalender);
        if(ViewCalender){
            if(State === "All"){
                setData(filteredData);
            } else if(State === "Yes") {
                setData(filteredData.filter((d) => (((new Date().getTime() > d.date2.getTime())))));
            } else if(State === "No") {
                setData(filteredData.filter((d) => (((new Date().getTime() <= d.date2.getTime())))));
            }      
            setSelectedDate(new Date())
        } else{
            if(State === "All"){
                setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
            } else if(State === "Yes") {
                setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
            } else if(State === "No") {
                setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
            }
        }
    }
    
    const handleChange = (date) => {
        setSelectedDate(date);
        if(State === "All"){
            setData(filteredData.filter((d) => ((d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()))));
        } else if(State === "Yes") {
            setData(filteredData.filter((d) => ((d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
        } else if(State === "No") {
            setData(filteredData.filter((d) => ((d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
        }
    };

    const handleFilter2 = (e) => {
        setState(e.target.value);
        if(e.target.value === "All"){
            if(ViewCalender){
                setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
            } else {
                setData(filteredData);
            }
        } else if(e.target.value === "Yes") {
            if(ViewCalender){
                setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
            } else {
                setData(filteredData.filter((d) => (new Date().getTime() > d.date2.getTime())));
            }
        } else if(e.target.value === "No") {
            if(ViewCalender){
                setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
            } else {
                setData(filteredData.filter((d) => (new Date().getTime() <= d.date2.getTime())));
            }
        }
    }

    return (
    <section className="trans">
        <div className='HeaderAds'>
        <select className="selectOption4" onChange={handleFilter2}>
            <option value="All">الكل</option>
            <option value="Yes">الأحداث المنتيهة</option>
            <option value="No">الأحداث الغير منتيهة</option>
        </select>
        <div className='ButtonAds'>
            <Button type='success' onClick={handleCalender}>{!ViewCalender ? ' Show Calendar': 'Hide Calendar'}</Button>
        </div>
        <Button onClick={() => setShowModal(true)}>Add Event</Button>
        </div>
        {ViewCalender && ( <div className='calendar-container'>
            <Calendar onChange={handleChange} value={selectedDate} locale="en"/> 
        </div>)}
        <div className="Adss">
            {Data && Data.length > 0 && Data.map((item) => (
                <SingleEvents Data={item} key={item.id} handleDelete={handleDelete} handleClick={handleClick}/>
            ))}
        </div>
        <Modal visible={showModal} closeModal={() => setShowModal(false)} >
          <EventsForm closeModal={() => {setShowModal(false);handleClick()}} />
        </Modal>
    </section>
    )
}

export default Events