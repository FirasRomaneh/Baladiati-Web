import React, { useState } from 'react'
import { Button } from '../../ui'
import db from "../../../firasbasecon"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "./ServicesMadeForm.css"

const ServicesMadeForm = ({ closeModal, defaultData }) => {

    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(defaultData.serviceFile);

    const openDocument = () => {
        window.open(defaultData.serviceFile, '_blank');
    }

    const handleChangeFile = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    };

    const upload = async () => {
        let Url = filename;
        if(filename !== defaultData.serviceFile){
          const storageRef = firebase.storage().ref();
          const advertisementRef = storageRef.child("ServicesMadeFiles");
          const imageRef = advertisementRef.child(filename);
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
        const query = db.collection('serviceMade').doc(defaultData.id);
        await query.update({
            serviceFile: Url,
        })
        closeModal()
    }
  return (
    <div className="new-Citizen">
        <h2> {defaultData.serviceFile ? 'Edit' : 'Add a New'}  File</h2>
        {defaultData.serviceFile ? 
            <div className="center">
                <Button size="large" onClick={openDocument}>View File</Button>
            </div> : null
        }
        <div className="form-group">
            <label htmlFor="file" > Add doc File</label>
            <input 
                type='file'
                id="file"
                name="file"
                placeholder='file...'
                onChange={handleChangeFile}
            />
        </div>
        <div className="ButtonViewSS">
            <div className='ButtonCC'>
                <Button size="large" onClick={upload}>
                    Upload
                </Button>
            </div>
            <div className='ButtonCC'>
                <Button size="large" onClick={closeModal}>
                    Close
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ServicesMadeForm