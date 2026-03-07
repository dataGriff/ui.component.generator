import { useState } from 'react';
import { brands } from '../brands';

export default function BrandSelector({ selectedBrandId, onSelectBrand }) {
  const [open, setOpen] = useState(false);
  const selected = brands.find((b) => b.id === selectedBrandId) || brands[0];

  return (
    <div className="brand-selector">
      <button className="brand-selector__trigger" onClick={() => setOpen(!open)}>
        <span className="brand-selector__dot" style={{ background: selected.colors.primary }} />
        <span className="brand-selector__name">{selected.name}</span>
        <svg className={`brand-selector__caret ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="brand-selector__dropdown">
          {brands.map((brand) => (
            <button
              key={brand.id}
              className={`brand-selector__option ${brand.id === selectedBrandId ? 'active' : ''}`}
              onClick={() => { onSelectBrand(brand.id); setOpen(false); }}
            >
              <span className="brand-selector__dot" style={{ background: brand.colors.primary }} />
              <div className="brand-selector__option-info">
                <strong>{brand.name}</strong>
                <small>{brand.description}</small>
              </div>
              {brand.id === selectedBrandId && (
                <svg className="brand-selector__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
