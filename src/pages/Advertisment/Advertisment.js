import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import { Button, ModalTwo } from '../../components/ui/index';
import 'react-calendar/dist/Calendar.css';
import "./Advertisment.css"
import SingleAdvertisment from './SingleAdvertisment';
import db from '../../firasbasecon';
import AdvertisementForm from '../../components/Forms/AdvertisementForm/AdvertisementForm';

const Advertisment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ViewCalender, setViewCalender] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [componentLoaded, setComponentLoaded] = useState(false);
    const [filteredData, setFilteredData] = useState();
    const [Data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [Type, setType] = useState("الكل");
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
            const EmployeesRef = db.collection('advertisements');
            EmployeesRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let date1 = new Date(parseInt(doc.data().startDate, 10));
                    let newDate = date1.getDate()+
                    "/"+ (date1.getMonth()+1)+
                    "/"+ date1.getFullYear();
                    let year1 = date1.getFullYear();
                    let month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
                    let day1 = date1.getDate().toString().padStart(2, '0');
                    let newDate3 = `${year1}-${month1}-${day1}`;  
                    let newData = {...doc.data()};
                    newData.id = doc.id;
                    newData.startDate = newDate;
                    newData.startDate2 = newDate3;
                    newData.date1 = date1;
                    let date2 = new Date(parseInt(doc.data().endDate, 10));
                    let newDate2 = date2.getDate()+
                    "/"+ (date2.getMonth()+1)+
                    "/"+ date2.getFullYear();
                    newData.endDate = newDate2;
                    let year = date2.getFullYear();
                    let month = (date2.getMonth() + 1).toString().padStart(2, '0');
                    let day = date2.getDate().toString().padStart(2, '0');
                    let newDate4 = `${year}-${month}-${day}`;                    
                    newData.endDate2 = newDate4;
                    newData.date2 = date2;
                    data.push(newData);
                });
                setFilteredData(data.sort((a, b) => b.date1 - a.date1));
                if(Type.localeCompare("الكل", 'ar') === 0){
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
                } else {
                    if(State === "All"){
                        if(ViewCalender){
                            setData(data.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
                        } else {
                            setData(data.filter(d => (Type.localeCompare(d.type, 'ar') === 0)));
                        }
                    } else if(State === "Yes") {
                        if(ViewCalender){
                            setData(data.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
                        } else {
                            setData(data.filter((d) => (Type.localeCompare(d.type, 'ar') === 0) && (new Date().getTime() > d.date2.getTime())));
                        }
                    } else if(State === "No") {
                        if(ViewCalender){
                            setData(data.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
                        } else {
                            setData(data.filter((d) => (Type.localeCompare(d.type, 'ar') === 0) && (new Date().getTime() <= d.date2.getTime())));
                        }
                    }
                }
            }).catch(err => {
                    console.log('Errorgetting documents', err);
            });
        }
    }, [State, Type, ViewCalender, clicked, componentLoaded, selectedDate]);

    const handleDelete = (id) => {
        db.collection("advertisements").doc(id).delete().then(() => {
            // console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setData((prevData) => prevData.filter(item => item.id !== id))
    };
    const handleCalender = () => {
        setViewCalender(!ViewCalender);
        if(ViewCalender){
            if(Type.localeCompare("الكل", 'ar') === 0){
                if(State === "All"){
                    setData(filteredData);
                } else if(State === "Yes") {
                    setData(filteredData.filter((d) => (((new Date().getTime() > d.date2.getTime())))));
                } else if(State === "No") {
                    setData(filteredData.filter((d) => (((new Date().getTime() <= d.date2.getTime())))));
                }
            } else {
                if(State === "All"){
                    setData(filteredData.filter((d) => (Type.localeCompare(d.type, 'ar') === 0)));
                } else if(State === "Yes") {
                    setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && ((new Date().getTime() > d.date2.getTime())))));
                } else if(State === "No") {
                    setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && ((new Date().getTime() <= d.date2.getTime())))));
                }
            }            setSelectedDate(new Date())
        } else{
            if(Type.localeCompare("الكل", 'ar') === 0){
                if(State === "All"){
                    setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
                } else if(State === "Yes") {
                    setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
                } else if(State === "No") {
                    setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
                }
            } else {
                if(State === "All"){
                    setData(filteredData.filter((d) => (Type.localeCompare(d.type, 'ar') === 0) && ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
                } else if(State === "Yes") {
                    setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
                } else if(State === "No") {
                    setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
                }
            }
        }
    }
    
    const handleChange = (date) => {
        setSelectedDate(date);
        if(Type.localeCompare("الكل", 'ar') === 0){
            if(State === "All"){
                setData(filteredData.filter((d) => ((d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()))));
            } else if(State === "Yes") {
                setData(filteredData.filter((d) => ((d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
            } else if(State === "No") {
                setData(filteredData.filter((d) => ((d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
            }
        } else {
            if(State === "All"){
                setData(filteredData.filter((d) => (Type.localeCompare(d.type, 'ar') === 0) && ((d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()))));
            } else if(State === "Yes") {
                setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
            } else if(State === "No") {
                setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= date.getTime()) && (date.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
            }
        }
    };

    const handleFilter = (e) => {
        setType(e.target.value);
        if(e.target.value.localeCompare("الكل", 'ar') === 0){
            if(State === "All"){
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
                } else {
                    setData(filteredData);
                }
            } else if(State === "Yes") {
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
                } else {
                    setData(filteredData.filter((d) => (new Date().getTime() > d.date2.getTime())));
                }
            } else if(State === "No") {
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
                } else {
                    setData(filteredData.filter((d) => (new Date().getTime() <= d.date2.getTime())));
                }
            }
        } else {
            if(State === "All"){
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((e.target.value.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
                } else {
                    setData(filteredData.filter(d => (e.target.value.localeCompare(d.type, 'ar') === 0)));
                }
            } else if(State === "Yes") {
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((e.target.value.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
                } else {
                    setData(filteredData.filter((d) => (e.target.value.localeCompare(d.type, 'ar') === 0) && (new Date().getTime() > d.date2.getTime())));
                }
            } else if(State === "No") {
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((e.target.value.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
                } else {
                    setData(filteredData.filter((d) => (e.target.value.localeCompare(d.type, 'ar') === 0) && (new Date().getTime() <= d.date2.getTime())));
                }
            }
        }
    }

    const handleFilter2 = (e) => {
        setState(e.target.value);
        if(Type.localeCompare("الكل", 'ar') === 0){
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
        } else {
            if(e.target.value === "All"){
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()))));
                } else {
                    setData(filteredData.filter(d => (Type.localeCompare(d.type, 'ar') === 0)));
                }
            } else if(e.target.value === "Yes") {
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() > d.date2.getTime())))));
                } else {
                    setData(filteredData.filter((d) => (Type.localeCompare(d.type, 'ar') === 0) && (new Date().getTime() > d.date2.getTime())));
                }
            } else if(e.target.value === "No") {
                if(ViewCalender){
                    setData(filteredData.filter((d) => ((Type.localeCompare(d.type, 'ar') === 0) && (d.date1.getTime() <= selectedDate.getTime()) && (selectedDate.getTime() <= d.date2.getTime()) && ((new Date().getTime() <= d.date2.getTime())))));
                } else {
                    setData(filteredData.filter((d) => (Type.localeCompare(d.type, 'ar') === 0) && (new Date().getTime() <= d.date2.getTime())));
                }
            }
        }
    }

    return (
    <section className="trans">
        <div className='HeaderAds'>
        <select className="selectOption3" onChange={handleFilter}>
            <option value="الكل">الكل</option>
            <option value="منتجات محلية">منتجات محلية</option>
            <option value="اعمال يدوية">اعمال يدوية</option>
            <option value="خدمات">خدمات</option>
            <option value="اخرى">اخرى</option>
        </select>
        <select className="selectOption4" onChange={handleFilter2}>
            <option value="All">الكل</option>
            <option value="Yes">الدعايات المنتيهة</option>
            <option value="No">الدعايات الغير منتيهة</option>
        </select>
        <div className='ButtonAds'>
            <Button type='success' onClick={handleCalender}>{!ViewCalender ? ' Show Calendar': 'Hide Calendar'}</Button>
        </div>
        <Button onClick={() => setShowModal(true)}>Add Advertisement</Button>
        </div>
        {ViewCalender && ( <div className='calendar-container'>
            <Calendar onChange={handleChange} value={selectedDate} locale="en"/> 
        </div>)}
        <div className="Adss">
            {Data && Data.length > 0 && Data.map((item) => (
                <SingleAdvertisment Data={item} key={item.id} handleDelete={handleDelete} handleClick={handleClick}/>
            ))}
        </div>
        <ModalTwo visible={showModal} closeModal={() => setShowModal(false)} >
          <AdvertisementForm closeModal={() => {setShowModal(false);handleClick()}} />
        </ModalTwo>
    </section>
    )
}

export default Advertisment