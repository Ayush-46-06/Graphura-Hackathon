import { useEffect, useState } from "react";
import { Trash2, Edit2, Send, Save, X, Star, Quote, Sparkles } from "lucide-react";

const API_BASE = "/api";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const MAX_CHARS = 500;

  /* ================= FETCH REVIEWS ================= */
  const fetchReviews = async () => {
    const res = await fetch(`${API_BASE}/review`);
    const data = await res.json();
    setReviews(Array.isArray(data.review) ? data.review : []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /* ================= ADD REVIEW ================= */
  const submitReview = async () => {
    if (!text.trim()) return alert("Please write something");

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to add review");

      setText("");
      setCharCount(0);
      fetchReviews();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE REVIEW ================= */
  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    await fetch(`${API_BASE}/review/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchReviews();
  };

  /* ================= UPDATE REVIEW ================= */
  const updateReview = async (id) => {
    if (!editingText.trim()) return;

    await fetch(`${API_BASE}/review/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updatedText: editingText }),
    });

    setEditingId(null);
    setEditingText("");
    fetchReviews();
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARS) {
      setText(newText);
      setCharCount(newText.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#03594E] to-[#1AB69D] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
            <Sparkles size={18} />
            <span className="font-semibold text-sm">Share Your Experience</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#03594E] to-[#1AB69D]">
            Testimonials
          </h1>
          <p className="text-gray-600 text-lg">
            What our community has to say
          </p>
        </div>

        {/* Add Review Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-12 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#03594E] to-[#1AB69D] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user?.name || "Guest"}</p>
              <p className="text-sm text-gray-500">Share your thoughts</p>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Write your experience here... Tell us what you think!"
              className="w-full border-2 border-gray-200 focus:border-[#03594E] rounded-xl p-4 mb-3 resize-none transition-all duration-300 focus:ring-4 focus:ring-[#03594E]/10 outline-none"
              rows={5}
            />
            <div className="flex justify-between items-center mb-4">
              <span className={`text-sm ${charCount > MAX_CHARS * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                {charCount}/{MAX_CHARS} characters
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={submitReview}
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-[#03594E] to-[#1AB69D] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Post Testimonial</span>
              </>
            )}
          </button>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#03594E]">{reviews.length}</p>
              <p className="text-sm text-gray-600">Testimonials</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <p className="text-3xl font-bold text-[#03594E]">5.0</p>
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#03594E]">100%</p>
              <p className="text-sm text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          {reviews.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote size={40} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No testimonials yet</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to share your experience!</p>
            </div>
          )}

          {reviews.map((r, index) => {
            const isOwner = user?._id === r.user?._id;

            return (
              <div
                key={r._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Gradient Top Border */}
                <div className="h-1 bg-gradient-to-r from-[#03594E] via-[#1AB69D] to-[#F8C62F]"></div>

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 flex-1">
                      {/* Avatar with Badge */}
                      <div className="relative">
                        <img
                          src={r.user?.image || "https://ui-avatars.com/api/?name=" + (r.user?.name || "User")}
                          alt={r.user?.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-[#03594E] to-[#1AB69D] rounded-full flex items-center justify-center border-2 border-white">
                          <Star size={12} className="text-white fill-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold text-gray-900 text-lg">{r.user?.name}</p>
                          <span className="text-xs bg-gradient-to-r from-[#03594E] to-[#1AB69D] text-white px-2 py-1 rounded-full">
                            Verified
                          </span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>

                        {/* Review Text */}
                        {editingId === r._id ? (
                          <div className="mt-3">
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="w-full border-2 border-[#03594E] rounded-xl p-3 resize-none focus:ring-4 focus:ring-[#03594E]/10 outline-none"
                              rows={4}
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <Quote size={24} className="absolute -top-2 -left-2 text-gray-200" />
                            <p className="text-gray-700 leading-relaxed pl-6">
                              {r.text}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isOwner && (
                      <div className="flex gap-2 ml-4">
                        {editingId === r._id ? (
                          <>
                            <button
                              onClick={() => updateReview(r._id)}
                              className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                              title="Save"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditingText("");
                              }}
                              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                              title="Cancel"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(r._id);
                                setEditingText(r.text);
                              }}
                              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteReview(r._id)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;