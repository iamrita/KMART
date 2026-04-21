import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="footer-logo-text">Catalog</span>
            </div>
            <p className="footer-tagline">Shop Everything for Less.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-link">f</a>
              <a href="#" aria-label="Twitter" className="social-link">𝕏</a>
              <a href="#" aria-label="Instagram" className="social-link">ig</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>About Catalog</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Corporate Info</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>More Ways to Shop</h4>
            <ul>
              <li><a href="#">Catalog App</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Weekly Ad</a></li>
              <li><a href="#">Rewards</a></li>
              <li><a href="#">Layaway</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Catalog. All rights reserved. This is a demo website.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
