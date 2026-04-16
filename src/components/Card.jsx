import { useContext, memo, useMemo, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import RatingBreakdown from "./RatingBreakdown";

function Card(props) {
  const {
    id,
    title = "No Title",
    body = "No Description",
    image = "https://via.placeholder.com/300",
    openModal = () => {},
    onEdit = () => {},
    onDelete = () => {},
    feedbacks = {},
    setFeedbacks = () => {}
  } = props;

  const { user } = useContext(AppContext);
  const role = user?.role;

  const cardFeedbacks = useMemo(() => {
    return feedbacks?.[id] || [];
  }, [feedbacks, id]);

  const avgRating = useMemo(() => {
    if (cardFeedbacks.length === 0) return 0;
    const total = cardFeedbacks.reduce((acc, item) => acc + item.rating, 0);
    return (total / cardFeedbacks.length).toFixed(1);
  }, [cardFeedbacks]);

  const handleView = useCallback(() => {
    openModal({ id, title, body, image });
  }, [id, title, body, image, openModal]);

  return (
    <div className="bg-white dark:bg-slate-800 text-black dark:text-white shadow rounded-xl p-4 space-y-3">

      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-black dark:text-gray-300">{body}</p>

      <div className="flex gap-2">
        <button onClick={handleView} className="bg-blue-500 text-white px-3 py-1 rounded">
          View
        </button>

        {role === "admin" && (
          <>
            <button onClick={() => onEdit({ id, title, body, image })} className="bg-yellow-500 text-white px-3 py-1 rounded">
              Edit
            </button>

            <button onClick={() => onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </>
        )}
      </div>

      <p className="text-sm">⭐ {avgRating} ({cardFeedbacks.length})</p>

      <RatingBreakdown feedbacks={cardFeedbacks} />
      <FeedbackForm id={id} setFeedbacks={setFeedbacks} />
      <FeedbackList feedbacks={cardFeedbacks} id={id} setFeedbacks={setFeedbacks} />

    </div>
  );
}

export default memo(Card);