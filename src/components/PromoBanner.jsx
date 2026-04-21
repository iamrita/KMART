import './PromoBanner.css';

export default function PromoBanner({ deals }) {
  return (
    <section className="promo-section">
      <div className="promo-grid">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="promo-card"
            style={{ background: deal.bgColor }}
          >
            <div className="promo-content">
              <span className="promo-icon">{deal.icon}</span>
              <h3 className="promo-title">{deal.title}</h3>
              <p className="promo-subtitle">{deal.subtitle}</p>
              <button className="promo-cta">{deal.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
