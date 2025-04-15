'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import SidebarLayout from '@/components/SidebarLayout'

const adminEmails = ['tmgamer13253@gmail.com'] // ใส่อีเมลแอดมินที่นี่

export default function GalleryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const [filename, setFilename] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])

  // 🔐 ตรวจสอบสิทธิ์ผู้ใช้
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && adminEmails.includes(user.email)) {
        setIsAdmin(true)
      } else {
        router.push('/') // redirect ถ้าไม่ใช่แอดมิน
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('gallery')
    if (stored) setImages(JSON.parse(stored))
  }, [])

  const saveImages = (imgs) => {
    setImages(imgs)
    localStorage.setItem('gallery', JSON.stringify(imgs))
  }

  const addImage = () => {
    if (!filename || !displayName || !price) return alert('กรอกข้อมูลให้ครบ')
    const newImage = { name: filename, displayName, price: parseInt(price), available: false }
    const updated = [...images, newImage]
    saveImages(updated)
    setFilename('')
    setDisplayName('')
    setPrice('')
  }

  const toggleAvailable = (index) => {
    const updated = [...images]
    updated[index].available = !updated[index].available
    saveImages(updated)
  }

  const deleteImage = (index) => {
    const updated = [...images]
    updated.splice(index, 1)
    saveImages(updated)
  }

  if (loading) return <p>Loading...</p>
  if (!isAdmin) return null

  return (
    <SidebarLayout>
      <h1 style={{ padding: '1rem' }}>📸 Gallery Management</h1>
      <div style={{ padding: '1rem' }}>
        <input value={filename} onChange={(e) => setFilename(e.target.value)} placeholder="Filename (e.g. sky1.jpg)" style={{ marginRight: 10 }} />
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name" style={{ marginRight: 10 }} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" style={{ marginRight: 10 }} />
        <button onClick={addImage} style={{ background: 'mediumseagreen', color: 'white', padding: '0.5rem 1rem' }}>Add Image</button>
      </div>
      <div style={{ padding: '1rem' }}>
        {images.length === 0 ? <p>No images added yet.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {images.map((img, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                📷 <strong>{img.displayName}</strong> ({img.name}) – ${img.price} –
                <button onClick={() => toggleAvailable(index)} style={{ marginLeft: 10 }}>
                  {img.available ? '🟢 Available' : '🔴 Unavailable'}
                </button>
                <button onClick={() => deleteImage(index)} style={{ marginLeft: 10, color: 'tomato' }}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SidebarLayout>
  )
}
