// pages/favorites.js
import { useEffect, useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromFavorites = (item) => {
    const updated = favorites.filter((f) => f.name !== item.name);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('✅ Added to cart!');
  };

  return (
    <SidebarLayout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>💜 Your Favorites</h1>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {favorites.map((item, index) => (
            <div
              key={index}
              style={{
                background: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                width: '250px',
                overflow: 'hidden',
              }}
            >
              <img
                src={`/images/${item.name}`}
                alt={item.displayName}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.displayName}</h2>
                <p style={{ margin: '0.5rem 0' }}>${item.price}</p>
                <button
                  style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}
                  onClick={() => addToCart(item)}
                >
                  Add to cart
                </button>
                <button
                  style={{ background: '#ff6b6b', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}
                  onClick={() => removeFromFavorites(item)}
                >
                  Remove 💖
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}