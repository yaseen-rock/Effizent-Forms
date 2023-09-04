// components/Homepage.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/homepage.module.css'; // Import the CSS module

function Homepage({ handleFormRedirect }) {
  const [username, setUsername] = useState('');

  return (
    <div className={styles.homepage}> {/* Apply the CSS module class */}
      <header className={styles.header}> {/* Apply the CSS module class */}
        <nav>
          <ul>
            {/* Logo */}
           <Link href="#">
            <img src="https://www.effizentseele.com/images/logo.png" alt="Logo" className={styles.logo} />
          </Link>
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <section className={styles.hero}> {/* Apply the CSS module class */}
        <div className={styles.heroContent}> {/* Apply the CSS module class */}
          <h1>Welcome to Effizent</h1>
          <p>Explore our creative and innovative projects</p>
          {/* Input Form */}
          <form className={styles.inputForm} onSubmit={(e) => { e.preventDefault(); handleFormRedirect(username); }}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className={styles.ctaButton}>Get Started</button>
          </form>
        </div>
      </section>
      {/* More sections here */}
    </div>
  );
}

export default Homepage;
