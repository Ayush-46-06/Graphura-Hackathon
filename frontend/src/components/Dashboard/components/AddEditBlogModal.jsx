import { useState } from "react";
import axios from "axios";
import { X, Upload, Plus, Trash2 } from "lucide-react";

const API_URL = "http://localhost:5001/api/blog";
const token = localStorage.getItem("token");

const AddEditBlogModal = ({ blog, onClose, onSuccess }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [category, setCategory] = useState(blog?.category || "");
  const [publishedAt, setPublishedAt] = useState(
    blog?.publishedAt?.slice(0, 10) || ""
  );

  const [sections, setSections] = useState(
    blog?.sections || [{ type: "paragraph", content: "" }]
  );

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(blog?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= SECTION HANDLERS ================= */

  const addSection = () => {
    setSections([...sections, { type: "paragraph", content: "" }]);
  };

  const removeSection = (index) => {
    if (sections.length === 1) return;
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index, value) => {
    const updated = [...sections];
    updated[index].content = value;
    setSections(updated);
  };

  const updateSectionType = (index, type) => {
    const updated = [...sections];
    updated[index].type = type;

    // reset content based on type
    updated[index].content = type === "list" ? [""] : "";
    setSections(updated);
  };

  /* ================= IMAGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    if (!title || !category) return "Title & category required";
    if (!blog && !image) return "Blog image is required";

    for (const sec of sections) {
      if (sec.type === "list" && (!Array.isArray(sec.content) || sec.content.length === 0)) {
        return "List section cannot be empty";
      }
      if (sec.type !== "list" && !sec.content) {
        return "Section content cannot be empty";
      }
    }
    return "";
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("sections", JSON.stringify(sections));
    if (publishedAt) formData.append("publishedAt", publishedAt);
    if (image) formData.append("image", image);

    try {
      if (blog) {
        await axios.put(`${API_URL}/${blog._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <h2 className="font-bold text-lg">
            {blog ? "Edit Blog" : "Create Blog"}
          </h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">

          {error && <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>}

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full border p-3 rounded"
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full border p-3 rounded"
          />

          {/* Image */}
          <div>
            {preview && (
              <img src={preview} className="w-full h-48 object-cover rounded mb-2" />
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <Upload /> Upload Image
              <input hidden type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            <h3 className="font-semibold">Sections</h3>

            {sections.map((sec, index) => (
              <div key={index} className="border p-4 rounded relative space-y-2">

                <select
                  value={sec.type}
                  onChange={(e) => updateSectionType(index, e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="quote">Quote</option>
                  <option value="list">List</option>
                </select>

                {sec.type === "list" ? (
                  <textarea
                    rows={3}
                    placeholder="Enter list items (comma separated)"
                    value={sec.content.join(",")}
                    onChange={(e) =>
                      updateSection(index, e.target.value.split(","))
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <textarea
                    rows={3}
                    placeholder="Content"
                    value={sec.content}
                    onChange={(e) => updateSection(index, e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                )}

                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="absolute top-2 right-2 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 text-indigo-600"
            >
              <Plus /> Add Section
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              {loading ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlogModal;
