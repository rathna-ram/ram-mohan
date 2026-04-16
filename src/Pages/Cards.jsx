import Card from "../components/Card.jsx";
import {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback
} from "react";
import Modal from "../components/Modal.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";
import {
  getCards,
  createCard,
  updateCard,
  deleteCard
} from "../Services/Api.js";

const Cards = () => {

  const { theme, user, cards, setCards } = useContext(AppContext);
  const role = user?.role;

  // ✅ TOAST SAFE
  let showToast = () => {};
  try {
    const notify = useNotification();
    showToast = notify?.showToast || (() => {});
  } catch {}

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [feedbacks, setFeedbacks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const [selectedCard, setSelectedCard] = useState(null);
  const [editId, setEditId] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [notification, setNotification] = useState(false);

  const prevCardsRef = useRef([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ""
  });

  // 🔍 CHANGE DETECTION
  const hasNewData = (oldData, newData) => {
    const oldIds = oldData.map(c => c.id);
    const newIds = newData.map(c => c.id);
    return newIds.some(id => !oldIds.includes(id));
  };

  // 📡 FETCH
  const fetchCards = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);

      const data = await getCards();

      const updated = data.slice(0, 9).map(item => ({
        ...item,
        image: `https://picsum.photos/300/200?random=${item.id}`
      }));

      // 🔔 Detect new data
      if (prevCardsRef.current.length) {
        if (hasNewData(prevCardsRef.current, updated)) {
          setNotification(true);
          showToast("New cards available 🚀", "info");
        }
      }

      setCards(updated);
      prevCardsRef.current = updated;

    } catch (err) {
      setError(err.message);
      showToast("Failed to fetch cards ❌", "error");
    } finally {
      setLoading(false);
    }
  }, [setCards]);

  // 🚀 INITIAL LOAD
  useEffect(() => {
    fetchCards(true);
  }, [fetchCards]);

  // 🔁 POLLING
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCards();
    }, 20000);

    return () => clearInterval(interval);
  }, [fetchCards]);

  // 🔔 AUTO HIDE
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // 🔄 REFRESH BUTTON
  const handleRefresh = () => {
    fetchCards(true);
    setNotification(false);
    showToast("Cards refreshed 🔄", "success");
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setCards(prev => prev.filter(card => card.id !== id));
      showToast("Card deleted 🗑️", "warning");
    } catch (err) {
      setError(err.message);
      showToast("Delete failed ❌", "error");
    }
  };

  // ✏️ EDIT
  const handleEdit = (card) => {
    setFormData({
      title: card.title,
      description: card.body,
      image: card.image
    });
    setEditId(card.id);
  };

  // ➕ CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      showToast("Please fill all fields ❌", "error");
      return;
    }

    try {
      if (editId) {
        const updatedCard = await updateCard(editId, {
          title: formData.title,
          body: formData.description,
          image: formData.image
        });

        setCards(cards.map(card =>
          card.id === editId
            ? { ...updatedCard, image: formData.image }
            : card
        ));

        setEditId(null);
        showToast("Card updated ✏️", "success");

      } else {
        const newCard = await createCard({
          title: formData.title,
          body: formData.description,
          image: formData.image
        });

        const newData = [{ ...newCard, image: formData.image }, ...cards];
        setCards(newData);

        showToast("New card added 🎉", "success");
      }

      setFormData({ title: "", description: "", image: "" });

    } catch (err) {
      setError(err.message);
      showToast("Save failed ❌", "error");
    }
  };

  // 🔍 SEARCH
  useEffect(() => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearching(false);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredCards = useMemo(() => {
    return cards.filter(card =>
      card.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [cards, debouncedSearch]);

  const sortedCards = useMemo(() => {
    return [...filteredCards].sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
      if (sortOrder === "desc") return b.title.localeCompare(a.title);
      return 0;
    });
  }, [filteredCards, sortOrder]);

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentCards = sortedCards.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedCards.length / cardsPerPage);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500">{error}</h2>;

  return (
    <div className={`min-h-screen px-4 py-10 ${
      theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-100 text-black"
    }`}>

      {/* 🔔 Notification */}
      {notification && (
        <div className="fixed top-0 w-full bg-green-500 text-white p-3 text-center">
          New data available 🚀
        </div>
      )}

      <div className="w-full flex justify-center mb-6">

  <div className="flex flex-col items-center">

    <h1 className="text-4xl font-bold mb-3 text-center">
      Cards Section
    </h1>

    <button
      onClick={handleRefresh}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 transition"
    >
      Refresh Data
    </button>

  </div>

</div>

      {/* FORM */}
      {role === "admin" && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6 flex flex-col gap-3">
          <input
            placeholder="Title"
            value={formData.title}
            onChange={(e)=>setFormData({...formData, title:e.target.value})}
            className="border p-2"
          />
          <input
            placeholder="Description"
            value={formData.description}
            onChange={(e)=>setFormData({...formData, description:e.target.value})}
            className="border p-2"
          />
          <input
            placeholder="Image"
            value={formData.image}
            onChange={(e)=>setFormData({...formData, image:e.target.value})}
            className="border p-2"
          />
          <button className="bg-blue-500 text-white p-2">
            {editId ? "Update" : "Add"}
          </button>
        </form>
      )}

      <div className="flex justify-center gap-4 mt-6 flex-wrap">

  {/* 🔍 SEARCH */}
  <input
    placeholder="Search..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="border p-2 rounded w-60"
  />

  {/* 🔽 SORT */}
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">Sort By</option>
    <option value="asc">Title A → Z</option>
    <option value="desc">Title Z → A</option>
  </select>

</div>

     {/* CARDS */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {currentCards.length > 0 ? (
    currentCards.map(card => (
      <Card
        key={card.id}
        {...card}
        openModal={setSelectedCard}
        onEdit={handleEdit}
        onDelete={handleDelete}
        feedbacks={feedbacks}
        setFeedbacks={setFeedbacks}
      />
    ))
  ) : (
    <p className="col-span-3 text-center text-red-500 text-lg font-semibold mt-6">
      No cards found
    </p>
  )}
</div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}

      {/* MODAL */}
      {selectedCard && (
        <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
};

export default Cards;