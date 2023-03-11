import { Button } from "../../ui/index"
import db from "../../../firasbasecon"
import React, {useEffect, useState } from 'react'
import './CitizenForm.css'

let initialState = {
  uid: "",
  name: "",
  email: "",
  credit: "",
  phoneNumber: "",
}

const CitizenForm = ({ closeModal, defaultData }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }

  let formErrors = {};
  const [data, setData] = useState(initialState)

  const clearForm = () => {
    setData({
      uid: "",
      name: '',
      email: "",
      credit: "",
      phoneNumber: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        setErrors({});        
        if (!data.uid) {
          formErrors.uid = "UID is required";
        }
    
        if (!data.name) {
          formErrors.name = "Name is required";
        }

        if (data.email) {
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
              formErrors.email = 'Email must be in the correct format';
          }
        }
    
        if (!data.credit) {
          formErrors.credit = "Credit is required";
        }

        if (!data.phoneNumber) {
          formErrors.phoneNumber = "Phone Number is required";
        }
    
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        if (defaultData) {
            // Get the document from the query
            db.collection('Citizens').where('uid', '==', parseInt(data.uid, 10)).get().then((querySnapshot) => {
                // Iterate through the documents returned from the query
                querySnapshot.forEach((doc) => {
                    // Update the name field
                    doc.ref.update({
                      uid: parseInt(data.uid, 10),
                      name: data.name,
                      email: data.email,
                      credit: parseInt(data.credit, 10),
                      phoneNumber: data.phoneNumber,
                    })
                    .then(() => {
                        closeModal()
                        console.log('Document successfully updated!');
                    })
                    .catch((error) => {
                        console.error('Error updating document: ', error);
                    });
                });
            })
        } else {
            db.collection('Citizens').where('uid', '==', parseInt(data.uid, 10)).get().then(async function(querySnapshot) {
            if (querySnapshot.size > 0) {
                formErrors.uid = "UID is Existing";
                setErrors(formErrors);
            } else {
                db.collection("Citizens").add({
                  uid: parseInt(data.uid, 10),
                  name: data.name,
                  email: data.email,
                  credit: parseInt(data.credit, 10),
                  phoneNumber: data.phoneNumber,
                });
                closeModal()
                const body = {uid: data.uid};
                await fetch('https://important-foal-buckle.cyclic.app/sendSmsCode', {
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers: {
                    'Content-Type': 'application/json'
                  }, 
                }) 
            }
            }).catch(function(error) {
            console.log("Error getting documents: ", error);
            });
        }
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="new-Citizen">
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Citizen</h2>

      <form className="form-row" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="uid" > UID</label>
          <input 
            type='number'
            id="uid"
            name="uid"
            className={errors.uid ? 'error-input' : ''}
            placeholder='uid...'
            value={data.uid}
            onChange={handleChange}
            readOnly={defaultData ? true : false}
            />
        {errors.uid && <div className="error-message">{errors.uid}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email" > Email</label>
          <input
            type='text'
            id="email"
            name="email"
            className={errors.email ? 'error-input' : ''}
            placeholder='email...'
            value={data.email}
            onChange={handleChange}
          />
        {errors.email && <div className="error-message">{errors.email}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="name" > Name</label>
          <input
            type='text'
            id="name"
            name="name"
            className={errors.name ? 'error-input' : ''}
            placeholder='name...'
            value={data.name}
            onChange={handleChange}
          />
        {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="credit" > Credit</label>
          <input
            type='number'
            id="credit"
            name="credit"
            className={errors.credit ? 'error-input' : ''}
            placeholder='credit...'
            value={data.credit}
            onChange={handleChange}
          />
        {errors.credit && <div className="error-message">{errors.credit}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="phoneNumber" > Phone Number</label>
          <input
            type='number'
            id="phoneNumber"
            name="phoneNumber"
            className={errors.phoneNumber ? 'error-input' : ''}
            placeholder='phoneNumber...'
            value={data.phoneNumber}
            onChange={handleChange}
          />
        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
        </div> 
        </form>
        <div className="FormButton">
        <Button size="large" onClick={handleSubmit}>
          {defaultData ? 'Edit' : 'Save'}
        </Button>
        </div>
    </div>
  )
}

export default CitizenForm