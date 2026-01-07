import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/hackathon";

const AddHackathonModal = ({ onClose, onCreated, editData = null }) => {
  const token = localStorage.getItem("token");
  const isEdit = Boolean(editData);

  const [form, setForm] = useState({
    title: "",
    description: "",
    prizePool: "",
    category: "",
    tags: "",
    startDate: "",
    endDate: "",
    lastEnrollmentDate: "",
    about: "",
    prizeDetails: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* ================= PREFILL FOR EDIT ================= */
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        prizePool: editData.prizePool || "",
        category: editData.category || "",
        tags: editData.tags?.join(", ") || "",
        startDate: editData.startDate?.slice(0, 10) || "",
        endDate: editData.endDate?.slice(0, 10) || "",
        lastEnrollmentDate:
          editData.lastEnrollmentDate?.slice(0, 10) || "",
        about: editData.about || "",
        prizeDetails: editData.prizeDetails || "",
      });

      setImagePreview(editData.image || null);
    }
  }, [editData]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Invalid image file" });
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors({ ...errors, image: "" });
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.prizePool || form.prizePool <= 0)
      newErrors.prizePool = "Prize must be greater than 0";
    if (!form.startDate) newErrors.startDate = "Start date required";
    if (!form.endDate) newErrors.endDate = "End date required";
    if (!form.lastEnrollmentDate)
      newErrors.lastEnrollmentDate = "Last enrollment date required";

    // Image only required when creating
    if (!isEdit && !image)
      newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isEdit) {
        /* ================= PUT (JSON ONLY) ================= */
        await axios.put(
          `${API_URL}/${editData._id}`,
          {
            ...form,
            tags: form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        /* ================= POST (FORMDATA) ================= */
        const fd = new FormData();

        Object.entries(form).forEach(([key, value]) => {
          if (key === "tags") {
            fd.append(
              "tags",
              JSON.stringify(
                value.split(",").map((t) => t.trim()).filter(Boolean)
              )
            );
          } else {
            fd.append(key, value);
          }
        });

        fd.append("image", image);

        await axios.post(API_URL, fd, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      onCreated();
      onClose();
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Operation failed",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Hackathon" : "Add Hackathon"}
          </h2>
          <button type="button" onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {errors.submit && (
            <p className="text-red-600 font-medium">{errors.submit}</p>
          )}

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-3 rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="prizePool"
            value={form.prizePool}
            onChange={handleChange}
            placeholder="Prize Pool"
            className="w-full border p-3 rounded"
          />

          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full border p-3 rounded"
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="lastEnrollmentDate"
              value={form.lastEnrollmentDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="About"
            rows={4}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="prizeDetails"
            value={form.prizeDetails}
            onChange={handleChange}
            placeholder="Prize Details"
            rows={3}
            className="w-full border p-3 rounded"
          />

          {/* IMAGE */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="h-40 w-full object-cover rounded"
            />
          )}

          {!isEdit && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          )}
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-700 text-white rounded"
          >
            {loading
              ? isEdit ? "Updating..." : "Creating..."
              : isEdit ? "Update Hackathon" : "Create Hackathon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHackathonModal;
