// pages/register.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/account')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝 Register</h1>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          style={inputStyle} />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          style={inputStyle} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={buttonStyle}>Register</button>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <a href="/login">Login</a>
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
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer'
}
