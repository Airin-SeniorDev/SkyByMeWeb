'use client' // ✅ บอก Next.js ว่านี่คือ Client Component (จำเป็นเมื่อใช้ useState/useEffect)

import Link from 'next/link' // ✅ ใช้สำหรับลิงก์ภายในเว็บ (แทน <a href="...">)
import { usePathname } from 'next/navigation' // ✅ ใช้เพื่อดึง path ของหน้าปัจจุบัน เช่น '/shop'
import { useEffect, useState } from 'react' // ✅ ใช้ React Hook: useState และ useEffect
import { onAuthStateChanged } from 'firebase/auth' // ✅ ใช้ตรวจสอบการเปลี่ยนแปลงสถานะการล็อกอิน
import { auth } from '@/lib/firebase' // ✅ นำเข้า object `auth` ที่ตั้งค่าจาก Firebase

// ✅ รายชื่ออีเมลที่ถือว่าเป็นแอดมิน → สามารถเพิ่มหลายคนได้
const adminEmails = ['tmgamer13253@gmail.com']

export function Navbar() {
  const pathname = usePathname() // ✅ ได้ path ปัจจุบัน เช่น '/cart' ใช้เพื่อเช็คไฮไลต์ปุ่ม
  const [isAdmin, setIsAdmin] = useState(false) // ✅ สร้าง state เพื่อเก็บว่าผู้ใช้คือแอดมินหรือไม่

  useEffect(() => {
    // ✅ เช็คว่าเมื่อไหร่ก็ตามที่ user login/logout
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // ✅ ถ้ามี user และอีเมลของเขาอยู่ใน adminEmails → ถือว่าเป็นแอดมิน
      if (user && adminEmails.includes(user.email)) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    })

    // ✅ cleanup เมื่อ component นี้ถูกถอดออก
    return () => unsubscribe()
  }, [])

  return (
    <nav className="navbar">
      {/* ✅ ปุ่ม Home — จะเพิ่ม class 'active' ถ้าอยู่ที่ path '/' */}
      <Link href="/" className={pathname === '/' ? 'active' : ''}>🏠 Home</Link>

      {/* ✅ ปุ่ม Shop */}
      <Link href="/shop" className={pathname === '/shop' ? 'active' : ''}>🛍️ Shop</Link>

      {/* ✅ ปุ่ม Gallery จะโชว์เฉพาะเมื่อเป็นแอดมิน */}
      {isAdmin && (
        <Link href="/gallery" className={pathname === '/gallery' ? 'active' : ''}>🖼️ Gallery</Link>
      )}

      {/* ✅ ปุ่ม Favorites */}
      <Link href="/favorites" className={pathname === '/favorites' ? 'active' : ''}>💜 Favorites</Link>

      {/* ✅ ปุ่ม Cart */}
      <Link href="/cart" className={pathname === '/cart' ? 'active' : ''}>🛒 Cart</Link>

      {/* ✅ ปุ่ม Account */}
      <Link href="/account" className={pathname === '/account' ? 'active' : ''}>👤 Account</Link>
    </nav>
  )
}
