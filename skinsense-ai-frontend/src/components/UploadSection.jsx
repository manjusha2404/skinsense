import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function UploadSection({ setPrediction }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:5001/api/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Network error. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-section">
      <div className="card">
        <div className="card-header">
          <ImageIcon className="card-icon" />
          <h2>Upload Skin Image</h2>
          <p>Upload a clear image of the affected skin area for analysis</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!preview ? (
                <div className="upload-placeholder">
                  <div className="upload-icon">
                    <Upload />
                  </div>
                  <p>
                    Drop your image here, or{' '}
                    <span className="browse-link" onClick={handleBrowseClick}>
                      browse
                    </span>
                  </p>
                  <p className="upload-hint">Supports JPG, PNG, WEBP up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="upload-input"
                    ref={fileInputRef}
                  />
                </div>
              ) : (
                <img src={preview} alt="Preview" className="preview-image" />
              )}
            </div>
            {error && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !file}
              className="submit-button"
            >
              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  Processing Image...
                </div>
              ) : (
                'Analyze Image'
              )}
            </button>
          </form>
          <div className="tips">
            <h4>Tips for best results:</h4>
            <ul>
              <li>Ensure good lighting and clear focus</li>
              <li>Include the entire affected area</li>
              <li>Avoid shadows or reflections</li>
              <li>Take the photo from a reasonable distance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}