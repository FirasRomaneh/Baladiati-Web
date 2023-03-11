import { Button } from "../../ui/index"
import db from "../../../firasbasecon"
import React, {useEffect, useState } from 'react'

let initialState = {
    title: "",
    requiredDocuments: "",
    cost: "",
    waitingDays: "",
    description: "",
}

const ServicesForm = ({ closeModal, defaultData, parentTitle }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }

  let formErrors = {};
  const [data, setData] = useState(initialState)

  const clearForm = () => {
    setData({
        title: "",
        requiredDocuments: "",
        cost: "",
        waitingDays: "",
        description: "",
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
        if (!data.title) {
          formErrors.title = "Title is required";
        }
        
        if (!data.cost) {
          formErrors.cost = "Cost is required";
        }

        if (!data.waitingDays) {
          formErrors.waitingDays = "Waiting Days is required";
        }

        if (!data.description) {
            formErrors.description = "Description is required";
        }
    
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        if (defaultData) {
            const query = db.collection('services').doc(defaultData.id);
            await query.update({
                title: data.title,
                parentTitle: parentTitle,
                requiredDocuments: data.requiredDocuments,
                description: data.description,
                cost: data.cost,
                waitingDays: data.waitingDays,
            })
            closeModal()
        } else {
            db.collection("services").add({
                title: data.title,
                parentTitle: parentTitle,
                requiredDocuments: data.requiredDocuments,
                description: data.description,
                cost: data.cost,
                waitingDays: data.waitingDays,
            });
            closeModal()
        }
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="new-Citizen">
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Service</h2>

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
          <label htmlFor="requiredDocuments" > Required Documents</label>
          <input
            type='text'
            id="requiredDocuments"
            name="requiredDocuments"
            className={errors.requiredDocuments ? 'error-input' : ''}
            placeholder='requiredDocuments...'
            value={data.requiredDocuments}
            onChange={handleChange}
          />
        {errors.requiredDocuments && <div className="error-message">{errors.requiredDocuments}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="cost" > Cost</label>
          <input
            type='number'
            id="cost"
            name="cost"
            className={errors.cost ? 'error-input' : ''}
            placeholder='cost...'
            value={data.cost}
            onChange={handleChange}
          />
        {errors.cost && <div className="error-message">{errors.cost}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="waitingDays" > Waiting Days</label>
          <input
            type='text'
            id="waitingDays"
            name="waitingDays"
            className={errors.waitingDays ? 'error-input' : ''}
            placeholder='waitingDays...'
            value={data.waitingDays}
            onChange={handleChange}
          />
        {errors.waitingDays && <div className="error-message">{errors.waitingDays}</div>}
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
        <div className="FormButton">
        <Button size="large" onClick={handleSubmit}>
          {defaultData ? 'Edit' : 'Save'}
        </Button>
        </div>
    </div>
  )
}

export default ServicesForm