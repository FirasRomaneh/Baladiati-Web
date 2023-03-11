import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import {Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MainLayout from './Layout/MainLayout'
import Employees from './pages/Employees/Employees'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Login from './pages/Login/Login'
import Citizens from './pages/Citizens/Citizens'
import Complaints from './pages/Complaints/Complaints'
import Advertisment from './pages/Advertisment/Advertisment'
import Events from './pages/Events/Events'
import Donation from './pages/Donation/Donation'
import Services from './pages/Services/Services'
import Taxes from './pages/Taxes/Taxes'
import Profile from './pages/Profile/Profile'
import { Blank } from './pages/Blank'

function App() {
    const { isAuth, isAdmin } = useContext(AuthContext)
    const isMobile = window.innerWidth <= 1100; // or any other value that matches your definition of "mobile"
    return (
        <Routes>
          {isMobile ? ( 
            <>
            <Route path="/" element={<Blank />}/>
            <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : ( 
            <>
        {isAuth ? (
        <>
        {isAdmin ? (
          <Route path="/Employees" element={<MainLayout />}>
            <Route index element={<Employees />} />
          </Route>
          ) : (
            <Route path="/Employees" element={<MainLayout />}>
              <Route index element={<Navigate to="/MainPage" replace/>} />
            </Route>
          ) 
        }
        <Route path="/" element={<Navigate to="/MainPage" replace />} />
        <Route path="/MainPage" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/Complaints" element={<MainLayout />}>
          <Route index element={<Complaints />} />
        </Route>
        <Route path="/Advertisments" element={<MainLayout />}>
          <Route index element={<Advertisment />} />
        </Route>
        <Route path="/Citizens" element={<MainLayout />}>
          <Route index element={<Citizens />} />
        </Route>
        <Route path="/Taxes" element={<MainLayout />}>
          <Route index element={<Taxes />} />
        </Route>
        <Route path="/Services" element={<MainLayout />}>
          <Route index element={<Services />} />
        </Route>
        <Route path="/Donations" element={<MainLayout />}>
          <Route index element={<Donation />} />
        </Route>
        <Route path="/Events" element={<MainLayout />}>
          <Route index element={<Events />} />
        </Route>
        <Route path="/Profile" element={<MainLayout flag={false}/>}>
          <Route index element={<Profile />} />
        </Route>
        </>
         ) : (
           <>
           <Route path="/" element={<Login />}/>
           <Route path="*" element={<Navigate to="/" replace />} />
           </>
         )}
         </>
          )}
       </Routes>
    );
}

export default App
