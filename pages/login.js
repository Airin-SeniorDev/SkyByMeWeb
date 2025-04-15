// pages/login.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase' // ✅ อย่าลืมเช็คว่าไฟล์ firebase.js ถูกต้อง

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/account')
    } catch (err) {
      setError('Invalid email or password.')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔐 Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          style={inputStyle} />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          style={inputStyle} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={buttonStyle}>Login</button>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  )
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: 8,
  border: '1px solid #ccc'
}

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer'
}
