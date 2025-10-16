import React, { useMemo, useState } from 'react';
import SectionTitle from './ui/SectionTitle';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  image: string;
  short: string;
  specs: Record<string, string>;
  inStock: boolean;
};

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Xperia Pro Max',
    brand: 'Sony',
    price: 799,
    image: '/src/assets/xPeriaProMax.webp',
    short: 'Large screen, excellent camera, long battery life.',
    specs: { 'Screen': '6.7" OLED', 'RAM': '8 GB', 'Storage': '256 GB', 'Battery': '5000 mAh' },
    inStock: true,
  },
  {
    id: 2,
    title: 'Galaxy Nova',
    brand: 'Samsung',
    price: 599,
    image: '/src/assets/GalaxyNova.jpg',
    short: 'Powerful processor, great display for media.',
    specs: { 'Screen': '6.4" AMOLED', 'RAM': '6 GB', 'Storage': '128 GB', 'Battery': '4300 mAh' },
    inStock: true,
  },
  {
    id: 3,
    title: 'Pixel Lite',
    brand: 'Google',
    price: 349,
    image: '/src/assets/Pixel.webp',
    short: 'Clean Android experience, fast updates.',
    specs: { 'Screen': '6.1" LCD', 'RAM': '4 GB', 'Storage': '64 GB', 'Battery': '3100 mAh' },
    inStock: false,
  },
  {
    id: 4,
    title: 'OnePlus Swift',
    brand: 'OnePlus',
    price: 449,
    image: '/src/assets/OnePlus.webp',
    short: 'Fast charging, smooth performance.',
    specs: { 'Screen': '6.5" Fluid', 'RAM': '8 GB', 'Storage': '128 GB', 'Battery': '4500 mAh' },
    inStock: true,
  },
];

const priceRanges = {
  ALL: 'All',
  UNDER_300: 'Under $300',
  BETWEEN_300_600: '$300 - $600',
  ABOVE_600: 'Above $600',
} as const;

const Stock: React.FC = () => {
  const [brandFilter, setBrandFilter] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<string>(priceRanges.ALL);
  const [query, setQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { user } = useAuth();

  const brands = useMemo(() => {
    const set = new Set<string>(mockProducts.map(p => p.brand));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return mockProducts.filter(p => {
      if (brandFilter !== 'All' && p.brand !== brandFilter) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.short.toLowerCase().includes(query.toLowerCase())) return false;
      switch (priceFilter) {
        case priceRanges.UNDER_300: return p.price < 300;
        case priceRanges.BETWEEN_300_600: return p.price >= 300 && p.price <= 600;
        case priceRanges.ABOVE_600: return p.price > 600;
        default: return true;
      }
    });
  }, [brandFilter, priceFilter, query]);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleBuy = (product: Product) => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    // Placeholder: user is logged in — proceed to buy
    const ok = window.confirm(`Buy ${product.title} for $${product.price}?`);
    if (ok) {
      console.log('Buy confirmed for product', product, 'by', user.email);
      alert(`Thanks ${user.name || user.email}! Your purchase has been made, it will arrive in two days.`);
    }
  };

  return (
    <section id="stock" className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="Stock" subtitle="Browse available phones" />

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Brand</label>
            <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price</label>
            <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">
              {Object.values(priceRanges).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="flex-1">
            <input placeholder="Search phones..." value={query} onChange={e => setQuery(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map(product => {
            const expanded = expandedId === product.id;
            return (
              <article key={product.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <button onClick={() => toggleExpand(product.id)} className="w-full text-left">
                  <div className="relative h-56 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <img src={product.image} alt={product.title} className="max-h-full object-contain" />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{product.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{product.brand}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">${product.price}</div>
                        <div className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>{product.inStock ? 'In stock' : 'Out of stock'}</div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{product.short}</p>
                  </div>
                </button>

                {/* Expanded area */}
                <div className={`${expanded ? 'max-h-96 py-4' : 'max-h-0'} overflow-hidden transition-all duration-300 border-t border-slate-100 dark:border-slate-700 px-4`}>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="font-medium">{k}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button onClick={() => handleBuy(product)} disabled={!product.inStock} className={`px-4 py-2 rounded-md font-medium ${product.inStock ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-300 text-slate-600 cursor-not-allowed'}`}>
                      Buy
                    </button>
                    <div className="text-sm text-slate-500 dark:text-slate-400">SKU: {product.id}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onRegisterOpen={() => { setLoginOpen(false); setRegisterOpen(true); }} />
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </section>
  );
};

export default Stock;