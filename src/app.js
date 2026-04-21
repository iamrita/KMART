import { products, categories, promoDeals } from './data/products.js';

const state = {
  activeCategory: 'all',
  searchQuery: '',
  cartCount: 0,
  toastTimer: null,
};

function getFilteredProducts() {
  let result = products;
  if (state.activeCategory !== 'all') {
    result = result.filter((p) => p.category === state.activeCategory);
  }
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  return result;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function starRatingHtml(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    let cls = 'star';
    if (i <= Math.floor(rating)) cls += ' filled';
    else if (i - rating < 1 && i - rating > 0) cls += ' half';
    html += `<span class="${cls}">★</span>`;
  }
  return `<div class="star-rating">${html}</div>`;
}

function badgeModifierClass(badge) {
  if (badge === 'Best Seller') return 'best-seller';
  if (badge === 'Top Rated') return 'top-rated';
  return 'deal';
}

function renderHeader(container) {
  const cartBadge =
    state.cartCount > 0
      ? `<span class="cart-badge" id="cart-badge">${state.cartCount}</span>`
      : `<span class="cart-badge" id="cart-badge" hidden></span>`;

  container.innerHTML = `
    <div class="header-top">
      <div class="header-inner">
        <div class="header-left">
          <a href="/" class="logo">
            <span class="logo-text">Catalog</span>
          </a>
        </div>

        <form class="search-bar" id="search-form">
          <input
            type="text"
            id="search-input"
            placeholder="Search products..."
            autocomplete="off"
            value="${escapeHtml(state.searchQuery)}"
          />
          <button type="submit" class="search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>

        <div class="header-right">
          <button type="button" class="header-action">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Sign In</span>
          </button>
          <button type="button" class="header-action cart-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span>Cart</span>
            ${cartBadge}
          </button>
        </div>
      </div>
    </div>

    <nav class="header-nav">
      <div class="header-inner">
        <ul class="nav-links">
          <li><a href="#" class="nav-link active">Shop All</a></li>
          <li><a href="#" class="nav-link">Weekly Ad</a></li>
          <li><a href="#" class="nav-link">Deals</a></li>
          <li><a href="#" class="nav-link">Clearance</a></li>
          <li><a href="#" class="nav-link">New Arrivals</a></li>
          <li><a href="#" class="nav-link">Store Pickup</a></li>
        </ul>
      </div>
    </nav>
  `;

  const form = container.querySelector('#search-form');
  const input = container.querySelector('#search-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.searchQuery = input.value;
    renderProductGrid(document.getElementById('site-grid'));
  });

  input.addEventListener('input', () => {
    state.searchQuery = input.value;
    renderProductGrid(document.getElementById('site-grid'));
  });
}

function renderPromo(container) {
  const cards = promoDeals
    .map((deal) => {
      const extra = deal.cardClass ? ` ${deal.cardClass}` : '';
      return `
        <div class="promo-card${extra}" style="background: ${deal.bgColor}">
          <div class="promo-content">
            <span class="promo-icon">${deal.icon}</span>
            <h3 class="promo-title">${escapeHtml(deal.title)}</h3>
            <p class="promo-subtitle">${escapeHtml(deal.subtitle)}</p>
            <button type="button" class="promo-cta">${escapeHtml(deal.cta)}</button>
          </div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <section class="promo-section">
      <div class="promo-grid">${cards}</div>
    </section>
  `;
}

function renderCategoryBar(container) {
  const chips = categories
    .map(
      (cat) => `
      <button type="button" class="category-chip ${
        state.activeCategory === cat.id ? 'active' : ''
      }" data-category-id="${escapeHtml(cat.id)}">
        <span class="category-icon">${cat.icon}</span>
        <span class="category-name">${escapeHtml(cat.name)}</span>
      </button>
    `
    )
    .join('');

  container.innerHTML = `
    <section class="category-section">
      <div class="category-inner">
        <h2 class="category-heading">Shop by Department</h2>
        <div class="category-bar">${chips}</div>
      </div>
    </section>
  `;

  container.querySelectorAll('.category-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.getAttribute('data-category-id') || 'all';
      renderCategoryBar(container);
      renderProductGrid(document.getElementById('site-grid'));
    });
  });
}

function renderProductGrid(container) {
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3>No products found</h3>
        <p>Try adjusting your search or browse a different category.</p>
      </div>
    `;
    return;
  }

  const cards = filtered
    .map((product) => {
      const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
      const badgeHtml = product.badge
        ? `<span class="product-badge ${badgeModifierClass(product.badge)}">${escapeHtml(product.badge)}</span>`
        : '';
      const oosOverlay = !product.inStock
        ? `<div class="out-of-stock-overlay"><span>Out of Stock</span></div>`
        : '';
      const btnLabel = product.inStock ? 'Add to Cart' : 'Notify Me';
      const disabled = product.inStock ? '' : ' disabled';

      return `
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-image-wrap">
            <img
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.name)}"
              class="product-image"
              loading="lazy"
            />
            ${badgeHtml}
            ${oosOverlay}
          </div>
          <div class="product-info">
            <h3 class="product-name">${escapeHtml(product.name)}</h3>
            <div class="product-rating">
              ${starRatingHtml(product.rating)}
              <span class="rating-count">(${product.reviews.toLocaleString()})</span>
            </div>
            <div class="product-pricing">
              <span class="current-price">$${product.price.toFixed(2)}</span>
              <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
              <span class="discount-tag">Save ${discount}%</span>
            </div>
            <button type="button" class="add-to-cart-btn"${disabled} data-product-id="${product.id}">
              ${btnLabel}
            </button>
          </div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <section class="product-grid-section">
      <div class="product-grid-header">
        <h2 class="product-grid-title">Featured Products</h2>
        <span class="product-count">${filtered.length} items</span>
      </div>
      <div class="product-grid">${cards}</div>
    </section>
  `;

  container.querySelectorAll('.add-to-cart-btn:not([disabled])').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-product-id'));
      const product = products.find((p) => p.id === id);
      if (product) {
        state.cartCount += 1;
        updateCartBadge();
        showToast(`${product.name} added to cart`);
      }
    });
  });
}

function renderFooter(container) {
  container.innerHTML = `
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-logo">
              <span class="footer-logo-text">Catalog</span>
            </div>
            <p class="footer-tagline">Shop Everything for Less.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook" class="social-link">f</a>
              <a href="#" aria-label="Twitter" class="social-link">𝕏</a>
              <a href="#" aria-label="Instagram" class="social-link">ig</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>About Catalog</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Corporate Info</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>

          <div class="footer-col">
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

        <div class="footer-bottom">
          <p>&copy; 2026 Catalog. All rights reserved. This is a demo website.</p>
          <div class="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
  `;
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;

  if (state.cartCount > 0) {
    badge.textContent = String(state.cartCount);
    badge.hidden = false;
  } else {
    badge.textContent = '';
    badge.hidden = true;
  }
}

function showToast(message) {
  const root = document.getElementById('toast-root');
  if (state.toastTimer) {
    clearTimeout(state.toastTimer);
    state.toastTimer = null;
  }

  root.innerHTML = `
    <div class="toast">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>${escapeHtml(message)}</span>
    </div>
  `;

  state.toastTimer = setTimeout(() => {
    root.innerHTML = '';
    state.toastTimer = null;
  }, 2500);
}

export function initApp() {
  renderHeader(document.getElementById('site-header'));
  renderPromo(document.getElementById('site-promo'));
  renderCategoryBar(document.getElementById('site-category'));
  renderProductGrid(document.getElementById('site-grid'));
  renderFooter(document.getElementById('site-footer'));
}
