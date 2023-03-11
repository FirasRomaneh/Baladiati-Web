import { Button } from "../../ui/index"
import db from "../../../firasbasecon"
import React, {useEffect, useState } from 'react'
import "./PropertiesForm.css"

let initialState = {
  pid: "",
  space: "",
  type: "personal",
  value: "",
  locationDescription: "",
}

const PropertiesForm = ({ closeModal, defaultData, owner }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }
  
  let formErrors = {};
  const [data, setData] = useState(initialState)
  const [Owner, setOwner] = useState(owner)

  const clearForm = () => {
    setData({
        pid: "",
        space: "",
        type: "personal",
        value: "",
        locationDescription: "",
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

  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        setErrors({});        
        if (!data.pid) {
          formErrors.pid = "PID is required";
        }
    
        if (!data.space) {
          formErrors.space = "Space is required";
        }
    
        if (!data.type) {
          formErrors.type = "Type is required";
        }

        if (!data.value) {
            formErrors.value = "Value is required";
        }

        if (!data.locationDescription) {
          formErrors.locationDescription = "Location Description is required";
        }

        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        const query = db.collection('properties').where('pid', '==', parseInt(data.pid, 10));
        if (defaultData) {
          if (!Owner) {
            formErrors.owner = "Owner is required";
            setErrors(formErrors);
            return;
          }
          // Get the document from the query
          query.get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {                
                doc.ref.update({
                  pid: parseInt(data.pid, 10),
                  space: parseInt(data.space, 10),
                  value: parseInt(data.value, 10),
                  owner: parseInt(Owner, 10),
                  type: data.type,
                  locationDescription: data.locationDescription,
                })
                  .then(() => {
                    closeModal()
                    console.log('Document successfully updated!');
                  })
                  .catch((error) => {
                    console.error('Error closing modal: ', error);
                  });
              });
            })
            .catch((error) => {
              console.error('Error getting documents: ', error);
            });
        } else {
            query.get().then(function(querySnapshot) {
            if (querySnapshot.size > 0) {
                formErrors.pid = "PID is Existing";
                setErrors(formErrors);
            } else {
                db.collection("properties").add({
                    pid: parseInt(data.pid, 10),
                    space: parseInt(data.space, 10),
                    value: parseInt(data.value, 10),
                    owner: parseInt(Owner, 10),
                    type: data.type,
                    locationDescription: data.locationDescription,
                });
                closeModal()
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
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Property</h2>
      <form className="form-row" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pid" > PID</label>
          <input 
            type='number'
            id="pid"
            name="pid"
            className={errors.pid ? 'error-input' : ''}
            placeholder='pid...'
            value={data.pid}
            onChange={handleChange}
            readOnly={defaultData ? true : false}
            />
        {errors.pid && <div className="error-message">{errors.pid}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="space" > Space</label>
          <input
            type='number'
            id="space"
            name="space"
            className={errors.space ? 'error-input' : ''}
            placeholder='space...'
            value={data.space}
            onChange={handleChange}
          />
        {errors.space && <div className="error-message">{errors.space}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="value" > Value</label>
          <input
            type='number'
            id="value"
            name="value"
            className={errors.value ? 'error-input' : ''}
            placeholder='value...'
            value={data.value}
            onChange={handleChange}
          />
        {errors.value && <div className="error-message">{errors.value}</div>}
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
            <option value='personal'> Personal </option>
            <option value='commercial'> Commercial </option>
            </select>
        {errors.type && <div className="error-message">{errors.type}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="locationDescription" > Location Description</label>
          <input
            type='text'
            id="locationDescription"
            name="locationDescription"
            className={errors.locationDescription ? 'error-input' : ''}
            placeholder='locationDescription...'
            value={data.locationDescription}
            onChange={handleChange}
          />
        {errors.locationDescription && <div className="error-message">{errors.locationDescription}</div>}
        </div>
        {defaultData ? 
          (<div className="form-group">
            <label htmlFor="owner"> Owner</label>
            <input
              type='number'
              id="owner"
              name="owner"
              className={errors.owner ? 'error-input' : ''}
              placeholder='owner...'
              value={Owner}
              onChange={handleChangeOwner}
            />
            {errors.owner && (
              <div className="error-message">{errors.owner}</div>
            )}
          </div>) : null}
        </form>
        <div className="FormButton">
        <Button size="large" onClick={handleSubmit}>
          {defaultData ? 'Edit' : 'Save'}
        </Button>
        </div>
    </div>
  )
}

export default PropertiesForm