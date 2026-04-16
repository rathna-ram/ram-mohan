const FeedbackList = ({ feedbacks = [], id, setFeedbacks }) => {

  const handleDelete = (feedbackId) => {
    setFeedbacks((prev) => {
      const updated = (prev?.[id] || []).filter(
        (item) => item.id !== feedbackId
      );

      return {
        ...prev,
        [id]: updated,
      };
    });
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
        No feedback yet
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">

      {feedbacks.map((item) => (
        <div
          key={item.id} // ✅ FIXED (no index)
          className="border-b pb-2 flex justify-between items-start dark:border-gray-600"
        >
          <div>
            {/* ⭐ Stars */}
            <div className="text-yellow-500 text-sm">
              {"★".repeat(item.rating)}
              {"☆".repeat(5 - item.rating)}
            </div>

            {/* 💬 Comment */}
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {item.comment}
            </p>
          </div>

          {/* ❌ Delete */}
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-500 text-xs hover:underline"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
};

export default FeedbackList;