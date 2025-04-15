'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (!user) {
      alert('⚠️ กรุณา Login ก่อนเข้าหน้านี้')
      router.push('/login')
    } else {
      setIsChecked(true)
    }
  }, [router])

  if (!isChecked) return null // ⏳ ไม่แสดงอะไรระหว่างเช็ค

  return children
}
