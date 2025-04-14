// components/SidebarLayout.js
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarLayout({ children }) {
  const pathname = usePathname()

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2c3e50', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>SkyByMe</div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/" legacyBehavior>
            <a className={pathname === '/' ? 'active' : ''} style={linkStyle}>🏠 Home</a>
          </Link>
          <Link href="/shop" legacyBehavior>
            <a className={pathname === '/shop' ? 'active' : ''} style={linkStyle}>🛍️ Shop</a>
          </Link>
          <Link href="/gallery" legacyBehavior>
            <a className={pathname === '/gallery' ? 'active' : ''} style={linkStyle}>🖼️ Gallery</a>
          </Link>
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
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  )
}
