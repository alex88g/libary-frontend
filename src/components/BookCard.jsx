import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onBorrow, onDelete, onEdit }) => {
  const [durationDays, setDurationDays] = useState(14);
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>{book.title}</h3>
      <p><strong>Författare:</strong> {book.author}</p>
      <p>
        <strong>Publiceringsdatum:</strong>{" "}
        {new Date(book.publishedDate).toLocaleDateString("sv-SE", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {book.coverUrl && (
        <img src={book.coverUrl} alt={book.title} width="120" />
      )}
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Förlag:</strong> {book.publisher}</p>
      <p><strong>Beskrivning:</strong> {book.description}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Språk:</strong> {book.language}</p>
      <p><strong>Sidor:</strong> {book.pages}</p>
      <p><strong>Format:</strong> {book.format}</p>
      <p><strong>Plats:</strong> {book.location}</p>
      <p><strong>Lånepris:</strong> {book.loanPrice} kr</p>
      <p><strong>Status:</strong> {book.availability}</p>

      {onBorrow && book.availability === "tillgänglig" && (
        <>
          <select
            value={durationDays}
            onChange={(e) => setDurationDays(parseInt(e.target.value))}
          >
            <option value={7}>7 dagar</option>
            <option value={14}>14 dagar</option>
            <option value={21}>21 dagar</option>
            <option value={30}>30 dagar</option>
          </select>
          <button onClick={() => onBorrow(book.id, durationDays)}>
            📚 Låna bok
          </button>
        </>
      )}

      {onDelete && (
        <button onClick={() => onDelete(book.id)}>🗑️ Ta bort</button>
      )}
      {onEdit && <button onClick={() => onEdit(book)}>✏️ Redigera</button>}

  
     <button onClick={() => navigate(`/book/${book.id}/reviews`)}>
  ✍️ Lämna recension
</button>

    </div>
  );
};

export default BookCard;
