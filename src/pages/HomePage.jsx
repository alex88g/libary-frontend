import React from "react";
import { Link } from "react-router-dom";
import "../HomePage.css";

const popularBooks = [
  {
    id: 1,
    title: "Sagan om ringen",
    author: "J.R.R. Tolkien",
    coverUrl: "https://dez1v4fbcawql.cloudfront.net/product_thumb/946/13992369/6784e078a932a.jpg"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://m.media-amazon.com/images/I/61HkdyBpKOL._SL1200_.jpg"
  },
  {
    id: 3,
    title: "Den lille prinsen",
    author: "Antoine de Saint Exupéry",
    coverUrl: "https://m.media-amazon.com/images/I/710nS9M05SL._SL1500_.jpg"
  },
  {
    id: 4,
    title: "Harry Potter och De vises sten",
    author: "J.K. Rowling",
    coverUrl: "https://s1.adlibris.com/images/69655964/harry-potter-och-de-vises-sten-jubileumsutgava-av-minalima.jpg"
  },
  {
    id: 5,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    coverUrl: "https://m.media-amazon.com/images/I/61sKsbPb5GL._SL1500_.jpg"
  }
];

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-text">
          <h1>📚 Välkommen till Ditt Digitala Bibliotek</h1>
          <p>Upptäck, låna och läs tusentals böcker direkt online. Smidigt, snabbt och gratis.</p>
          <Link to="/register" className="cta-button">Bli medlem idag</Link>
        </div>
        <img
          src="/images/library-hero.jpg"
          alt="Bibliotek"
          className="hero-image"
        />
      </header>

      <section className="ad-banner">
        <p>Sommarläsning: Låna 3 betala för 2 under hela juni! Missa inte chansen.</p>
      </section>

      <section className="popular-section">
        <h2>🔥 Populära böcker just nu</h2>
        <div className="popular-books">
          {popularBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.coverUrl} alt={book.title} />
              <p><strong>{book.title}</strong><br />{book.author}</p>
            </div>
          ))}
        </div>
        <Link to="/library" className="cta-secondary"> Se hela biblioteket</Link>
      </section>
    </div>
  );
};

export default HomePage;
