import {Navigate,  Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Login from "./Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage";
import DefaultLayout from './layouts/DefaultLayout';
import Employees from "./Pages/Employees/Employees";


function App() {
  const { isAuth } = useContext(AuthContext)

  return (
    <Routes>
      {isAuth ? (
        <>
        <Route path="/" element={<Navigate to="/MainPage" replace />} />
        <Route path="/MainPage" element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path="/MainPage/Employees" element={<DefaultLayout />}>
          <Route index element={<Employees />} />
        </Route>
      {/* <Routes>
      <Route path="/" element={<Navigate to="/MainPage" replace />} />
      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/MainPage/Employees" element={<Employees />}/>
      </Routes> */}
      {/* <Route path="/MainPage/Citizen" element={<Citizen />}/>
          <Route path="/MainPage/Citizen/AddCitizen" element={<AddCitizen />}/>
          <Route path="/MainPage/Employees/AddEmployee" element={<AddEmployee />}/>
      <Route path="/MainPage/Complaints" element={<Complaints />}/> */}
        {/* </div> */}
        </>
      ) : (
        <>
        <Route path="/" element={<Login />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}

    </Routes>
  );
}

export default App;
