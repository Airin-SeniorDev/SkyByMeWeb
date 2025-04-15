'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import SidebarLayout from '@/components/SidebarLayout'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        alert('⚠️ กรุณา Login ก่อนเข้าหน้านี้')
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe() // cleanup listener
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  if (loading) return null

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
