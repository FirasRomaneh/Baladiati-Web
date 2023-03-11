import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap-sweetalert/dist/sweetalert.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
