// pages/index.js
import Head from 'next/head'
import { useState, useEffect } from 'react'
import SidebarLayout from '@/components/SidebarLayout'

export default function Home() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const addToCart = (item) => {
    const updatedCart = [...cart, item]
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    alert('✅ เพิ่มสินค้าในตะกร้าแล้ว!')
  }

  return (
    <SidebarLayout>
      <Head>
        <title>SkyByMe.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <section
        className="home"
        style={{
          backgroundImage: "url('/images/LINE_ALBUM_Sky_230103_17.jpg')",
          backgroundSize: 'cover',
          padding: '4rem 2rem',
        }}
      >
        <div className="content">
          <h1>Sky Picture</h1>
          <p>
            i like to look at the sky Whether it's day or night or any time,<br />
            the sky is charming in its own way. every time i travel<br />
            I have the sky as a friend Companions that never abandon me<br />
            Wherever you go, go together everywhere
          </p>
          <a href="shop" className="btn" style={{ backgroundColor: '#333' }}>
            shop now
          </a>
        </div>
      </section>

      <h2 className="heading">About us</h2>

      <section className="about">
        <div className="row">
          <div className="pic-container">
            <img src="/images/Sky By Me.png" alt="logo" style={{ maxWidth: '300px', width: '100%' }} />
          </div>
          <div className="content">
            <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '1rem' }}>why choose us?</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Sometimes I can't help but compare my life to the sky. It is like our day to day life.<br />
              Some days are as bright as days that go smoothly. Some days seem gloomy, like a day
              that goes on with problems and obstacles.
              <br /><br />
              Even if we can't choose the sky as we want But we can choose to do what is best in our daily lives.
            </p>
            <a href="#" className="btn" style={{ backgroundColor: '#333', marginTop: '1.5rem' }}>
              learn more
            </a>
          </div>
        </div>
      </section>

      <h2 className="heading">shop</h2>

      <section className="photos">
        {[
          { name: 'LINE_ALBUM_Sky_230103_10.jpg', displayName: 'Moon Sky', price: 10 },
          { name: 'LINE_ALBUM_Sky_230103_22.jpg', displayName: 'Sunset Over Field', price: 39 },
          { name: 'LINE_ALBUM_Sky_230103_13.jpg', displayName: 'Golden Light', price: 49 },
          { name: 'LINE_ALBUM_Sky_230103_14.jpg', displayName: 'Cloud Drama', price: 39 },
          { name: 'LINE_ALBUM_Sky_230103_7.jpg', displayName: 'Grey & Calm', price: 10 },
          { name: 'LINE_ALBUM_Sky_230103_29.jpg', displayName: 'Cloudy Morning', price: 29 },
          { name: 'LINE_ALBUM_Sky_230103_21.jpg', displayName: 'Blue Evening', price: 10 },
          { name: 'LINE_ALBUM_Sky_230103_20.jpg', displayName: 'City Light at Night', price: 10 },
        ].map((item, i) => (
          <div key={i}>
            <div className="photo">
              <img src={`/images/${item.name}`} alt={item.displayName} />
              <div className="icons-pic2">💜</div>
              <div className="price">${item.price}</div>
            </div>
            <button className="btn-u" onClick={() => addToCart(item)}>
              Add to cart
            </button>
          </div>
        ))}
      </section>

      <h2 className="heading">Contact Us</h2>

      <section className="contact">
        <form>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="text" placeholder="number" />
          <textarea placeholder="message"></textarea>
          <button type="submit" style={{ backgroundColor: '#333' }}>send message</button>
        </form>
      </section>

      {/* 🔵 Footer */}
      <footer style={{ backgroundColor: '#eee', padding: '2rem 1rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>extra links</h3>
            <a href="#" style={{ color: 'purple', textDecoration: 'underline' }}>my account</a>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>contact info</h3>
            <p>095-118-9473</p>
            <p>tmgamer13253@gmail.com</p>
            <a href="https://www.instagram.com/nxic_ky/" style={{ color: 'purple', textDecoration: 'underline' }}>
              https://www.instagram.com/nxic_ky/
            </a>
          </div>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
          created by Mr.Tangpanitan Khongbunpring | all rights reserved
        </p>
      </footer>
    </SidebarLayout>
  )
}
