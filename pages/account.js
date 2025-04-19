// pages/account.js
'use client' 
// ✅ บอก Next.js ว่า component นี้ทำงานฝั่ง client (เพราะใช้ useState/useEffect)

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import SidebarLayout from '@/components/SidebarLayout'
// ✅ นำเข้า SidebarLayout เพื่อครอบเนื้อหาให้มี Navbar

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState(null) // ✅ เก็บข้อมูลผู้ใช้ที่ login
  const [loading, setLoading] = useState(true) // ✅ ระหว่างเช็คสถานะผู้ใช้

  useEffect(() => {
    // ✅ ตรวจสอบว่า login อยู่หรือไม่
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser) // ✅ ถ้า login แล้ว → เก็บข้อมูล user
      } else {
        alert('⚠️ กรุณา Login ก่อนเข้าหน้านี้')
        router.push('/login') // ❌ ถ้าไม่ได้ login → redirect ไปหน้า login
      }
      setLoading(false) // ✅ หยุดโหลด
    })

    return () => unsubscribe() // ✅ cleanup listener เวลาออกจากหน้านี้
  }, [router])

  const handleLogout = async () => {
    await signOut(auth) // ✅ ล็อกเอาท์ด้วย Firebase
    router.push('/login') // 🔁 ส่งกลับหน้า login หลัง logout
  }

  if (loading) return null // ⏳ ซ่อนหน้าระหว่างโหลด

  return (
    <SidebarLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <div style={{
          background: '#fff',
          padding: '3rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>👋 Welcome,</h1>

          <p style={{ fontSize: '1rem', color: '#555', marginBottom: '2rem' }}>
            {user?.email || 'No Email'}<br />
            You are logged in to your account.
          </p>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#2ecc71',
              border: 'none',
              color: '#fff',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%',
            }}
          >
            🔓 Logout
          </button>
        </div>
      </div>
    </SidebarLayout>
  )
}
