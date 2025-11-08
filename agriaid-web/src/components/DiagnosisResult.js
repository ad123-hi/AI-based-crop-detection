import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DiagnosisResult() {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Get the 'id' from the URL (e.g., /result/abc-123)
  const { id } = useParams();

  // 2. Fetch data when the component loads or 'id' changes
  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 3. Make the API call (based on your API contract)
        const response = await axios.get(`http://localhost:8000/api/result/${id}`, {
          // headers: { 'Authorization': 'Bearer YOUR_AUTH_TOKEN' }
        });
        setReport(response.data);
      } catch (err) {
        setError("Could not fetch report. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id]); // This dependency array ensures the effect runs when 'id' changes

  // 4. Render based on state
  if (isLoading) {
    return <div className="card"><h2>Loading Analysis...</h2></div>;
  }

  if (error) {
    return <div className="card" style={{backgroundColor: '#ffebee', color: '#c62828'}}>
      <h2>Error</h2>
      <p>{error}</p>
    </div>;
  }

  if (!report) {
    return null; // Or a "No report found" message
  }

  // 5. Render the full report
  return (
    <div>
      <h2>Diagnosis Result</h2>
      <div className="card">
        <img 
          src={report.uploadedImageUrl} 
          alt="Uploaded leaf" 
          style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
        />
        <h3>AI Diagnosis:</h3>
        <h1 style={{ color: '#d9534f' }}>{report.diagnosis}</h1>
        <p><strong>Confidence:</strong> {Math.round(report.confidence * 100)}%</p>
      </div>

      <div className="card">
        <h3>Personalized Advisory</h3>
        <p>{report.advisory.description}</p>
        
        <h4>Organic Treatment</h4>
        <ul>
          {report.advisory.organic.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>

        <h4>Chemical Treatment</h4>
        <ul>
          {report.advisory.chemical.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DiagnosisResult;