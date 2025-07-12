import { Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ResultSection({ prediction }) {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'high-confidence';
    if (confidence >= 0.6) return 'medium-confidence';
    return 'low-confidence';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 0.8) return <CheckCircle className="confidence-icon" />;
    return <AlertTriangle className="confidence-icon" />;
  };

  return (
    <div className="result-section">
      <div className="card">
        <div className="card-header">
          <Activity className="card-icon" />
          <h2>Analysis Results</h2>
        </div>
        <div className="card-content">
          <div className="result-image">
            <img
              src={`http://127.0.0.1:5001${prediction.imageUrl}`}
              alt="Analyzed skin condition"
              className="image"
            />
            <span className="badge">Analyzed</span>
          </div>
          <div className="results">
            <div className="result-item condition">
              <h3>Detected Condition</h3>
              <span className="badge primary">Primary</span>
              <p className="value">{prediction.disease}</p>
            </div>
            <div className="result-item category">
              <h3>Category</h3>
              <span className="badge">{prediction.category}</span>
            </div>
            <div className="result-item confidence">
              <h3>Confidence Level</h3>
              <span className={`badge ${getConfidenceColor(prediction.confidence)}`}>
                {getConfidenceIcon(prediction.confidence)}
                {(prediction.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="result-item care">
              <h3><CheckCircle className="icon" /> Immediate Care</h3>
              <p>{prediction.first_aid}</p>
            </div>
            <div className="alert">
              <Info className="alert-icon" />
              <p><strong>Professional Recommendation:</strong> {prediction.recommendation}</p>
            </div>
          </div>
          <div className="actions">
            <button className="action-button primary">Save Results</button>
            <button className="action-button secondary">Share with Doctor</button>
          </div>
        </div>
      </div>
    </div>
  );
}