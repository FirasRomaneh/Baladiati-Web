import {Navigate,  Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import "./App.css";
import Login from "./Pages/Login/Login";
import Employees from "./Pages/Employees/Employees";
import MainPage from "./Pages/MainPage/MainPage";
import Sidebar from "./components/Sidebar";

function App() {
  const { isAuth } = useContext(AuthContext)

  return (
    <>
      {isAuth ? (
      <div>
        <Sidebar/>
      <Routes>
      <Route path="/" element={<Navigate to="/MainPage" replace />} />
      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/MainPage/Employees" element={<Employees />}/>
      </Routes>
      {/* <Route path="/MainPage/Citizen" element={<Citizen />}/>
          <Route path="/MainPage/Citizen/AddCitizen" element={<AddCitizen />}/>
          <Route path="/MainPage/Employees/AddEmployee" element={<AddEmployee />}/>
      <Route path="/MainPage/Complaints" element={<Complaints />}/> */}
      </div>
      ) : (
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
