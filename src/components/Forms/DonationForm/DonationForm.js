import { Button } from "../../ui/index"
import React, {useEffect, useState } from 'react'
import db from "../../../firasbasecon"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

let initialState = {
    description: "",
    imgSrc: "",
    title: "",
}

const DonationForm = ({ closeModal, defaultData }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }

  let formErrors = {};
  const [file, setFle] = useState(null);
  const [image, setImage] = useState(initialState.imgSrc);
  const [data, setData] = useState(initialState)

  const clearForm = () => {
    setData({
        description: "",
        imgSrc: "",
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
        if (!data.title) {
          formErrors.title = "Title is required";
        }
            
        if (!image) {
          formErrors.image = "Image is required";
        }

        if (!data.description) {
          formErrors.description = "Description is required";
        }

        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        let Url = image;
        if(image !== initialState.imgSrc){
          const storageRef = firebase.storage().ref();
          const advertisementRef = storageRef.child("Donation");
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
            const query = db.collection('donation').doc(defaultData.id);
            await query.update({
                description: data.description,
                imgSrc: Url,
                title: data.title,
                active: data.active,
            })
            closeModal()
        } else{
          db.collection("donation").add({
            description: data.description,
            imgSrc: Url,
            title: data.title,
            active: true,
          });
          closeModal()
        }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="new-Citizen">
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Donation</h2>
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
            readOnly={defaultData ? true : false}
          />
        {errors.title && <div className="error-message">{errors.title}</div>}
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
        </form>
        <div className="FormButtonAds">
        <Button size="large" onClick={handleSubmit}>
          {defaultData ? 'Edit' : 'Save'}
        </Button>
        </div>
    </div>
  )
}

export default DonationForm