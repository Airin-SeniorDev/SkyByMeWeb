// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>SkyByMe.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header style={{ backgroundColor: '#333', color: 'white', padding: '1rem' }}>
        <div className="header-container">
          <div className="logo">SkyByMe.</div>
        </div>
      </header>

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
          <a href="#shop" className="btn" style={{ backgroundColor: '#333' }}>
            shop now
          </a>
        </div>
      </section>

      <h2 className="heading">About us</h2>

      <section className="about">
        <div className="row">
          <div className="pic-container">
            <img src="/images/Sky By Me.png" alt="logo" style={{ maxWidth: '550px', width: '100%' }} />
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
          { img: 'LINE_ALBUM_Sky_230103_10.jpg', price: 10 },
          { img: 'LINE_ALBUM_Sky_230103_22.jpg', price: 39 },
          { img: 'LINE_ALBUM_Sky_230103_13.jpg', price: 49 },
          { img: 'LINE_ALBUM_Sky_230103_14.jpg', price: 39 },
          { img: 'LINE_ALBUM_Sky_230103_7.jpg', price: 10 },
          { img: 'LINE_ALBUM_Sky_230103_29.jpg', price: 29 },
          { img: 'LINE_ALBUM_Sky_230103_21.jpg', price: 10 },
          { img: 'LINE_ALBUM_Sky_230103_20.jpg', price: 10 },
        ].map((item, i) => (
          <div key={i}>
            <div className="photo">
              <img src={`/images/${item.img}`} alt={`photo${i + 1}`} />
              <div className="icons-pic2">💜</div>
              <div className="price">${item.price}</div>
            </div>
            <button className="btn-u">Add to cart</button>
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

      <footer style={{ backgroundColor: '#e0e0e0', padding: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div>
            <h3>extra links</h3>
            <a href="#" className="link">my account</a>
          </div>
          <div>
            <h3>contact info</h3>
            <p><a href="tel:0951189473">095-118-9473</a></p>
            <p><a href="mailto:tmgamer13253@gmail.com">tmgamer13253@gmail.com</a></p>
            <p><a href="https://www.instagram.com/nxic_ky/" target="_blank">instagram.com/nxic_ky</a></p>
          </div>
        </div>
        <p style={{ marginTop: '2rem' }}>created by Mr.Tangpanitan Khongbunpring | all rights reserved</p>
      </footer>
    </>
  );
}
