// pages/cart.js
'use client' 
// ✅ Client Component เพราะใช้ useState, useEffect และ localStorage

import { useEffect, useState } from 'react'
import SidebarLayout from '@/components/SidebarLayout'
import { auth } from '@/lib/firebase'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const user = auth.currentUser // ✅ ดึงข้อมูล user จาก Firebase ที่ login อยู่

  // ✅ ซิงค์ข้อมูล availability จาก gallery เข้า cart (กรณีมีสินค้าไม่พร้อมขาย)
  useEffect(() => {
    if (!user) return

    const stored = localStorage.getItem(`cart_${user.uid}`)
    const storedGallery = localStorage.getItem('gallery')

    if (stored) {
      let cartItems = JSON.parse(stored)

      // ✅ เช็คสินค้าใน cart ว่ายัง available อยู่มั้ย
      if (storedGallery) {
        const gallery = JSON.parse(storedGallery)
        cartItems = cartItems.map((item) => {
          const match = gallery.find((g) => g.name === item.name)
          return match ? { ...item, available: match.available } : item
        })
      }

      setCart(cartItems)
    }
  }, [user])

  // ✅ ลบสินค้ารายตัว
  const removeItem = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(newCart))
  }

  // ✅ ล้าง cart ทั้งหมด
  const clearCart = () => {
    setCart([])
    localStorage.removeItem(`cart_${user.uid}`)
  }

  // ✅ กดยืนยันคำสั่งซื้อ
  const confirmOrder = () => {
    localStorage.removeItem(`cart_${user.uid}`)
    setCart([])
    alert('✅ Order placed!')
    window.location.href = '/thank-you' // ✅ ไปหน้าขอบคุณหลังสั่งซื้อ
  }

  // ✅ คำนวณราคารวม (ไม่รวมสินค้าที่ไม่พร้อมขาย)
  const total = cart.reduce((sum, item) => {
    const isUnavailable = item.available === false && !item.alwaysAvailable
    return isUnavailable ? sum : sum + item.price
  }, 0)

  return (
    <SidebarLayout>
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>🛒 Your Cart</h1>

        {/* ✅ ถ้า cart ว่าง */}
        {cart.length === 0 ? (
          <p style={{ fontSize: '1.1rem', color: '#888' }}>🔒 Your cart is empty.</p>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {/* ✅ พื้นที่รายการสินค้า */}
            <div style={{ flex: 2 }}>
              {cart.map((item, index) => {
                const isUnavailable = item.available === false && !item.alwaysAvailable

                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      background: isUnavailable ? '#ffe5e5' : '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      overflow: 'hidden',
                      opacity: isUnavailable ? 0.5 : 1
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={`/images/${item.name}`} // ✅ แสดงภาพจาก public/images
                        alt={item.displayName}
                        style={{
                          width: '250px',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '12px 0 0 12px',
                        }}
                      />
                      {/* ✅ ป้าย Out of Stock */}
                      {isUnavailable && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'red',
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem'
                        }}>
                          Out of Stock
                        </div>
                      )}
                    </div>
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
                )
              })}

              {/* ✅ ปุ่มล้าง cart */}
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

            {/* ✅ สรุปคำสั่งซื้อ */}
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
                disabled={total === 0}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  backgroundColor: total === 0 ? '#ccc' : '#2ecc71',
                  color: '#fff',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: total === 0 ? 'not-allowed' : 'pointer',
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
