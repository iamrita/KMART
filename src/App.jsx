import { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import PromoBanner from './components/PromoBanner';
import CategoryBar from './components/CategoryBar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { products, categories, promoDeals } from './data/products';
import './App.css';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const handleAddToCart = useCallback((product) => {
    setCartCount((c) => c + 1);
    setToast(`${product.name} added to cart`);
  }, []);

  const handleDismissToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <div className="app">
      <Header cartCount={cartCount} onSearch={setSearchQuery} />
      <main>
        <PromoBanner deals={promoDeals} />
        <CategoryBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
      {toast && <Toast message={toast} onClose={handleDismissToast} />}
    </div>
  );
}
