import { useParams, Link } from "react-router-dom";
import ReviewSection from "../components/ReviewSection";

const ReviewPage = () => {
  const { bookId } = useParams();

  if (!bookId) {
    return (
      <div className="container">
        <h2>Recensioner & Kommentarer</h2>
        <p>Ogiltig eller saknad boklänk. <Link to="/library">Till biblioteket</Link></p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Recensioner & Kommentarer</h2>
      <ReviewSection bookId={bookId} />
    </div>
  );
};

export default ReviewPage;
