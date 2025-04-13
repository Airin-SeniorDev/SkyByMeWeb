// pages/cart.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SidebarLayout from '@/components/SidebarLayout'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const router = useRouter()

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  const removeItem = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const confirmOrder = () => {
    localStorage.removeItem('cart')
    router.push('/thank-you')
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <SidebarLayout>
      <h1 style={{ padding: '1rem' }}>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p style={{ padding: '1rem' }}>Your cart is empty.</p>
      ) : (
        <>
          <button
            onClick={clearCart}
            style={{
              margin: '0 1rem 1rem 1rem',
              backgroundColor: 'tomato',
              padding: '0.5rem 1rem',
              border: 'none',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            Clear Cart
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '0 1rem' }}>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: '1 0 300px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1rem' }}>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      backgroundColor: 'tomato',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '5px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>
            Total: ${total}
          </div>

          <div style={{ padding: '0 1rem 2rem 1rem' }}>
            <button
              onClick={confirmOrder}
              style={{
                width: '100%',
                backgroundColor: 'mediumseagreen',
                padding: '1rem',
                color: 'white',
                border: 'none',
                fontSize: '1rem',
                borderRadius: '8px'
              }}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}
