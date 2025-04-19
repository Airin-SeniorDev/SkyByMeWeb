// pages/index.js
'use client'
// ✅ ใช้ใน Client เพราะมี useState, useEffect, localStorage, auth

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import SidebarLayout from '@/components/SidebarLayout'

export default function Home() {
  const [cart, setCart] = useState([]) // ✅ เก็บข้อมูลตะกร้า
  const [user, setUser] = useState(null) // ✅ ผู้ใช้ที่ล็อกอิน

  // ✅ ดึงข้อมูลตะกร้าจาก localStorage หาก user login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        const stored = localStorage.getItem(`cart_${currentUser.uid}`)
        if (stored) setCart(JSON.parse(stored))
      }
    })

    return () => unsubscribe()
  }, [])

  // ✅ ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  const addToCart = (item) => {
    if (!user) {
      alert('กรุณา Login ก่อนเพิ่มสินค้าในตะกร้า')
      return
    }

    const updatedCart = [...cart, item]
    setCart(updatedCart)
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart))
    alert('✅ เพิ่มสินค้าในตะกร้าแล้ว!')
  }

  return (
    <SidebarLayout>
      <Head>
        <title>SkyByMe | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* 🔷 Hero Section */}
      <section
        style={{
          backgroundImage: "url('/images/LINE_ALBUM_Sky_230103_17.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '6rem 2rem',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '700px',
          margin: 'auto',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Sky Picture</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            I like to look at the sky — day or night.<br />
            The sky is my companion whenever I travel.<br />
            Wherever you go, go together.
          </p>
          <a href="/shop" style={{
            marginTop: '1.5rem',
            display: 'inline-block',
            background: '#2ecc71',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: '#fff',
            textDecoration: 'none'
          }}>
            🛍️ Shop Now
          </a>
        </div>
      </section>

      {/* 🔷 About Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>🌤️ About Us</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/images/Sky By Me.png" alt="SkyByMe Logo" style={{ width: '250px' }} />
          <div style={{ maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Why choose us?</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Some days are bright like the clear sky.<br />
              Some are gloomy with clouds.<br /><br />
              Even if we can’t control the sky, we can choose how we live.
            </p>
          </div>
        </div>
      </section>

      {/* 🔷 Featured Products */}
      <section style={{ padding: '4rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>🖼️ Featured Photos</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { name: 'LINE_ALBUM_Sky_230103_10.jpg', displayName: 'Moon Sky', price: 10 },
            { name: 'LINE_ALBUM_Sky_230103_22.jpg', displayName: 'Sunset Over Field', price: 39 },
            { name: 'LINE_ALBUM_Sky_230103_13.jpg', displayName: 'Golden Light', price: 49 },
            { name: 'LINE_ALBUM_Sky_230103_14.jpg', displayName: 'Cloud Drama', price: 39 },
          ].map((item, i) => (
            <div key={i} style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              background: '#fff'
            }}>
              <img src={`/images/${item.name}`} alt={item.displayName} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <h4>{item.displayName}</h4>
                <p>${item.price}</p>
                <button onClick={() => addToCart(item)} style={{
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔷 Contact */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>📬 Contact Us</h2>
        <form style={{
          maxWidth: '600px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <input type="text" placeholder="Name" style={inputStyle} />
          <input type="email" placeholder="Email" style={inputStyle} />
          <input type="text" placeholder="Phone" style={inputStyle} />
          <textarea placeholder="Message" style={{ ...inputStyle, height: '120px' }} />
          <button type="submit" style={{
            backgroundColor: '#2c3e50',
            color: '#fff',
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Send Message
          </button>
        </form>
      </section>

      {/* 🔷 Footer */}
      <footer style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '2rem 1rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3>Links</h3>
            <a href="#" style={footerLink}>My Account</a>
          </div>
          <div>
            <h3>Contact</h3>
            <p>095-118-9473</p>
            <p>t.kongbunpring@gmail.com</p>
            <a href="https://www.instagram.com/nxic_ky/" style={footerLink}>Instagram</a>
          </div>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', textAlign: 'center' }}>
          © 2025 SkyByMe | Created by Tangpanitan Khongbunpring
        </p>
      </footer>
    </SidebarLayout>
  )
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem'
}

const footerLink = {
  color: '#2ecc71',
  textDecoration: 'none',
  display: 'block',
  marginTop: '0.5rem'
}
