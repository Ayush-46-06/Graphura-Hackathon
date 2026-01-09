import { useEffect, useState } from "react";
import { X, Upload, Calendar, DollarSign, Tag, Award, Info, Gift } from "lucide-react";

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
      isPaid: "false",           // ✅ default FREE
  participationType: "solo", // ✅ default SOLO
  entryFee: "",      // ✅ ADD
  maxTeamSize: "",   // ✅ ADD
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Placeholder image URL
  const placeholderImage = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop";

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
        lastEnrollmentDate: editData.lastEnrollmentDate?.slice(0, 10) || "",
        about: editData.about || "",
        prizeDetails: editData.prizeDetails || "",
        isPaid: editData.isPaid ? "true" : "false",          // ✅
  participationType: editData.participationType || "solo", // ✅
        entryFee: editData.entryFee || "",
  maxTeamSize: editData.maxTeamSize || "",
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

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Image size should be less than 5MB" });
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

    if (!isEdit && !image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const axios = (await import('axios')).default;
      
      const payload = {
        ...form,
        description: form.description || form.about,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (isEdit) {
        // For edit, use FormData if image is being updated, otherwise use JSON
        if (image) {
          const fd = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            if (key === "tags") {
              fd.append("tags", JSON.stringify(value));
            } else {
              fd.append(key, value);
            }
          });
          fd.append("image", image);
          
          await axios.put(`${API_URL}/${editData._id}`, fd, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          await axios.put(`${API_URL}/${editData._id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } else {
        const fd = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (key === "tags") {
            fd.append("tags", JSON.stringify(value));
          } else {
            fd.append(key, value);
          }
        });
        fd.append("image", image);

        await axios.post(API_URL, fd, {
          headers: { Authorization: `Bearer ${token}` },
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

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-700 to-teal-500 px-8 py-6 flex justify-between items-center z-10">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Award className="w-8 h-8" />
            {isEdit ? "Edit Hackathon" : "Create New Hackathon"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-8 space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">!</div>
                <p className="text-red-700 font-medium">{errors.submit}</p>
              </div>
            )}

            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Upload size={18} className="text-teal-700" />
                Hackathon Banner {!isEdit && <span className="text-red-500">*</span>}
                {isEdit && <span className="text-xs text-gray-500 font-normal">(Upload new to replace)</span>}
              </label>
              
              <div className="relative group">
                <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 hover:border-teal-700 transition-all">
                  <img
                    src={imagePreview || placeholderImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {!imagePreview && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-white bg-opacity-90">
                      <Upload size={40} className="mb-2" />
                      <p className="text-sm font-medium">Click to upload banner</p>
                      <p className="text-xs mt-1">Max size: 5MB</p>
                    </div>
                  )}
                  
                  {/* Hover overlay for edit mode */}
                  {isEdit && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                        <Upload size={32} className="mx-auto mb-2" />
                        <p className="text-sm font-semibold">Click to change image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* File input - works for both create and edit */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              
              {errors.image && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="font-bold">!</span> {errors.image}
                </p>
              )}
            </div>

            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Award size={16} className="text-teal-700" />
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., AI Innovation Challenge 2024"
                  className={`w-full border-2 ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:border-teal-700 rounded-xl p-3 transition-all outline-none`}
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Tag size={16} className="text-teal-700" />
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g., Web Development, AI/ML"
                  className={`w-full border-2 ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:border-teal-700 rounded-xl p-3 transition-all outline-none`}
                />
                {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <DollarSign size={16} className="text-teal-700" />
      Hackathon Type
    </label>

    <select
      name="isPaid"
      value={form.isPaid}
      onChange={handleChange}
      className="w-full border-2 border-gray-200 focus:border-teal-700 rounded-xl p-3 transition-all outline-none"
    >
      <option value="false">Free</option>
      <option value="true">Paid</option>
    </select>
  </div>

  {/* SOLO / TEAM */}
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <Award size={16} className="text-teal-700" />
      Participation Type
    </label>

    <select
      name="participationType"
      value={form.participationType}
      onChange={handleChange}
      className="w-full border-2 border-gray-200 focus:border-teal-700 rounded-xl p-3 transition-all outline-none"
    >
      <option value="solo">Solo</option>
      <option value="team">Team</option>
    </select>
  </div>
</div>

{form.isPaid === "true" && (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <DollarSign size={16} className="text-teal-700" />
      Entry Fee <span className="text-red-500">*</span>
    </label>

    <input
      type="number"
      name="entryFee"
      value={form.entryFee}
      onChange={handleChange}
      placeholder="e.g., 299"
      className={`w-full border-2 ${
        errors.entryFee ? "border-red-500" : "border-gray-200"
      } focus:border-teal-700 rounded-xl p-3 transition-all outline-none`}
    />

    <p className="text-xs text-gray-500">
      Required for paid hackathons
    </p>
  </div>
)}
{form.participationType === "team" && (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <Award size={16} className="text-teal-700" />
      Max Team Size
    </label>

    <input
      type="number"
      name="maxTeamSize"
      value={form.maxTeamSize}
      onChange={handleChange}
      placeholder="Default is 4"
      min={2}
      className="w-full border-2 border-gray-200 focus:border-teal-700 rounded-xl p-3 transition-all outline-none"
    />

    <p className="text-xs text-gray-500">
      Leave empty to use default (4)
    </p>
  </div>
)}


            {/* Prize Pool & Tags Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign size={16} className="text-teal-700" />
                  Prize Pool <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="prizePool"
                  value={form.prizePool}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  className={`w-full border-2 ${errors.prizePool ? 'border-red-500' : 'border-gray-200'} focus:border-teal-700 rounded-xl p-3 transition-all outline-none`}
                />
                {errors.prizePool && <p className="text-red-500 text-xs">{errors.prizePool}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Tag size={16} className="text-teal-700" />
                  Tags
                </label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="w-full border-2 border-gray-200 focus:border-teal-700 rounded-xl p-3 transition-all outline-none"
                />
                <p className="text-xs text-gray-500">Separate multiple tags with commas</p>
              </div>
            </div>

            {/* Dates Row */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar size={16} className="text-teal-700" />
                Important Dates <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-600 font-medium">Start Date</p>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.startDate ? 'border-red-500' : 'border-gray-200'} focus:border-teal-700 rounded-xl p-3 transition-all outline-none`}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600 font-medium">End Date</p>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.endDate ? 'border-red-500' : 'border-gray-200'} focus:border-teal-700 rounded-xl p-3 transition-all outline-none`}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600 font-medium">Last Enrollment</p>
                  <input
                    type="date"
                    name="lastEnrollmentDate"
                    value={form.lastEnrollmentDate}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.lastEnrollmentDate ? 'border-red-500' : 'border-gray-200'} focus:border-teal-700 rounded-xl p-3 transition-all outline-none`}
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Info size={16} className="text-teal-700" />
                About Hackathon
              </label>
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="Describe the hackathon, its goals, themes, and what participants can expect..."
                rows={5}
                className="w-full border-2 border-gray-200 focus:border-teal-700 rounded-xl p-4 transition-all outline-none resize-none"
              />
            </div>

            {/* Prize Details */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Gift size={16} className="text-teal-700" />
                Prize Details
              </label>
              <textarea
                name="prizeDetails"
                value={form.prizeDetails}
                onChange={handleChange}
                placeholder="Breakdown of prizes (1st place, 2nd place, special awards, etc.)"
                rows={4}
                className="w-full border-2 border-gray-200 focus:border-teal-700 rounded-xl p-4 transition-all outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-5 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-teal-700 to-teal-500 hover:scale-105 text-white font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Award size={18} />
                {isEdit ? "Update Hackathon" : "Create Hackathon"}
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AddHackathonModal;