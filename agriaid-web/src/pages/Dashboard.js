import React from 'react';
import { Link } from 'react-router-dom';
import WeatherAlerts from '../components/WeatherAlerts';
// We will add the Chatbot later, floating on App.js

function Dashboard() {
  return (
    <div>
      <h2>Welcome, Farmer!</h2>
      
      <WeatherAlerts />

      <div className="card">
        <h3>Have a sick plant?</h3>
        <p>Get an instant diagnosis and treatment plan.</p>
        <Link to="/upload" className="button-primary">Upload Leaf Photo</Link>
      </div>
      
      {/* A placeholder for the history list */}
      <div className="card">
        <h3>Past Reports</h3>
        <p>Your previous diagnoses will appear here.</p>
      </div>
    </div>
  );
}

export default Dashboard;