import { Button } from "../../ui/index"
import db from "../../../firasbasecon"
import bcrypt from 'bcryptjs';
import React, {useEffect, useState } from 'react'
import './EmployeeForm.css'
let initialState = {
  uid: "",
  name: "",
  email: "",
  administrator: false,
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
      name: "",
      email: "",
      administrator: false,
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
    
        if (!data.email) {
          formErrors.email = "Email is required";
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
                      email: data.email,
                      administrator: data.administrator,
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
            .catch((error) => {
                console.error('Error getting documents: ', error);
            });
        } else {
            // Get the document from the query
            query.get().then(async function(querySnapshot) {
            if (querySnapshot.size > 0) {
                formErrors.uid = "UID is Existing";
                setErrors(formErrors);
            } else {
                data.password = "Ba" + data.uid.charAt(0) + data.uid.charAt(1) + "Ba" + + data.uid.charAt(data.uid.length-2) + data.uid.charAt(data.uid.length-1);
                const hashedpassword = await bcrypt.hash(data.password, 12);
                db.collection("Employees").add({
                  uid: parseInt(data.uid, 10),
                  name: data.name,
                  email: data.email,
                  administrator: data.administrator,
                  password: hashedpassword,
                });
                closeModal()
                const body = {uid: parseInt(data.uid, 10)};
                await fetch('https://important-foal-buckle.cyclic.app/sendEmail', {
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
    <div className="new-Employee">
      <h2> {defaultData ? 'Edit' : 'Add a New'}  Employee</h2>

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
        <div className="Check_Box">
          <input type="checkbox" onChange={() => setData({ ...data, administrator: !data.administrator })} id="administrator" checked={data.administrator} className="check"/>
          <label htmlFor="administrator" className="label-check">Administrator</label>
        </div>
        <Button size="large">
          {defaultData ? 'Edit' : 'Save'}
        </Button>

      </form>
    </div>
  )
}

export default EmployeeForm