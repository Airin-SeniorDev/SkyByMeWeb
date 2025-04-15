'use client'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import SidebarLayout from '@/components/SidebarLayout'

export default function Shop() {
  const [images, setImages] = useState([])
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(null)
  const [priceFilter, setPriceFilter] = useState('all') // ✅ ช่วงราคา

  useEffect(() => {
    const storedGallery = localStorage.getItem('gallery')
    if (storedGallery) setImages(JSON.parse(storedGallery))

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        const storedCart = localStorage.getItem(`cart_${currentUser.uid}`)
        const storedFav = localStorage.getItem(`favorites_${currentUser.uid}`)

        if (storedCart) setCart(JSON.parse(storedCart))
        if (storedFav) setFavorites(JSON.parse(storedFav))
      }
    })

    return () => unsubscribe()
  }, [])

  const addToCart = (item) => {
    if (!user) return alert('กรุณา Login ก่อนเพิ่มสินค้าในตะกร้า')
    if (!item.available) return

    const updatedCart = [...cart, item]
    setCart(updatedCart)
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart))
    alert(`✅ "${item.displayName}" added to cart`)
  }

  const toggleFavorite = (item) => {
    if (!user) return alert('กรุณา Login ก่อนเพิ่มรายการโปรด')

    const isFav = favorites.find((fav) => fav.name === item.name)
    let updatedFav = isFav
      ? favorites.filter((fav) => fav.name !== item.name)
      : [...favorites, item]

    setFavorites(updatedFav)
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updatedFav))
  }

  const isFavorite = (name) => favorites.some((fav) => fav.name === name)

  const filteredImages = images.filter((item) => {
    if (priceFilter === 'low') return item.price < 20
    if (priceFilter === 'mid') return item.price >= 20 && item.price <= 39
    if (priceFilter === 'high') return item.price >= 40
    return true // 'all'
  })

  return (
    <SidebarLayout>
      <section className="shop" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>🛍️ Shop</h1>

        {/* ✅ กรองตามช่วงราคา */}
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          style={{
            padding: '0.5rem',
            margin: '1rem 0',
            width: '100%',
            maxWidth: '300px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <option value="all">📷 แสดงทั้งหมด</option>
          <option value="low">💰 ต่ำกว่า 20</option>
          <option value="mid">💸 20 - 39</option>
          <option value="high">💎 40 ขึ้นไป</option>
        </select>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '1rem',
          }}
        >
          {filteredImages.map((item, i) => (
            <div
              key={i}
              style={{
                width: '250px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                background: '#fff',
                opacity: item.available ? 1 : 0.5,
                position: 'relative',
              }}
            >
              {!item.available && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'red',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    zIndex: 2,
                  }}
                >
                  Out of Stock
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <img
                  src={`/images/${item.name}`}
                  alt={item.displayName}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div
                  onClick={() => toggleFavorite(item)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                  }}
                >
                  {isFavorite(item.name) ? '💜' : '🤍'}
                </div>
              </div>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <h3>{item.displayName}</h3>
                <p>${item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.available}
                  style={{
                    marginTop: '10px',
                    background: item.available ? '#2ecc71' : '#ccc',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: item.available ? 'pointer' : 'not-allowed',
                  }}
                >
                  {item.available ? 'Add to cart' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SidebarLayout>
  )
}
