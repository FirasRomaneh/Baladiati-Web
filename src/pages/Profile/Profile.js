import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../components/ui'
import profile from "./pro.png"
import "./style.css"
import db from "../../firasbasecon";
import bcrypt from 'bcryptjs';
import { AuthContext } from '../../context/AuthContext';

let initialState = {
	uid: "",
	name: "",
	email: "",
  }

const Profile = () => {
    const {uid} = useContext(AuthContext)
	const [Newdata, setNewData] = useState(initialState);
    const [data, setData] = useState(initialState);
	const [clicked, setClicked] = useState(false);
    const [componentLoaded, setComponentLoaded] = useState(false);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [error, setError] = useState('');
  
	async function handleSubmitPass(event) {
	  event.preventDefault();

	  if (!await bcrypt.compare(oldPassword, Newdata.password)) { // replace 'currentPassword' with the actual current password
		setError('Old password is incorrect');
	  } else if (newPassword !== confirmPassword) {
		setError('New password and confirm password do not match');
	  } else {
		const hashedpassword = await bcrypt.hash(newPassword, 12);
		const query = db.collection('Employees').where('uid', '==', parseInt(Newdata.uid, 10));
		// Get the document from the query
		query.get().then((querySnapshot) => {
		// Iterate through the documents returned from the query
			querySnapshot.forEach((doc) => {
			// Update the name field
				doc.ref.update({
					password: hashedpassword,
				}).then(() => {
					console.log('Document successfully updated!');
				}).catch((error) => {
					console.error('Error updating document: ', error);
				});
			});
		}).catch((error) => {
			console.error('Error getting documents: ', error);
		});
		setPasswordChanged(true);
	  }
	}

	const handleCancelPass = () =>{
		setConfirmPassword('');
		setNewPassword('');
		setOldPassword('');
	}
	
    const handleClick = () => {
        setClicked(true);
        setComponentLoaded(false);
    };

    useEffect(() => {
        if (clicked || !componentLoaded) {
			setComponentLoaded(true);
			// Function to run on initial page load
			const EmployeesRef = db.collection('Employees').where('uid', '==', parseInt(uid, 10));
			EmployeesRef.get()
			.then(snapshot => {
			snapshot.forEach(doc => {
				let newData = {...doc.data()};
				newData.id = doc.id;
				setNewData(newData)
				setData(newData)
			});
			})
			.catch(err => {
			console.log('Errorgetting documents', err);
			});
		}
    }, [clicked, componentLoaded, uid]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewData({ ...Newdata, [name]: value });
	};

	const handleCancel = () =>{
		setNewData(data)
	}

	const handleSubmit = async () => {		
		if (!Newdata.name) {
			setNewData(data)
			return
		}
		if (!Newdata.email) {
			setNewData(data)
			return
		}
		const query = db.collection('Employees').where('uid', '==', parseInt(Newdata.uid, 10));
		// Get the document from the query
		query.get().then((querySnapshot) => {
		// Iterate through the documents returned from the query
			querySnapshot.forEach((doc) => {
			// Update the name field
				doc.ref.update({
					name: Newdata.name,
					email: Newdata.email,
				}).then(() => {
					handleClick();
					console.log('Document successfully updated!');
				}).catch((error) => {
					console.error('Error updating document: ', error);
				});
			});
		}).catch((error) => {
			console.error('Error getting documents: ', error);
		});
	}

  return (
    <section className="py-5 my-5">
		<div className="container">
            <div className="p-4">
				<div className="img-circle text-center mb-3">
					<img src={profile} alt="Img" className="shadow" />
				</div>
				<h4 className="text-center">{data.name}</h4>
			</div>
			<div className="bg-white shadow rounded-lg d-block d-sm-flex">
				<div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                <h3 className="mb-4">Account Settings</h3>
                    <div className="row">
						<div className="col-md-6">
						    <div className="form-groupppp">
								<label htmlFor='uid'>UID</label>
								<input id='uid'type="number" className="form-control" value={uid} readOnly/>
							</div>
						</div>
						<div className="col-md-6">
						    <div className="form-groupppp">
								<label htmlFor='name'>Name</label>
								<input id='name' name="name" type="text" className="form-control" value={Newdata.name} onChange={handleChange}/>
							</div>
						</div>
						<div className="col-md-6">
						    <div className="form-groupppp">
								<label htmlFor='email'>Email</label>
								<input id='email' name="email" type="text" className="form-control" value={Newdata.email} onChange={handleChange} />
							</div>
						</div>
					</div>
                    <div className='buttonPro'>
                        <div className='btt'>
                            <Button type='success' onClick={handleSubmit}>Update</Button>
                        </div>
                        <div className='btt'>
                            <Button type='Delete' onClick={handleCancel}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow rounded-lg d-block d-sm-flex">
            <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
						<h3 className="mb-4">Password Settings</h3>
						{passwordChanged ? (
        <div className="alert alert-success" role="alert">
          Password changed successfully!
        </div>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row">
            <div className="col-md-6">
              <div className="form-groupppp">
                <label htmlFor='password'>Old password</label>
                <input id='password' type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-groupppp">
                <label htmlFor='New'>New password</label>
                <input id="New" type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-groupppp">
                <label htmlFor='Confirm'>Confirm new password</label>
                <input id='Confirm' type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          </div>
          <div className='btt'>
             <Button type='success' onClick={handleSubmitPass}>Update</Button>
            </div>
			<div className='btt'>
                            <Button type='Delete' onClick={handleCancelPass}>Cancel</Button>
                        </div>
        </>
      )}
					</div>
        </div>
        </div>

	</section>
  )
}

export default Profile