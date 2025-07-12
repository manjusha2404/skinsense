import { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';
import './styles.css';

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="app">
      <Header />
      <main className="main-container">
        <section className="hero">
          <h1 className="hero-title">SkinSense AI</h1>
          <p className="hero-subtitle">
            Advanced AI-powered skin condition analysis for early detection and personalized care recommendations
          </p>
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon medical"></div>
              <h3>Medical Grade Analysis</h3>
              <p>Advanced AI algorithms trained on medical datasets for accurate detection</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon instant"></div>
              <h3>Instant Results</h3>
              <p>Get comprehensive analysis and recommendations in seconds</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon privacy"></div>
              <h3>Privacy Protected</h3>
              <p>Your images are processed securely and never stored permanently</p>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="upload-wrapper">
            <UploadSection setPrediction={setPrediction} />
          </div>
          {prediction && (
            <div className="result-wrapper">
              <ResultSection prediction={prediction} />
            </div>
          )}
        </section>
        <section className="disclaimer">
          <p>
            <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and should not replace
            professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;