import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Library.css";

const Library = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Kunde inte hämta böcker");
    }
  };

  const handleBorrow = async (bookId, durationDays = 14) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Du måste logga in för att låna en bok");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/loans",
        { bookId, durationDays },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Boken har lånats!");
      fetchBooks();
    } catch (err) {
      const message = err.response?.data?.message || "Något gick fel vid lånet.";
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="library-wrapper">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>Tillgängliga Böcker</h2>
      {books.length === 0 ? (
        <p>🚫 Inga böcker tillgängliga just nu.</p>
      ) : (
        <div className="library-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onBorrow={handleBorrow} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
