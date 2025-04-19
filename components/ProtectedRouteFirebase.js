// components/ProtectedRouteFirebase.js
'use client' // ✅ ระบุว่าเป็น Client Component เพื่อใช้ useEffect, useState, router ได้

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ProtectedRouteFirebase({ children }) {
  const router = useRouter() // ✅ ใช้เปลี่ยนหน้า เช่น router.push('/login')
  const [loading, setLoading] = useState(true) // ✅ รอเช็คสถานะ login
  const [user, setUser] = useState(null) // ✅ เก็บข้อมูลผู้ใช้หลัง login

  useEffect(() => {
    // ✅ รันครั้งเดียวเมื่อ component โหลด
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // ❌ ถ้าไม่มีผู้ใช้ → ยังไม่ได้ login
        alert('⚠️ กรุณา Login ก่อนเข้าหน้านี้')
        router.push('/login') // 🔁 ส่งกลับหน้า login
      } else {
        // ✅ ถ้า login แล้ว → เซ็ตข้อมูล user
        setUser(currentUser)
      }
      setLoading(false) // ✅ หยุดโหลด
    })

    return () => unsubscribe() // ✅ cleanup เมื่อ component ถูกถอด
  }, [router])

  if (loading) return null // ⏳ ระหว่างรอตรวจสอบ → ซ่อนเนื้อหาทั้งหมด

  return children // ✅ ถ้า login แล้ว → แสดงเนื้อหาภายใน
}
