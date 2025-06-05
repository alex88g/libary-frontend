import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../AdminDashboard.css";

const API_BASE = "/api";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
    isbn: "",
    publisher: "",
    genre: "",
    language: "",
    pages: "",
    coverUrl: "",
    loanPrice: "",
    availability: "tillgänglig",
    format: "inbunden",
    location: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/books`);
      setBooks(res.data);
    } catch (err) {
      toast.error("❌ Kunde inte hämta böcker");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (editId) {
        await axios.put(`${API_BASE}/books/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("✅ Boken har uppdaterats");
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}/books`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("✅ Ny bok har lagts till");
      }

      setForm({
        title: "",
        author: "",
        description: "",
        publishedDate: "",
        isbn: "",
        publisher: "",
        genre: "",
        language: "",
        pages: "",
        coverUrl: "",
        loanPrice: "",
        availability: "tillgänglig",
        format: "inbunden",
        location: ""
      });

      fetchBooks();
    } catch (err) {
      console.error("Fel:", err.response?.data || err.message);
      toast.error("❌ Fel vid sparande av bok");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Är du säker att du vill ta bort boken?")) {
      try {
        await axios.delete(`${API_BASE}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("🗑️ Boken har raderats");
        fetchBooks();
      } catch (err) {
        toast.error("❌ Kunde inte radera boken");
      }
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      publishedDate: book.publishedDate?.split("T")[0] || "",
      isbn: book.isbn,
      publisher: book.publisher,
      genre: book.genre,
      language: book.language,
      pages: book.pages,
      coverUrl: book.coverUrl,
      loanPrice: book.loanPrice,
      availability: book.availability,
      format: book.format,
      location: book.location
    });
    toast.info("✏️ Redigerar bok");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="admin-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>📚 Adminpanel – Hantera böcker</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editId ? "✏️ Uppdatera bok" : "➕ Lägg till ny bok"}</h3>
        <div className="form-grid">
          <input name="title" placeholder="Titel" value={form.title} onChange={handleChange} required />
          <input name="author" placeholder="Författare" value={form.author} onChange={handleChange} required />
          <input name="publishedDate" type="date" value={form.publishedDate} onChange={handleChange} required />
          <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required />
          <input name="publisher" placeholder="Förlag" value={form.publisher} onChange={handleChange} />
          <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
          <input name="language" placeholder="Språk" value={form.language} onChange={handleChange} />
          <input name="pages" type="number" placeholder="Sidor" value={form.pages} onChange={handleChange} />
          <input name="coverUrl" placeholder="Bildlänk" value={form.coverUrl} onChange={handleChange} />
          <input name="loanPrice" type="number" step="0.01" placeholder="Pris" value={form.loanPrice} onChange={handleChange} />
          <input name="location" placeholder="Plats" value={form.location} onChange={handleChange} />
          <select name="availability" value={form.availability} onChange={handleChange}>
            <option value="tillgänglig">Tillgänglig</option>
            <option value="utlånad">Utlånad</option>
            <option value="reserverad">Reserverad</option>
          </select>
          <select name="format" value={form.format} onChange={handleChange}>
            <option value="inbunden">Inbunden</option>
            <option value="pocket">Pocket</option>
            <option value="e-bok">E-bok</option>
            <option value="ljudbok">Ljudbok</option>
          </select>
        </div>
        <textarea name="description" placeholder="Beskrivning" value={form.description} onChange={handleChange} required />
        <button type="submit" className="submit-button">
          {editId ? "Uppdatera bok" : "Lägg till bok"}
        </button>
      </form>

      <hr />

      {loading ? (
        <p>Laddar böcker...</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="admin-book">
              <BookCard book={book} onDelete={handleDelete} onEdit={handleEdit} />
              {book.availability === "utlånad" && book.borrowedBy && (
                <p className="borrowed-by">
                  📌 Utlånad av: <strong>{book.borrowedBy}</strong>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
