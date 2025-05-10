// components/SidebarLayout.js
'use client' // ✅ ระบุว่าเป็น Client Component เพราะใช้ useEffect, useState, Firebase

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

// ✅ รายชื่ออีเมลที่ถือว่าเป็นแอดมิน
const adminEmails = ['tmgamer13253@gmail.com']

export default function SidebarLayout({ children }) {
  const pathname = usePathname() // ✅ ตรวจสอบ path ปัจจุบัน (สำหรับไฮไลต์เมนู)
  const [isAdmin, setIsAdmin] = useState(false) // ✅ สถานะแอดมิน

  useEffect(() => {
    // ✅ เช็คผู้ใช้ที่ล็อกอินว่าคือแอดมินหรือไม่
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && adminEmails.includes(user.email)) {
        setIsAdmin(true) // ✅ ถ้าเป็นแอดมิน → แสดงเมนูพิเศษได้
      } else {
        setIsAdmin(false)
      }
    })

    return () => unsubscribe() // ✅ cleanup function
  }, [])

  // ✅ สไตล์ลิงก์เมนู
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* ✅ แถบบน (Header) */}
      <header style={{
        backgroundColor: '#2c3e50',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
          SkyByMe
        </div>

        {/* ✅ เมนูหลัก */}
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/" legacyBehavior>
            <a className={pathname === '/' ? 'active' : ''} style={linkStyle}>🏠 Home</a>
          </Link>
          <Link href="/shop" legacyBehavior>
            <a className={pathname === '/shop' ? 'active' : ''} style={linkStyle}>🛍️ Shop</a>
          </Link>

          {/* ✅ เมนูเฉพาะแอดมิน */}
          {isAdmin && (
            <Link href="/gallery" legacyBehavior>
              <a className={pathname === '/gallery' ? 'active' : ''} style={linkStyle}>🖼️ Gallery</a>
            </Link>
          )}

          <Link href="/favorites" legacyBehavior>
            <a className={pathname === '/favorites' ? 'active' : ''} style={linkStyle}>💜 Favorites</a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className={pathname === '/cart' ? 'active' : ''} style={linkStyle}>🛒 Cart</a>
          </Link>
          <Link href="/account" legacyBehavior>
            <a className={pathname === '/account' ? 'active' : ''} style={linkStyle}>👤 Account</a>
          </Link>
        </nav>
      </header>

      {/* ✅ พื้นที่แสดงเนื้อหา */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  )
}
