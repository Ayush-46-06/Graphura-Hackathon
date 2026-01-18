import { useState, useEffect } from "react";
import axios from "axios";
import { X, Upload, Plus, Trash2 } from "lucide-react";

const API_URL = "/api/blog";
const token = localStorage.getItem("token");

const AddEditBlogModal = ({ blog, onClose, onSuccess }) => {
  /* ================= BASIC FIELDS ================= */

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  /* ================= SECTIONS ================= */

  const [sections, setSections] = useState([
    { type: "paragraph", content: "" }
  ]);

  /* ================= IMAGE ================= */

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ================= UI STATES ================= */

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= 🔥 SYNC BLOG DATA (IMPORTANT FIX) ================= */

  useEffect(() => {
    if (!blog) return;

    setTitle(blog.title || "");
    setCategory(blog.category || "");
    setPublishedAt(
      blog.publishedAt ? blog.publishedAt.slice(0, 10) : ""
    );
    setSections(
      Array.isArray(blog.sections) && blog.sections.length > 0
        ? blog.sections
        : [{ type: "paragraph", content: "" }]
    );
    setPreview(blog.image || null);
    setImage(null); // reset image input
  }, [blog]);

  /* ================= SECTION HANDLERS ================= */

  const addSection = () => {
    setSections([...sections, { type: "paragraph", content: "" }]);
  };

  const removeSection = (index) => {
    if (sections.length === 1) return;
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSectionType = (index, type) => {
    const updated = [...sections];
    updated[index] = {
      type,
      content: type === "list" ? [""] : ""
    };
    setSections(updated);
  };

  const updateSectionContent = (index, value) => {
    const updated = [...sections];
    updated[index].content = value;
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
    if (!title.trim()) return "Title is required";
    if (!category.trim()) return "Category is required";
    if (!blog && !image) return "Blog image is required";

    for (const sec of sections) {
      if (sec.type === "list") {
        if (!Array.isArray(sec.content) || sec.content.length === 0) {
          return "List section cannot be empty";
        }
      } else {
        if (!sec.content || !sec.content.trim()) {
          return "Section content cannot be empty";
        }
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

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("sections", JSON.stringify(sections));
      if (publishedAt) formData.append("publishedAt", publishedAt);
      if (image) formData.append("image", image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (blog) {
        await axios.put(`${API_URL}/${blog._id}`, formData, config);
      } else {
        await axios.post(API_URL, formData, config);
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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">
            {blog ? "Edit Blog" : "Create Blog"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-5 max-h-[80vh] overflow-y-auto"
        >
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full border p-3 rounded"
          />

          {/* Category */}
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full border p-3 rounded"
          />

          {/* Publish Date */}
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full border p-3 rounded"
          />

          {/* Image */}
          <div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <label className="flex items-center gap-2 cursor-pointer text-indigo-600">
              <Upload size={18} /> Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Sections</h3>

            {sections.map((sec, index) => (
              <div
                key={index}
                className="border p-4 rounded relative space-y-3"
              >
                <select
                  value={sec.type}
                  onChange={(e) =>
                    updateSectionType(index, e.target.value)
                  }
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
                    placeholder="Comma separated list items"
                    value={sec.content.join(",")}
                    onChange={(e) =>
                      updateSectionContent(
                        index,
                        e.target.value
                          .split(",")
                          .map(i => i.trim())
                          .filter(Boolean)
                      )
                    }
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <textarea
                    rows={3}
                    placeholder="Section content"
                    value={sec.content}
                    onChange={(e) =>
                      updateSectionContent(index, e.target.value)
                    }
                    className="w-full border p-2 rounded"
                  />
                )}

                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="absolute top-3 right-3 text-red-600"
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
              <Plus size={18} /> Add Section
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              {loading
                ? "Saving..."
                : blog
                ? "Update Blog"
                : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlogModal;
