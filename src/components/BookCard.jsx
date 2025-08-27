import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  gap: .6rem;
`;

const Title = styled.h3`
  margin: 0;
  color: #2e4a3f;
`;

const PrimaryButton = styled.button`
  padding: .6rem 1rem;
  background: #4e937a;
  color: #fff;
  border: 0;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: #3b7b64; }
`;

const MutedButton = styled.button`
  padding: .6rem 1rem;
  background: #dee2e6;
  color: #333;
  border: 0;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
`;

const Select = styled.select`
  padding: .5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Img = styled.img`
  width: 120px;
  border-radius: 6px;
`;

const Meta = styled.p`
  margin: 0;
`;

const BookCard = ({ book, onBorrow, onDelete, onEdit }) => {
  const [durationDays, setDurationDays] = useState(14);
  const navigate = useNavigate();

  return (
    <Card>
      <Title>{book.title}</Title>
      <Meta><strong>Författare:</strong> {book.author}</Meta>
      <Meta>
        <strong>Publiceringsdatum:</strong>{" "}
        {new Date(book.publishedDate).toLocaleDateString("sv-SE", {
          day: "numeric", month: "long", year: "numeric",
        })}
      </Meta>

      {book.coverUrl && <Img src={book.coverUrl} alt={book.title} />}
      <Meta><strong>ISBN:</strong> {book.isbn}</Meta>
      <Meta><strong>Förlag:</strong> {book.publisher}</Meta>
      <Meta><strong>Beskrivning:</strong> {book.description}</Meta>
      <Meta><strong>Genre:</strong> {book.genre}</Meta>
      <Meta><strong>Språk:</strong> {book.language}</Meta>
      <Meta><strong>Sidor:</strong> {book.pages}</Meta>
      <Meta><strong>Format:</strong> {book.format}</Meta>
      <Meta><strong>Plats:</strong> {book.location}</Meta>
      <Meta><strong>Lånepris:</strong> {book.loanPrice} kr</Meta>
      <Meta><strong>Status:</strong> {book.availability}</Meta>

      <PrimaryButton onClick={() => navigate(`/book/${book.id}`)}>
        👁️ Visa detaljsida
      </PrimaryButton>

      {onBorrow && book.availability === "tillgänglig" && (
        <>
          <Select
            value={durationDays}
            onChange={(e) => setDurationDays(parseInt(e.target.value))}
          >
            <option value={7}>7 dagar</option>
            <option value={14}>14 dagar</option>
            <option value={21}>21 dagar</option>
            <option value={30}>30 dagar</option>
          </Select>
          <PrimaryButton onClick={() => onBorrow(book.id, durationDays)}>
            📚 Låna bok
          </PrimaryButton>
        </>
      )}

      {onDelete && (
        <MutedButton onClick={() => onDelete(book.id)}>🗑️ Ta bort</MutedButton>
      )}
      {onEdit && <MutedButton onClick={() => onEdit(book)}>✏️ Redigera</MutedButton>}

      <PrimaryButton onClick={() => navigate(`/book/${book.id}/reviews`)}>
        ✍️ Lämna recension
      </PrimaryButton>
    </Card>
  );
};

export default BookCard;
