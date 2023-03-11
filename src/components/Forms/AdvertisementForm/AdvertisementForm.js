import { Button } from "../../ui/index"
// import db from "../../../firasbasecon"
import React, {useEffect, useState } from 'react'
import "./AdvertisementForm.css"
import db from "../../../firasbasecon"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

let initialState = {
  advertiseOwner: "",
  description: "",
  endDate2: "",
  facebook: "",
  imgSrc: "",
  instagram: "",
  phone: "",
  startDate2: "",
  title: "",
  type :"منتجات محلية",
  whatsapp: "",
}

const AdvertisementForm = ({ closeModal, defaultData }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }

  let formErrors = {};
  const [file, setFle] = useState(null);
  const [image, setImage] = useState(initialState.imgSrc);
  const [data, setData] = useState(initialState)

  const clearForm = () => {
    setData({
        advertiseOwner: "",
        description: "",
        endDate2: "",
        facebook: "",
        imgSrc: "",
        instagram: "",
        phone: "",
        startDate2: "",
        title: "",
        type :"منتجات محلية",
        whatsapp: "",
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
        if (!data.type) {
          formErrors.type = "Type is required";
        }
        
        if (!data.title) {
          formErrors.title = "Title is required";
        }
            
        if (!data.phone) {
          formErrors.phone = "Phone is required";
        }
        
        if (!data.startDate2) {
          formErrors.startDate2 = "Start Date is required";
        }
            
        if (!image) {
          formErrors.image = "Image is required";
        }

        if (!data.advertiseOwner) {
          formErrors.advertiseOwner = "Advertise Owner is required";
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
          const advertisementRef = storageRef.child("Advertisement");
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
            const query = db.collection('advertisements').doc(defaultData.id);
            await query.update({
              advertiseOwner: data.advertiseOwner,
              description: data.description,
              endDate: Endtimestamp,
              facebook: data.facebook,
              imgSrc: Url,
              instagram: data.instagram,
              phone: data.phone,
              startDate: Starttimestamp,
              title: data.title,
              type: data.type,
              whatsapp: data.whatsapp,
            })
            closeModal()
        } else{
          db.collection("advertisements").add({
            advertiseOwner: data.advertiseOwner,
              description: data.description,
              endDate: Endtimestamp,
              facebook: data.facebook,
              imgSrc: Url,
              instagram: data.instagram,
              phone: data.phone,
              startDate: Starttimestamp,
              title: data.title,
              type: data.type,
              whatsapp: data.whatsapp,
          });
          closeModal()
        }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="new-Citizen">
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Advertisement</h2>
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
          <label htmlFor="advertiseOwner" > Advertise Owner</label>
          <input
            type='text'
            id="advertiseOwner"
            name="advertiseOwner"
            className={errors.advertiseOwner ? 'error-input' : ''}
            placeholder='advertiseOwner...'
            value={data.advertiseOwner}
            onChange={handleChange}
          />
        {errors.advertiseOwner && <div className="error-message">{errors.advertiseOwner}</div>}
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
          <label htmlFor="type" > Type</label>
          <select
            id="type"
            name="type"
            className={errors.type ? 'selectType error-input' : 'selectType'}
            placeholder='type...'
            value={data.type}
            onChange={handleChange}
            >
            <option value="منتجات محلية">منتجات محلية</option>
            <option value="اعمال يدوية">اعمال يدوية</option>
            <option value="خدمات">خدمات</option>
            <option value="اخرى">اخرى</option>
            </select>
        {errors.type && <div className="error-message">{errors.type}</div>}
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
          <label htmlFor="phone" > Phone Number</label>
          <input
            type='text'
            id="phone"
            name="phone"
            className={errors.phone ? 'error-input' : ''}
            placeholder='phoneNumber...'
            value={data.phone}
            onChange={handleChange}
          />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="whatsapp" > Whatsapp Number</label>
          <input
            type='text'
            id="whatsapp"
            name="whatsapp"
            className={errors.whatsapp ? 'error-input' : ''}
            placeholder='whatsapp...'
            value={data.whatsapp}
            onChange={handleChange}
          />
        {errors.whatsapp && <div className="error-message">{errors.whatsapp}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="facebook" > Facebook</label>
          <input
            type='text'
            id="facebook"
            name="facebook"
            className={errors.facebook ? 'error-input' : ''}
            placeholder='facebook...'
            value={data.facebook}
            onChange={handleChange}
          />
        {errors.facebook && <div className="error-message">{errors.facebook}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="instagram" > Instagram</label>
          <input
            type='text'
            id="instagram"
            name="instagram"
            className={errors.instagram ? 'error-input' : ''}
            placeholder='instagram...'
            value={data.instagram}
            onChange={handleChange}
          />
        {errors.instagram && <div className="error-message">{errors.instagram}</div>}
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

export default AdvertisementForm