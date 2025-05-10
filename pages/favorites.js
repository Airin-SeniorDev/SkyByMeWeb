// pages/favorites.js
'use client' 
// ✅ ระบุว่าเป็น Client Component เพราะใช้ useEffect, useState, localStorage, Firebase Auth

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import SidebarLayout from '@/components/SidebarLayout'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]) // ✅ รายการ favorite ของผู้ใช้
  const [user, setUser] = useState(null) // ✅ เก็บข้อมูล user ที่ login

  useEffect(() => {
    // ✅ เมื่อผู้ใช้ login / logout → ตรวจสอบสิทธิ์
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        // ✅ ดึง favorites และ gallery จาก localStorage
        const storedFavorites = localStorage.getItem(`favorites_${currentUser.uid}`)
        const storedGallery = localStorage.getItem('gallery')

        if (storedFavorites && storedGallery) {
          const favs = JSON.parse(storedFavorites)
          const gallery = JSON.parse(storedGallery)

          // ✅ Sync availability จาก gallery ไปยัง favorite
          const merged = favs.map(fav => {
            const match = gallery.find(g => g.name === fav.name)
            return match ? { ...fav, available: match.available } : fav
          })

          setFavorites(merged)
        }
      }
    })

    return () => unsubscribe() // ✅ cleanup เมื่อ component ถูก unmount
  }, [])

  // ✅ ลบรายการโปรด
  const removeFromFavorites = (name) => {
    if (!user) return
    const updated = favorites.filter(item => item.name !== name)
    setFavorites(updated)
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updated))
  }

  // ✅ เพิ่มรายการโปรดเข้า cart
  const addToCart = (item) => {
    if (!user) return alert('กรุณา Login ก่อนเพิ่มสินค้าในตะกร้า')
    if (!item.available) return // ✅ ห้ามเพิ่มถ้าของหมด

    const stored = localStorage.getItem(`cart_${user.uid}`)
    const cart = stored ? JSON.parse(stored) : []
    const updatedCart = [...cart, item]
    localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart))
    alert(`✅ "${item.displayName}" added to cart`)
  }

  return (
    <SidebarLayout>
      <section className="favorites" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>💜 Your Favorites</h1>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {/* ✅ ถ้ายังไม่มี favorite */}
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            favorites.map((item, i) => (
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
                {/* ✅ ป้าย Out of Stock ถ้าไม่พร้อมขาย */}
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

                {/* ✅ รูปภาพสินค้า */}
                <img
                  src={`/images/${item.name}`}
                  alt={item.displayName}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                  }}
                  onError={(e) => { e.target.src = '/images/default.jpg' }} // ✅ fallback ถ้ารูปไม่โหลด
                />

                {/* ✅ เนื้อหาด้านล่าง: ชื่อ, ราคา, ปุ่ม */}
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <h3>{item.displayName}</h3>
                  <p>${item.price}</p>

                  {/* ✅ ปุ่มเพิ่มลง cart */}
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
                      width: '100%',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.available ? 'Add to cart' : 'Unavailable'}
                  </button>

                  {/* ✅ ปุ่มลบจาก favorites */}
                  <button
                    onClick={() => removeFromFavorites(item.name)}
                    style={{
                      marginTop: '10px',
                      background: '#ff6b6b',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      width: '100%',
                      fontWeight: 'bold',
                    }}
                  >
                    Remove 💖
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </SidebarLayout>
  )
}
