import {React, useState } from 'react'
import 'bootstrap-sweetalert/dist/sweetalert.css';
import sweetAlert from 'bootstrap-sweetalert';
import './overall-list.scss'
import db from '../../firasbasecon'
import { Button } from '../ui';

const OverallList = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [uid, setUid] = useState("");
    const [credit, setCredit] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const body2 = { title, body }
        const res = await fetch('https://important-foal-buckle.cyclic.app/sendNotificationToAll', {
            method: 'POST',
            body: JSON.stringify(body2),
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        if (res.ok) {
            sweetAlert("Notification was sent", "\n", "success")
            setTitle("")
            setBody("")
            db.collection("notifications").add({
                title: title,
                message: body,
                timestamp: new Date(),
              });
        } else {
            sweetAlert("Notification was not sent", "\n", "error");
        }
    };

    const ADD = async (e) => {
        e.preventDefault();
        if(parseInt(credit, 10) < 1){
            sweetAlert("The Credit shall be positive number", "\n", "error");
            return;
        }
        // Reference to the collection
        const collectionRef = db.collection('Citizens');
        // Query the documents based on the known field
        collectionRef.where('uid', '==', parseInt(uid, 10)).get()
        .then(function(querySnapshot) {
            if(querySnapshot.size !== 0){
                querySnapshot.forEach(function(doc) {
                    // Get the reference to the document
                    const docRef = db.collection('Citizens').doc(doc.id);
                    const oldValue = doc.data().credit;
                    const newValue = parseInt(oldValue, 10) +  parseInt(credit, 10);
                    // Update the desired field
                    docRef.set({
                        credit: parseInt(newValue, 10)
                    }, { merge: true });
                });
                sweetAlert("The Credit is Add", "\n", "success")
                setUid("")
                setCredit("")
            } else {
                sweetAlert("The UID does not exist", "\n", "error");
            }
        });
    };

    return (
        <ul className='overall-list'>
        <h3 className='H3'>Send Notification</h3>
        <div className='sub-main2'>
            <label htmlFor="Title" className='label_Nav'>Title</label>
            <input
            type="text"
            id="Title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input_Nav"
            />
            <label htmlFor="Body" className='label_Nav'>Body</label>
            <input
            type="txet"
            id="Body"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="input_Nav"
            />
          <div className="ButtonAdd">
                <Button size="Firas" onClick={submit}>
                    Send
                </Button>
            </div>
        </div>
        <hr className='Braek'/>
        <h3 className='H3'>Add Credit</h3>
        <div className='sub-main2'>
            <label htmlFor="uid" className='label_Nav'>UID</label>
            <input
            type="number"
            id="uid"
            placeholder="uid"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="input_Nav"
            />
            <label htmlFor="Credit" className='label_Nav'>Credit</label>
            <input
            type="number"
            id="Credit"
            placeholder="Credit"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            className="input_Nav"
            />
            <div className="ButtonAdd">
                <Button size="Firas" onClick={ADD}>
                    Add
                </Button>
            </div>
        </div>
            {/* {
                DataOverall && DataOverall.length > 0 && DataOverall.map((item, index) => (
                    <li className="overall-list__item" key={`overall-${index}`}>
                        <div className="overall-list__item__icon">
                            {icons[index]}
                        </div>
                        <div className="overall-list__item__info">
                            <div className="title">
                                {item.value}
                            </div>
                            <span>{item.title}</span>
                        </div>
                    </li>
                ))
            } */}
        </ul>
    )
}

export default OverallList
