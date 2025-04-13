// components/SidebarLayout.js
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SidebarLayout({ children }) {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCartCount(JSON.parse(storedCart).length)
      }
    }
  }, [])

  return (
    <div>
      <nav style={{
        width: '100%',
        backgroundColor: '#2c3e50',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 2rem',
        color: 'white',
        fontSize: '1.1rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: '60px',
        boxSizing: 'border-box'
      }}>
        {/* Logo and Site Name on Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/images/Sky By Me.png" alt="logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>SkyByMe</span>
        </div>

        {/* Icons/Links on Right */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Home</Link>
          <Link href="/gallery" style={{ color: 'white', textDecoration: 'none' }}>🖼️ Gallery</Link>
          <Link href="/account" style={{ color: 'white', textDecoration: 'none' }}>👤 Account</Link>
          <Link href="/cart" style={{ color: 'white', textDecoration: 'none' }}>🛒 Cart ({cartCount})</Link>
        </div>
      </nav>

      <main style={{ paddingTop: '1rem' }}>
        {children}
      </main>
    </div>
  )
}

// ✅ ใช้ layout นี้กับหน้าหลักทั้งหมด:
// pages/index.js
// pages/gallery.js
// pages/account.js
// pages/cart.js
// pages/thank-you.js