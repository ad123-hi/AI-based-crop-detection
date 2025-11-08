import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherAlerts() {
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This runs once when the component mounts
    const fetchWeather = async () => {
      try {
        // Using a placeholder API. Replace with your /api/weather endpoint
        // const response = await axios.get('http://localhost:8000/api/weather');
        
        // --- Placeholder Data (Remove when your API is ready) ---
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        const placeholderResponse = { 
          data: { 
            alert: "Warning: High humidity and rain expected in 48 hours. Risk of fungal infection is high." 
          }
        };
        // --- End Placeholder ---

        setAlert(placeholderResponse.data.alert);
      } catch (err) {
        console.error("Could not fetch weather", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWeather();
  }, []); // Empty array means run once on mount

  if (isLoading) {
    return <div className="card">Loading weather...</div>;
  }

  if (!alert) {
    return <div className="card">No active weather alerts.</div>;
  }

  return (
    <div className="card" style={{ backgroundColor: '#fff9e6', borderLeft: '5px solid #ffc107' }}>
      <h3>Weather Alert</h3>
      <p>{alert}</p>
    </div>
  );
}

export default WeatherAlerts;