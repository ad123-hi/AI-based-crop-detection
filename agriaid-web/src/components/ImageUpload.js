import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Handles file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setIsUploading(true);
    setError(null);

    // 1. Create FormData to send the file
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 2. Make the API call (based on your API contract)
      //    (Update 'http://localhost:8000' to your backend's address)
      const response = await axios.post('http://localhost:8000/api/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Add auth if needed
        }
      });

      // 3. On success, get the resultId and navigate
      const { resultId } = response.data;
      navigate(`/result/${resultId}`);

    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card">
      <h2>Upload New Image</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ marginBottom: '15px' }}
        />
        
        {preview && (
          <img 
            src={preview} 
            alt="Preview" 
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '15px', borderRadius: '8px' }}
          />
        )}
        
        <button type="submit" className="button-primary" disabled={isUploading}>
          {isUploading ? 'Analyzing...' : 'Analyze Image'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default ImageUpload;