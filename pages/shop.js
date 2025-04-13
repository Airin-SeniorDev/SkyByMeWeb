// pages/shop.js
import { useEffect, useState } from 'react'
import SidebarLayout from '@/components/SidebarLayout'

export default function ShopPage() {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('gallery')
    if (stored) {
      const all = JSON.parse(stored)
      const available = all.filter((img) => img.available)
      setItems(available)
    }

    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  const addToCart = (item) => {
    const updated = [...cart, item]
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    alert('✅ เพิ่มสินค้าแล้ว!')
  }

  return (
    <SidebarLayout>
      <h1 style={{ padding: '1rem' }}>🛍️ Shop</h1>

      {items.length === 0 ? (
        <p style={{ padding: '1rem' }}>No available images at the moment.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem'
          }}
        >
          {items.map((img, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 0 200px',
                border: '1px solid #ccc',
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={`/images/${img.name}`}
                alt={img.displayName}
                style={{ width: '100%', height: 150, objectFit: 'cover' }}
              />
              <div style={{ padding: '0.75rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>{img.displayName}</h4>
                <p style={{ fontWeight: 'bold' }}>${img.price}</p>
                <button
                  onClick={() => addToCart(img)}
                  style={{
                    backgroundColor: 'mediumseagreen',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  )
}
