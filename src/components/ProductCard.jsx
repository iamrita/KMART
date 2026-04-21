import './ProductCard.css';

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star">★</span>);
    }
  }
  return <div className="star-rating">{stars}</div>;
}

export default function ProductCard({ product, onAddToCart }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.badge && (
          <span className={`product-badge ${product.badge === 'Best Seller' ? 'best-seller' : product.badge === 'Top Rated' ? 'top-rated' : 'deal'}`}>
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-pricing">
          <span className="current-price">${product.price.toFixed(2)}</span>
          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          <span className="discount-tag">Save {discount}%</span>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Notify Me'}
        </button>
      </div>
    </div>
  );
}
