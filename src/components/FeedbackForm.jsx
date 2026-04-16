import { useState } from "react";
import Rating from "./Rating";

const FeedbackForm = ({ id, setFeedbacks }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ FIX

    if (rating === 0 || comment.trim() === "") {
      setError("Please give rating and feedback ❌");
      return;
    }

    const newFeedback = {
      id: Date.now(), // ✅ UNIQUE ID (IMPORTANT)
      rating,
      comment,
    };

    setFeedbacks((prev) => ({
      ...prev,
      [id]: [...(prev?.[id] || []), newFeedback], // ✅ SAFE ACCESS
    }));

    // ✅ RESET FORM
    setRating(0);
    setComment("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">

      {/* ⭐ RATING */}
      <Rating rating={rating} setRating={setRating} />

      {/* 📝 COMMENT */}
      <textarea
        placeholder="Give a feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 rounded w-full mt-2 dark:bg-slate-700 dark:text-white"
      />

      {/* ❌ ERROR */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

      {/* 🚀 SUBMIT */}
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mt-2 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;