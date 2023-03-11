import { Button } from "../../ui/index"
import React, {useEffect, useState } from 'react'
import db from "../../../firasbasecon"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

let initialState = {
    owner: "",
    description: "",
    endDate2: "",
    googlemap: "",
    imgSrc: "",
    location: "",
    startDate2: "",
    title: "",
}

const EventsForm = ({ closeModal, defaultData }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }

  let formErrors = {};
  const [file, setFle] = useState(null);
  const [image, setImage] = useState(initialState.imgSrc);
  const [data, setData] = useState(initialState)

  const clearForm = () => {
    setData({
        owner: "",
        description: "",
        endDate2: "",
        googlemap: "",
        imgSrc: "",
        location: "",
        startDate2: "",
        title: "",
    })
  }

  useEffect(() => {

    if (!defaultData) {
      clearForm()
    }

  }, [defaultData])

  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeIamge = (event) => {
    setFle(event.target.files[0]);
    setImage(event.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        setErrors({});        
        if (!data.location) {
          formErrors.location = "Location is required";
        }
        
        if (!data.title) {
          formErrors.title = "Title is required";
        }
            
        if (!data.startDate2) {
          formErrors.startDate2 = "Start Date is required";
        }
            
        if (!image) {
          formErrors.image = "Image is required";
        }

        if (!data.owner) {
          formErrors.owner = "Owner is required";
        }

        if (!data.endDate2) {
          formErrors.endDate2 = "End Date is required";
        }

        if (!data.description) {
          formErrors.description = "Description is required";
        }

        let date_object = new Date(data.endDate2);
        date_object.setHours(23, 59, 59, 59);
        let Endtimestamp = date_object.getTime();
        let date_object2 = new Date(data.startDate2);
        date_object2.setHours(0, 0, 0, 0);
        let Starttimestamp = date_object2.getTime();
        
        if(Endtimestamp-Starttimestamp < 0){
          formErrors.endDate2 = "End Date must be equal or greater the Start Date";
        }

        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        let Url = image;
        if(image !== initialState.imgSrc){
          const storageRef = firebase.storage().ref();
          const advertisementRef = storageRef.child("Events");
          const imageRef = advertisementRef.child(image);
          await new Promise((resolve, reject) => {
            imageRef.put(file)
              .then((snapshot) => {
                imageRef.getDownloadURL().then((url) => {
                  Url = url;
                  resolve();
                });
              })
              .catch((error) => {
                console.error("error");
                reject();
            });
          });
        }
        if (defaultData) {
            const query = db.collection('events').doc(defaultData.id);
            await query.update({
                owner: data.owner,
                description: data.description,
                eventEndDate: Endtimestamp,
                googlemap: data.googlemap,
                imgSrc: Url,
                eventDate: Starttimestamp,
                title: data.title,
                location: data.location,
            })
            closeModal()
        } else{
          db.collection("events").add({
            owner: data.owner,
            description: data.description,
            eventEndDate: Endtimestamp,
            googlemap: data.googlemap,
            imgSrc: Url,
            eventDate: Starttimestamp,
            title: data.title,
            location: data.location,
          });
          closeModal()
        }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="new-Citizen">
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Event</h2>
      <form className="form-row" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" > Title</label>
          <input
            type='text'
            id="title"
            name="title"
            className={errors.title ? 'error-input' : ''}
            placeholder='title...'
            value={data.title}
            onChange={handleChange}
          />
        {errors.title && <div className="error-message">{errors.title}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="owner" > Owner</label>
          <input
            type='text'
            id="owner"
            name="owner"
            className={errors.owner ? 'error-input' : ''}
            placeholder='owner...'
            value={data.owner}
            onChange={handleChange}
          />
        {errors.owner && <div className="error-message">{errors.owner}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description" > Description</label>
          <input
            type='text'
            id="description"
            name="description"
            className={errors.description ? 'error-input' : ''}
            placeholder='description...'
            value={data.description}
            onChange={handleChange}
          />
        {errors.description && <div className="error-message">{errors.description}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="startDate" > Start Date</label>
          <input
            type='date'
            id="startDate"
            name="startDate2"
            className={errors.startDate ? 'error-input' : ''}
            placeholder='startDate...'
            value={data.startDate2}
            onChange={handleChange}
          />
        {errors.startDate2 && <div className="error-message">{errors.startDate2}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="endDate" >End Date</label>
          <input
            type='date'
            id="endDate"
            name="endDate2"
            className={errors.endDate ? 'error-input' : ''}
            placeholder='endDate...'
            value={data.endDate2}
            onChange={handleChange}
          />
        {errors.endDate2 && <div className="error-message">{errors.endDate2}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="location" > Location</label>
          <input
            type='text'
            id="location"
            name="location"
            className={errors.location ? 'error-input' : ''}
            placeholder='location...'
            value={data.location}
            onChange={handleChange}
          />
        {errors.location && <div className="error-message">{errors.location}</div>}
        </div>  
        <div className="form-group">
          <label htmlFor="googlemap" > Google map</label>
          <input
            type='text'
            id="googlemap"
            name="googlemap"
            className={errors.googlemap ? 'error-input' : ''}
            placeholder='googlemap...'
            value={data.googlemap}
            onChange={handleChange}
          />
        {errors.googlemap && <div className="error-message">{errors.googlemap}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="image" > Image</label>
          <input 
            type="file"
            id="image"
            name="image"
            className={errors.image ? 'error-input' : ''}
            placeholder='image...'
            onChange={handleChangeIamge}
            />
        {errors.image && <div className="error-message">{errors.image}</div>}
        </div>
        </form>
        <div className="FormButtonAds">
        <Button size="large" onClick={handleSubmit}>
          {defaultData ? 'Edit' : 'Save'}
        </Button>
        </div>
    </div>
  )
}

export default EventsForm