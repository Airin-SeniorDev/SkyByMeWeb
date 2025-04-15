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

  useEffect(() => {
    const storedGallery = localStorage.getItem('gallery')
    if (storedGallery) setImages(JSON.parse(storedGallery))

    // ✅ listen user login/logout
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

    const updatedCart = [...cart, item]
    setCart(updatedCart)
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart))
    alert(`✅ "${item.displayName}" added to cart`)
  }

  const toggleFavorite = (item) => {
    if (!user) return alert('กรุณา Login ก่อนเพิ่มรายการโปรด')

    const isFav = favorites.find((fav) => fav.name === item.name)
    let updatedFav

    if (isFav) {
      updatedFav = favorites.filter((fav) => fav.name !== item.name)
    } else {
      updatedFav = [...favorites, item]
    }

    setFavorites(updatedFav)
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updatedFav))
  }

  const isFavorite = (name) => favorites.some((fav) => fav.name === name)

  return (
    <SidebarLayout>
      <section className="shop" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>🛍️ Shop</h1>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {images.map((item, i) => (
            <div
              key={i}
              style={{
                width: '250px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                background: '#fff',
              }}
            >
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
                  style={{
                    marginTop: '10px',
                    background: '#2ecc71',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SidebarLayout>
  )
}
