'use client'
import { useEffect, useState } from 'react'
import SidebarLayout from '@/components/SidebarLayout'
import { auth } from '@/lib/firebase'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      const uid = user.uid
      const stored = localStorage.getItem(`cart_${uid}`)
      if (stored) setCart(JSON.parse(stored))
    }
  }, [user])

  const removeItem = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(newCart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem(`cart_${user.uid}`)
  }

  const confirmOrder = () => {
  localStorage.removeItem(`cart_${user.uid}`)
  setCart([])
  alert('✅ Order placed!')
  window.location.href = '/thank-you' // ✅ redirect ไปหน้า thank-you
}


  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <SidebarLayout>
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>🛒 Your Cart</h1>
        {cart.length === 0 ? (
          <p style={{ fontSize: '1.1rem', color: '#888' }}>🔒 Your cart is empty.</p>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 2 }}>
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`/images/${item.name}`}
                    alt={item.displayName}
                    style={{
                      width: '250px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '12px 0 0 12px',
                    }}
                  />
                  <div style={{ flex: 1, padding: '1rem' }}>
                    <h3 style={{ margin: 0 }}>{item.displayName}</h3>
                    <p style={{ margin: '0.5rem 0' }}>${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      background: '#ff6b6b',
                      border: 'none',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0 12px 12px 0',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      height: '100%',
                    }}
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}
              <button
                onClick={clearCart}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🧹 Clear Cart
              </button>
            </div>

            <div
              style={{
                flex: 1,
                background: '#f8f8f8',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                height: 'fit-content',
              }}
            >
              <h2>Order Summary</h2>
              <p style={{ margin: '1rem 0' }}>Subtotal: <strong>${total}</strong></p>
              <p>Shipping: <strong>Free</strong></p>
              <div style={{ margin: '1.5rem 0' }}>
                <input
                  type="text"
                  placeholder="Add coupon code"
                  style={{
                    padding: '0.5rem',
                    width: '100%',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    marginBottom: '1rem',
                  }}
                />
              </div>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total: ${total}</p>
              <button
                onClick={confirmOrder}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  backgroundColor: '#2ecc71',
                  color: '#fff',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                ✅ Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  )
}
