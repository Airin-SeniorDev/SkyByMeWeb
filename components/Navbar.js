'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const adminEmails = ['tmgamer13253@gmail.com'] // ✅ เปลี่ยนเป็นอีเมลแอดมิน

export function Navbar() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && adminEmails.includes(user.email)) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <nav className="navbar">
      <Link href="/" className={pathname === '/' ? 'active' : ''}>🏠 Home</Link>
      <Link href="/shop" className={pathname === '/shop' ? 'active' : ''}>🛍️ Shop</Link>
      {/* ✅ แสดงเฉพาะเมื่อเป็น admin */}
      {isAdmin && (
        <Link href="/gallery" className={pathname === '/gallery' ? 'active' : ''}>🖼️ Gallery</Link>
      )}
      <Link href="/favorites" className={pathname === '/favorites' ? 'active' : ''}>💜 Favorites</Link>
      <Link href="/cart" className={pathname === '/cart' ? 'active' : ''}>🛒 Cart</Link>
      <Link href="/account" className={pathname === '/account' ? 'active' : ''}>👤 Account</Link>
    </nav>
  )
}
