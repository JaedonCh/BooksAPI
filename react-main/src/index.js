import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(//Almost immediently hands responsibility over to the App.js file
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
