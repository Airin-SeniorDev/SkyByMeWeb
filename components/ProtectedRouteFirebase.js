// components/ProtectedRouteFirebase.js
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ProtectedRouteFirebase({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        alert('⚠️ กรุณา Login ก่อนเข้าหน้านี้')
        router.push('/login')
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) return null

  return children
}
