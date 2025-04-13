// pages/thank-you.js
import SidebarLayout from '@/components/SidebarLayout'

export default function ThankYouPage() {
  return (
    <SidebarLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>🙏 Thank You for Your Order!</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
          We truly appreciate your support. Your sky moments will bring joy and inspiration!  
        </p>
        <a href="/" style={{
          marginTop: '2rem',
          backgroundColor: '#2ecc71',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}>
          Back to Home
        </a>
      </div>
    </SidebarLayout>
  )
}
