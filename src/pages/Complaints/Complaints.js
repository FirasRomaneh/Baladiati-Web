import {React,  useState, useEffect} from 'react';
import db from "../../firasbasecon";
import {Button} from '../../components/ui/index';
import SingleComplaints from './SingleComplaints';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./Complaints.css"

const Complaints = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ViewCalender, setViewCalender] = useState(false);
  const [title, seTtitle] = useState('الكل');
  const [Type, setType] = useState("All");
  const [clicked, setClicked] = useState(false);
  const [componentLoaded, setComponentLoaded] = useState(false);
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
      const EmployeesRef = db.collection('complaints');
      EmployeesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
            let date = new Date(parseInt(doc.data().submitDate, 10));
            let newDate = date.getDate()+
            "/"+ (date.getMonth()+1)+
            "/"+ date.getFullYear()+
            " "+ date.getHours()+
            ":"+ date.getMinutes()+
            ":"+ date.getSeconds();
            let newData = {...doc.data()};
            newData.id = doc.id;
            newData.submitDate = newDate;
            newData.date = date;
            data.push(newData);
        });
        setFilteredData(data.sort((a, b) => b.date - a.date));
            if(Type === "All"){
                if(title.localeCompare("الكل", 'ar') === 0){
                    if(!ViewCalender){
                        setData(data.filter((item) => item.submitterId.toString().includes(search)));
                    } else {
                        setData(data.filter((item) => ((item.submitterId.toString().includes(search)) && 
                        (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                        (item.date.getDate() === selectedDate.getDate()))));
                    }
                } else {
                    if(!ViewCalender){
                        setData(data.filter(item => (title.localeCompare(item.title, 'ar') === 0) && item.submitterId.toString().includes(search)));
                    } else {
                        setData(data.filter(item => (title.localeCompare(item.title, 'ar') === 0) && (item.submitterId.toString().includes(search))
                        && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                        (item.date.getDate() === selectedDate.getDate())));
                    }
                }
            } else if(Type === "Yes"){
                if(title.localeCompare("الكل", 'ar') === 0){
                    if(!ViewCalender){
                        setData(data.filter((item) => item.submitterId.toString().includes(search) && item.endDate));
                    } else {
                        setData(data.filter((item) => ((item.submitterId.toString().includes(search)) && 
                        (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                        (item.date.getDate() === selectedDate.getDate())) && item.endDate));
                    }
                } else {
                    if(!ViewCalender){
                        setData(data.filter(item => (title.localeCompare(item.title, 'ar') === 0) && item.submitterId.toString().includes(search) && item.endDate));
                    } else {
                        setData(data.filter(item => (title.localeCompare(item.title, 'ar') === 0) && (item.submitterId.toString().includes(search))
                        && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                        (item.date.getDate() === selectedDate.getDate()) && item.endDate));
                    }
                }
            } else if(Type === "No"){
                if(title.localeCompare("الكل", 'ar') === 0){
                    if(!ViewCalender){
                        setData(data.filter((item) => item.submitterId.toString().includes(search) && !item.endDate));
                    } else {
                        setData(data.filter((item) => ((item.submitterId.toString().includes(search)) && 
                        (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                        (item.date.getDate() === selectedDate.getDate())) && !item.endDate));
                    }
                } else {
                    if(!ViewCalender){
                        setData(data.filter(item => (title.localeCompare(item.title, 'ar') === 0) && item.submitterId.toString().includes(search) && !item.endDate));
                    } else {
                        setData(data.filter(item => (title.localeCompare(item.title, 'ar') === 0) && (item.submitterId.toString().includes(search))
                        && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                        (item.date.getDate() === selectedDate.getDate()) && !item.endDate));
                    }
                }
            }
        })
      .catch(err => {
        console.log('Errorgetting documents', err);
      });
  }
  }, [Type, ViewCalender, clicked, componentLoaded, search, selectedDate, title]);
  
    const handleSearch = (event) => {
        setSearch(event.target.value);
        if(Type === "All"){
            if(title.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter((item) => item.submitterId.toString().includes(event.target.value)));
                } else {
                    setData(filteredData.filter((item) => ((item.submitterId.toString().includes(event.target.value)) && 
                    (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()))));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (title.localeCompare(item.title, 'ar') === 0) && item.submitterId.toString().includes(event.target.value)));
                } else {
                    setData(filteredData.filter(item => (title.localeCompare(item.title, 'ar') === 0) && (item.submitterId.toString().includes(event.target.value))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate())));
                }
            }
        } else if(Type === "Yes"){
            if(title.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter((item) => item.submitterId.toString().includes(event.target.value) && item.endDate));
                } else {
                    setData(filteredData.filter((item) => ((item.submitterId.toString().includes(event.target.value)) && 
                    (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate())) && item.endDate));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (title.localeCompare(item.title, 'ar') === 0) && item.submitterId.toString().includes(event.target.value) && item.endDate));
                } else {
                    setData(filteredData.filter(item => (title.localeCompare(item.title, 'ar') === 0) && (item.submitterId.toString().includes(event.target.value))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && item.endDate));
                }
            }
        } else if(Type === "No"){
            if(title.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter((item) => item.submitterId.toString().includes(event.target.value) && !item.endDate));
                } else {
                    setData(filteredData.filter((item) => ((item.submitterId.toString().includes(event.target.value)) && 
                    (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate())) && !item.endDate));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (title.localeCompare(item.title, 'ar') === 0) && item.submitterId.toString().includes(event.target.value) && !item.endDate));
                } else {
                    setData(filteredData.filter(item => (title.localeCompare(item.title, 'ar') === 0) && (item.submitterId.toString().includes(event.target.value))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && !item.endDate));
                }
            }
        }
    };

    const handleDelete = (id) => {
        db.collection("complaints").doc(id).delete().then(() => {
            // console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setData((prevData) => prevData.filter(item => item.id !== id))
    };

    const handleFilter = (e) => {
        seTtitle(e.target.value);
        if(Type === "All"){
            if(e.target.value.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate())));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (e.target.value.localeCompare(item.title, 'ar') === 0)));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (e.target.value.localeCompare(item.title, 'ar') === 0)));
                }
            }
        } else if(Type === "Yes"){
            if(e.target.value.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && item.endDate));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (e.target.value.localeCompare(item.title, 'ar') === 0) && item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (e.target.value.localeCompare(item.title, 'ar') === 0) && item.endDate));
                }
            }
        } else if(Type === "No"){
            if(e.target.value.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && !item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && !item.endDate));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (e.target.value.localeCompare(item.title, 'ar') === 0) && !item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (e.target.value.localeCompare(item.title, 'ar') === 0) && !item.endDate));
                }
            }
        }
    }

    const handleFilter2 = (e) => {
        setType(e.target.value);
        console.log(e.target.value);
        console.log(e.target.value === "Yes");
        if(e.target.value === "All"){
            if(title.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate())));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (title.localeCompare(item.title, 'ar') === 0)));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (title.localeCompare(item.title, 'ar') === 0)));
                }
            }
        } else if(e.target.value === "Yes"){
            if(title.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && item.endDate));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (title.localeCompare(item.title, 'ar') === 0) && item.endDate ));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (title.localeCompare(item.title, 'ar') === 0) && item.endDate));
                }
            }
        } else if(e.target.value === "No"){
            if(title.localeCompare("الكل", 'ar') === 0){
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && !item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && !item.endDate));
                }
            } else {
                if(!ViewCalender){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (title.localeCompare(item.title, 'ar') === 0) && !item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (title.localeCompare(item.title, 'ar') === 0) && !item.endDate));
                }
            }
        }
    };

    const handleChange = (date) => {
        setSelectedDate(date);
        if(Type === "All"){
            if(title.localeCompare("الكل", 'ar') === 0){
                setData(filteredData.filter(
                    (d) => ((d.submitterId.toString().includes(search)) && d.date.getFullYear() === date.getFullYear() && d.date.getMonth() === date.getMonth() && d.date.getDate() === date.getDate())
                ));
            } else {
                setData(filteredData.filter(
                    (d) => ((title.localeCompare(d.title, 'ar') === 0) && (d.submitterId.toString().includes(search)) && d.date.getFullYear() === date.getFullYear() && d.date.getMonth() === date.getMonth() && d.date.getDate() === date.getDate())
                ));
            }
        } else if(Type === "Yes"){
            if(title.localeCompare("الكل", 'ar') === 0){
                setData(filteredData.filter(
                    (d) => ((d.submitterId.toString().includes(search)) && d.date.getFullYear() === date.getFullYear() && d.date.getMonth() === date.getMonth() && d.date.getDate() === date.getDate() && d.endDate)
                ));
            } else {
                setData(filteredData.filter(
                    (d) => ((title.localeCompare(d.title, 'ar') === 0) && (d.submitterId.toString().includes(search)) && d.date.getFullYear() === date.getFullYear() && d.date.getMonth() === date.getMonth() && d.date.getDate() === date.getDate() && d.endDate)
                ));
            }
        } else if(Type === "No"){
            if(title.localeCompare("الكل", 'ar') === 0){
                setData(filteredData.filter(
                    (d) => ((d.submitterId.toString().includes(search)) && d.date.getFullYear() === date.getFullYear() && d.date.getMonth() === date.getMonth() && d.date.getDate() === date.getDate() && !d.endDate)
                ));
            } else {
                setData(filteredData.filter(
                    (d) => ((title.localeCompare(d.title, 'ar') === 0) && (d.submitterId.toString().includes(search)) && d.date.getFullYear() === date.getFullYear() && d.date.getMonth() === date.getMonth() && d.date.getDate() === date.getDate() && !d.endDate)
                ));
            }
        }
    };

    const handleCalender = () => {
        setViewCalender(!ViewCalender);
        if(Type === "All"){
            if(ViewCalender){
                if(title.localeCompare("الكل", 'ar') === 0){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (title.localeCompare(item.title, 'ar') === 0)));
                }
            } else {
                if(title.localeCompare("الكل", 'ar') === 0){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate())));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (title.localeCompare(item.title, 'ar') === 0)));
                }
            }
        } else if(Type === "Yes"){
            if(ViewCalender){
                if(title.localeCompare("الكل", 'ar') === 0){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (title.localeCompare(item.title, 'ar') === 0) && item.endDate));
                }
            } else {
                if(title.localeCompare("الكل", 'ar') === 0){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (title.localeCompare(item.title, 'ar') === 0) && item.endDate));
                }
            }
        } else if(Type === "No"){
            if(ViewCalender){
                if(title.localeCompare("الكل", 'ar') === 0){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && !item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search)) && (title.localeCompare(item.title, 'ar') === 0) && !item.endDate));
                }
            } else {
                if(title.localeCompare("الكل", 'ar') === 0){
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && !item.endDate));
                } else {
                    setData(filteredData.filter(item => (item.submitterId.toString().includes(search))
                    && (item.date.getFullYear() === selectedDate.getFullYear()) && (item.date.getMonth() === selectedDate.getMonth()) && 
                    (item.date.getDate() === selectedDate.getDate()) && (title.localeCompare(item.title, 'ar') === 0) && !item.endDate));
                }
            }
        }
    };


  return (
    <section className="trans">
      <div className='HeaderEmp'>
        <select onChange={handleFilter} className="selectOption">
            <option value="الكل">الكل</option>
            <option value="مخلفات على الطريق">مخلفات على الطريق</option>
            <option value="حفرة في الشارع">حفرة في الشارع</option>
            <option value="رسومات مسيئة على الحائط">رسومات مسيئة على الحائط</option>
            <option value="انارة لا تعمل">انارة لا تعمل</option>
            <option value="حاوية ممتلئة">حاوية ممتلئة</option>
            <option value="مخالفات في الشارع">مخالفات في الشارع</option>
            <option value="عطل في خدمات المياه">عطل في خدمات المياه</option>
            <option value="عطل في خدمات الكهرباء">عطل في خدمات الكهرباء</option>
            <option value="اخرى">اخرى</option>
        </select>
        <select onChange={handleFilter2} className="selectOption2">
            <option value="All">الكل</option>
            <option value="Yes">الشكاوي المحلولة</option>
            <option value="No">الشكاوي الغير محلولة</option>
        </select>
        <input
          type="number"
          placeholder="Search by Submitter UID"
          className='input_E'
          value={search}
          onChange={handleSearch}
        />
        <Button onClick={handleCalender}>{!ViewCalender ? 'Show Calendar': 'Hide Calendar'}</Button>
      </div>
      {ViewCalender && ( <div className='calendar-container'>
            <Calendar onChange={handleChange} value={selectedDate} locale="en"/> 
        </div>)}
        <div className="trans_content">
            {Data && Data.length > 0 && Data.map((item) => (
            <SingleComplaints Data={item} key={item.id} handleDelete={handleDelete} handleClick={handleClick}/>
            ))}
        </div>
    </section>
  )
}

export default Complaints