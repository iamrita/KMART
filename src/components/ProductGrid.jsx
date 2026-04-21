import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <h3>No products found</h3>
        <p>Try adjusting your search or browse a different category.</p>
      </div>
    );
  }

  return (
    <section className="product-grid-section">
      <div className="product-grid-header">
        <h2 className="product-grid-title">Featured Products</h2>
        <span className="product-count">{products.length} items</span>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
