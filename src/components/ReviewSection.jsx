import React, { useEffect, useState } from "react";
import {
  getReviewsByBookId,
  createReview,
  updateReview,
  deleteReview,
} from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ReviewSection.css";

const ReviewSection = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [editingComment, setEditingComment] = useState("");
  const [editingRating, setEditingRating] = useState(5);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

 const fetchReviews = async () => {
  try {
    const res = await getReviewsByBookId(bookId);
    console.log("Reviews från server:", res.data); // <--- lägg till denna
    setReviews(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Fel vid hämtning av recensioner:", err);
    setReviews([]);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.warning("Du måste vara inloggad för att lämna en recension.");
      return;
    }

    if (!bookId || !comment) {
      toast.error("Kommentar eller bok-ID saknas.");
      return;
    }

    if (isAdmin) {
      toast.info("🛑 Admin får inte lämna recensioner.");
      return;
    }

    try {
      await createReview({ bookId, rating, comment }, token);
      setComment("");
      setRating(5);
      fetchReviews();
      toast.success("Recension skickad!");
    } catch (err) {
      const msg = err?.response?.data?.error || "Kunde inte skicka recension.";
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      toast.warning("Du måste vara inloggad för att ta bort en recension.");
      return;
    }

    if (isAdmin) {
      toast.info("🛑 Admin får inte radera recensioner.");
      return;
    }

    if (confirm("Är du säker att du vill ta bort denna recension?")) {
      try {
        await deleteReview(id, token);
        fetchReviews();
        toast.success("Recension raderad.");
      } catch (err) {
        const msg = err?.response?.data?.error || "Kunde inte ta bort recension.";
        toast.error(msg);
      }
    }
  };

  const startEditing = (review) => {
    if (isAdmin) {
      toast.info("🛑 Admin får inte redigera recensioner.");
      return;
    }

    setEditingId(review.id);
    setEditingComment(review.comment);
    setEditingRating(review.rating);
  };

  const handleUpdate = async () => {
    if (!token) {
      toast.warning("Du måste vara inloggad för att uppdatera en recension.");
      return;
    }

    if (isAdmin) {
      toast.info("🛑 Admin får inte redigera recensioner.");
      return;
    }

    try {
      await updateReview(editingId, { rating: editingRating, comment: editingComment }, token);
      setEditingId(null);
      setEditingComment("");
      setEditingRating(5);
      fetchReviews();
      toast.success("Recension uppdaterad.");
    } catch (err) {
      const msg = err?.response?.data?.error || "Kunde inte uppdatera recension.";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  return (
    <div className="reviews">
      <ToastContainer position="top-center" autoClose={3000} />
      <h4>Recensioner</h4>

      {!isAdmin && !editingId && (
        <form onSubmit={handleSubmit}>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r} ⭐</option>
            ))}
          </select>

          <textarea
            placeholder="Skriv en kommentar..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button type="submit">Skicka</button>
        </form>
      )}

      {isAdmin && !editingId && (
        <p><em>Du är inloggad som admin och kan endast läsa recensioner.</em></p>
      )}

      {editingId && !isAdmin && (
        <div className="edit-box">
          <p><strong>Redigerar recension...</strong></p>
          <select
            value={editingRating}
            onChange={(e) => setEditingRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>{val} ⭐</option>
            ))}
          </select>
          <textarea
            value={editingComment}
            onChange={(e) => setEditingComment(e.target.value)}
          />
          <button onClick={handleUpdate}>Spara</button>
          <button onClick={() => setEditingId(null)}>Avbryt</button>
        </div>
      )}

        {reviews.length > 0 ? (
        reviews.map((r) => (
          <div key={r.id} className="review">
            <strong>{r.username}</strong> ({r.rating} ⭐)
            <p>{r.comment}</p>
            <p className="review-date">
              🕒 {new Date(r.createdAt).toLocaleString("sv-SE", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>

      {editingId !== r.id && (
  <div className="review-actions">
    <button onClick={() => startEditing(r)}>✏️ Redigera</button>
    <button onClick={() => handleDelete(r.id)}>🗑️ Radera</button>
  </div>
)}



          </div>
        ))
      ) : (
        <p>Inga recensioner ännu.</p>
      )}
    </div>
  );
};

export default ReviewSection;
