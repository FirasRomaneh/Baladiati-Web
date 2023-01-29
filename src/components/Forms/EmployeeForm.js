import { Button } from "../ui/index"
import db from "../../firasbasecon"
import React, {useEffect, useState } from 'react'
import './EmployeeForm.css'

let initialState = {
  uid: "",
  name: "",
  password: "",
}

const EmployeeForm = ({ closeModal, defaultData }) => {

  if (defaultData) {
    initialState = { ...defaultData }
  }

  let formErrors = {};
  const [data, setData] = useState(initialState)

  const clearForm = () => {
    setData({
      uid: "",
      name: '',
      password: "",
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
    
        if (!data.password) {
          formErrors.password = "Password is required";
        }
    
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
        const query = db.collection('Employees').where('uid', '==', parseInt(data.uid, 10));
        if (defaultData) {
            // Get the document from the query
            query.get().then((querySnapshot) => {
                // Iterate through the documents returned from the query
                querySnapshot.forEach((doc) => {
                    // Update the name field
                    doc.ref.update({
                      name: data.name,
                      password: data.password,
                    })
                    closeModal()
                    .then(() => {
                        console.log('Document successfully updated!');
                    })
                    .catch((error) => {
                        console.error('Error updating document: ', error);
                    });
                });
            })
            .catch((error) => {
                console.error('Error getting documents: ', error);
            });
        } else {
            // Get the document from the query
            query.get().then(function(querySnapshot) {
            if (querySnapshot.size > 0) {
                formErrors.uid = "UID is Existing";
                setErrors(formErrors);
            } else {
                db.collection("Employees").add({
                uid: parseInt(data.uid, 10),
                name: data.name,
                password: data.password,
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
    <div className="new-Employee">
      <h2> {defaultData ? 'Edit' : 'Add new'}  Employee</h2>

      <form className="form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="uid" > uid</label>
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
          <label htmlFor="name" > name</label>
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
          <label htmlFor="password" > password</label>
          <input
            type='text'
            id="password"
            name="password"
            className={errors.password ? 'error-input' : ''}
            placeholder='password...'
            value={data.password}
            onChange={handleChange}
          />
        {errors.password && <div className="error-message">{errors.password}</div>}
        </div> 

        <Button size="large">
          {defaultData ? 'Edit' : 'Save'}
        </Button>

      </form>
    </div>
  )
}

export default EmployeeForm