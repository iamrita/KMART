import './CategoryBar.css';

export default function CategoryBar({ categories, activeCategory, onCategoryChange }) {
  return (
    <section className="category-section">
      <div className="category-inner">
        <h2 className="category-heading">Shop by Department</h2>
        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
