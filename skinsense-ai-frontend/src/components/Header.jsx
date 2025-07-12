import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <div className="logo">
            <Heart className="logo-icon" />
          </div>
          <div>
            <h1>SkinSense AI</h1>
            <p>Advanced Skin Analysis</p>
          </div>
        </div>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">How it Works</a>
          <a href="#" className="nav-link">Contact</a>
          <button className="nav-button">Get Started</button>
        </nav>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}