import { useState } from 'react';
import './Header.css';

export default function Header({ cartCount, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-inner">
          <div className="header-left">
            <a href="/" className="logo">
              <span className="logo-k">K</span>
              <span className="logo-text">mart</span>
            </a>
          </div>

          <form className="search-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search everything at Kmart..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <div className="header-right">
            <button className="header-action">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Sign In</span>
            </button>
            <button className="header-action cart-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="header-inner">
          <ul className="nav-links">
            <li><a href="#" className="nav-link active">Shop All</a></li>
            <li><a href="#" className="nav-link">Weekly Ad</a></li>
            <li><a href="#" className="nav-link">Deals</a></li>
            <li><a href="#" className="nav-link">Clearance</a></li>
            <li><a href="#" className="nav-link">New Arrivals</a></li>
            <li><a href="#" className="nav-link">Store Pickup</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
