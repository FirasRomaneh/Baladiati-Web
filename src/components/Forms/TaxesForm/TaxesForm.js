import { Button } from "../../ui/index"
import db from "../../../firasbasecon"
import React, {useEffect, useState } from 'react'

let initialState = {
    title: "",
    calculateBy: "value",
    type: "house",
    description: "",
    amountPercentage: "",
}

const TaxesForm = ({ closeModal, defaultData }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }
  
  let formErrors = {};
  const [data, setData] = useState(initialState)

  const clearForm = () => {
    setData({
        title: "",
        calculateBy: "value",
        type: "house",
        description: "",
        amountPercentage: "",
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
    
        if (!data.amountPercentage) {
          formErrors.amountPercentage = "amountPercentage is required";
        }
    
        if (!data.description) {
          formErrors.description = "description is required";
        }

        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        if (defaultData) {
            const query = db.collection('taxes').doc(defaultData.id);
            await query.update({
              description: data.description,
              title: data.title,
              type: data.type,
              amountPercentage: parseInt(data.amountPercentage, 10),
              calculateBy: data.calculateBy,
            })
            closeModal()
        } else {
            db.collection("taxes").add({
                description: data.description,
                title: data.title,
                type: data.type,
                amountPercentage: parseInt(data.amountPercentage, 10),
                calculateBy: data.calculateBy,
            });
            closeModal()
        }
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="new-Citizen">
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Tax</h2>
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
          <label htmlFor="type" > Type</label>
          <select
            id="type"
            name="type"
            className={errors.type ? 'selectType error-input' : 'selectType'}
            placeholder='type...'
            value={data.type}
            onChange={handleChange}
            >
            <option value='house'> House </option>
            <option value='electric'> Electric </option>
            <option value='water'> Water </option>
            </select>
        {errors.type && <div className="error-message">{errors.type}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="amountPercentage" > Amount Percentage</label>
          <input
            type='number'
            id="amountPercentage"
            name="amountPercentage"
            className={errors.amountPercentage ? 'error-input' : ''}
            placeholder='amountPercentage...'
            value={data.amountPercentage}
            onChange={handleChange}
          />
        {errors.amountPercentage && <div className="error-message">{errors.amountPercentage}</div>}
        </div> 
        <div className="form-group">
          <label htmlFor="calculateBy" > Calculate By</label>
          <select
            id="calculateBy"
            name="calculateBy"
            className={errors.calculateBy ? 'selectType error-input' : 'selectType'}
            placeholder='calculateBy...'
            value={data.calculateBy}
            onChange={handleChange}
            >
            <option value='space'> Space </option>
            <option value='value'> Value </option>
            </select>
        {errors.calculateBy && <div className="error-message">{errors.calculateBy}</div>}
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

export default TaxesForm