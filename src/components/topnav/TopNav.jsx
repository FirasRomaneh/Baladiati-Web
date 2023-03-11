import React, { useContext, useEffect, useState } from 'react'
import images from "../../constants/images"
import './topnav.scss'
import UserInfo from '../user-info/UserInfo'
import { AuthContext } from '../../context/AuthContext'
import db from '../../firasbasecon'

const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }
    const {uid} = useContext(AuthContext)
    const [name, setName] = useState();
    useEffect(() => {
        // Function to run on initial page load
        const EmployeesRef = db.collection('Employees').where('uid', '==', parseInt(uid, 10));
        EmployeesRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            setName(doc.data().name)
          });
        })
        .catch(err => {
          console.log('Errorgetting documents', err);
        });
    }, [name, uid]);
    const user = {
        name: name,
        img: images.avt
    }
    return (
        <div className='topnav'>
            <UserInfo user={user} />
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            </div>
        </div>
    )
}

export default TopNav
