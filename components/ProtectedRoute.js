'use client' // ✅ บอก Next.js ว่านี่คือ Client Component (จำเป็นสำหรับการใช้ useEffect, localStorage, router)

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation' // ✅ ใช้เปลี่ยนหน้าแบบ client-side ใน Next.js 13+

// ✅ Component นี้จะใช้ครอบหน้าอื่น ๆ ที่ต้อง Login เท่านั้นถึงจะเข้าถึงได้
export default function ProtectedRoute({ children }) {
  const router = useRouter() // ✅ ใช้สำหรับเปลี่ยนเส้นทาง เช่น router.push('/login')
  const [isChecked, setIsChecked] = useState(false) // ✅ สถานะเช็คว่าเช็คเสร็จหรือยัง (เพื่อป้องกันแสดงเนื้อหาก่อนเวลา)

  useEffect(() => {
    const user = localStorage.getItem('user') // ✅ ลองดึงข้อมูล user จาก localStorage

    if (!user) {
      // ✅ ถ้าไม่มี user → ยังไม่ได้ login
      alert('⚠️ กรุณา Login ก่อนเข้าหน้านี้') // แสดงแจ้งเตือน
      router.push('/login') // ส่งผู้ใช้กลับไปหน้า login
    } else {
      setIsChecked(true) // ✅ ถ้ามี user → ผ่านการตรวจสอบ
    }
  }, [router]) // ✅ รัน useEffect นี้แค่รอบเดียวหลังโหลด (เพราะ router คงที่)

  // ✅ ระหว่างที่ยังเช็คอยู่ → ไม่แสดงอะไรเลย (ป้องกันการแสดงเนื้อหาก่อนเวลา)
  if (!isChecked) return null

  // ✅ ถ้าเช็คผ่านแล้ว → แสดง children ที่ถูกครอบอยู่ภายใน component นี้
  return children
}
