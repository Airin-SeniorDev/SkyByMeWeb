// components/Navbar.js
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaImages, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Shop', path: '/shop', icon: <FaShoppingCart /> },
    { name: 'Gallery', path: '/gallery', icon: <FaImages /> },
    { name: 'Favorites', path: '/favorites', icon: <FaHeart /> },
    { name: 'Account', path: '/account', icon: <FaUser /> },
  ]

  return (
    <nav style={{ backgroundColor: '#2c3e50', padding: '1rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ color: 'white', fontSize: '1.5rem', marginRight: '2rem' }}>SkyByMe</h1>
        <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: pathname === item.path ? '#f1c40f' : 'white',
                    textDecoration: 'none',
                    fontWeight: pathname === item.path ? 'bold' : 'normal',
                  }}
                >
                  {item.icon} <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
