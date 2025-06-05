import { useParams } from "react-router-dom";
import ReviewSection from "../components/ReviewSection";

const ReviewPage = () => {
  const { bookId } = useParams();

  return (
    <div className="container">
      <h2>Recensioner & Kommentarer</h2>
      <ReviewSection bookId={bookId} />
    </div>
  );
};

export default ReviewPage;
