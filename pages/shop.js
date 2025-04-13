// pages/shop.js
import { useEffect, useState } from 'react'
import SidebarLayout from '@/components/SidebarLayout'

export default function ShopPage() {
  const [gallery, setGallery] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedGallery = localStorage.getItem('gallery')
    if (storedGallery) {
      setGallery(JSON.parse(storedGallery))
    }

    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const handleAddToCart = (item) => {
    const updatedCart = [...cart, item]
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    alert('✅ เพิ่มสินค้าลงตะกร้าแล้ว!')
  }

  return (
    <SidebarLayout>
      <h1 style={{ padding: '1rem' }}>🛍️ Shop</h1>

      {gallery.filter((img) => img.available).length === 0 ? (
        <p style={{ padding: '1rem' }}>No available images at the moment.</p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem',
          justifyContent: 'center'
        }}>
          {gallery
            .filter((image) => image.available)
            .map((image, index) => (
              <div key={index} style={{
                width: '250px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                textAlign: 'center',
                backgroundColor: '#fff'
              }}>
                <img
                  src={`/images/${image.name}`}
                  alt={image.displayName}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem' }}>{image.displayName}</h3>
                  <p style={{ marginBottom: '1rem' }}>${image.price}</p>
                  <button
                    onClick={() => handleAddToCart(image)}
                    style={{
                      backgroundColor: '#2ecc71',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      color: 'white',
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
