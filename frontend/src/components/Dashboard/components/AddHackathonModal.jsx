import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/hackathon";

const AddHackathonModal = ({ onClose, onCreated }) => {
  const token = localStorage.getItem("token");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: "Please select a valid image file" });
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size should be less than 5MB" });
        return;
      }

      setImage(file);
      setErrors({ ...errors, image: "" });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.prizePool || form.prizePool <= 0) newErrors.prizePool = "Prize pool must be greater than 0";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.endDate) newErrors.endDate = "End date is required";
    if (!form.lastEnrollmentDate) newErrors.lastEnrollmentDate = "Last enrollment date is required";
    if (!image) newErrors.image = "Image is required";
    
    // Date validations
    if (form.startDate && form.endDate) {
      if (new Date(form.endDate) <= new Date(form.startDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }
    
    if (form.lastEnrollmentDate && form.startDate) {
      if (new Date(form.lastEnrollmentDate) >= new Date(form.startDate)) {
        newErrors.lastEnrollmentDate = "Last enrollment must be before start date";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === 'tags') {
        const tagsArray = form.tags.split(",").map(t => t.trim()).filter(t => t);
        fd.append("tags", JSON.stringify(tagsArray));
      } else {
        fd.append(key, form[key]);
      }
    });

    fd.append("image", image);

    try {
      await axios.post(API_URL, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ submit: err.response?.data?.message || "Failed to create hackathon" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Header */}
        <div 
          className="sticky top-0 z-10 px-6 py-4 border-b flex justify-between items-center"
          style={{ backgroundColor: '#ffffff', borderColor: '#F0F4F5' }}
        >
          <h2 
            className="text-2xl font-bold" 
            style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}
          >
            Add New Hackathon
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: '#6C757D' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-5">
          
          {/* Error Alert */}
          {errors.submit && (
            <div 
              className="p-4 rounded-lg flex items-start gap-3"
              style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
            >
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{errors.submit}</span>
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 
              className="text-sm font-semibold mb-3 uppercase tracking-wide"
              style={{ color: '#03594E', fontFamily: 'var(--it-ff-heading)' }}
            >
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                  Title <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  name="title"
                  placeholder="Enter hackathon title"
                  onChange={handleChange}
                  value={form.title}
                  className="w-full px-4 py-3 rounded-lg border transition-colors"
                  style={{ 
                    borderColor: errors.title ? '#DC2626' : '#D9D9D9',
                    color: '#0C121D',
                    fontFamily: 'var(--it-ff-body)'
                  }}
                />
                {errors.title && (
                  <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                    Category <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    name="category"
                    placeholder="e.g., Web Development"
                    onChange={handleChange}
                    value={form.category}
                    className="w-full px-4 py-3 rounded-lg border transition-colors"
                    style={{ 
                      borderColor: errors.category ? '#DC2626' : '#D9D9D9',
                      color: '#0C121D',
                      fontFamily: 'var(--it-ff-body)'
                    }}
                  />
                  {errors.category && (
                    <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                    Prize Pool (₹) <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    name="prizePool"
                    type="number"
                    placeholder="50000"
                    onChange={handleChange}
                    value={form.prizePool}
                    className="w-full px-4 py-3 rounded-lg border transition-colors"
                    style={{ 
                      borderColor: errors.prizePool ? '#DC2626' : '#D9D9D9',
                      color: '#0C121D',
                      fontFamily: 'var(--it-ff-body)'
                    }}
                  />
                  {errors.prizePool && (
                    <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.prizePool}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  placeholder="AI, Machine Learning, Python"
                  onChange={handleChange}
                  value={form.tags}
                  className="w-full px-4 py-3 rounded-lg border transition-colors"
                  style={{ 
                    borderColor: '#D9D9D9',
                    color: '#0C121D',
                    fontFamily: 'var(--it-ff-body)'
                  }}
                />
                <p className="text-xs mt-1" style={{ color: '#6C757D' }}>
                  Separate tags with commas
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 
              className="text-sm font-semibold mb-3 uppercase tracking-wide"
              style={{ color: '#03594E', fontFamily: 'var(--it-ff-heading)' }}
            >
              Schedule
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                  Start Date <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  value={form.startDate}
                  className="w-full px-4 py-3 rounded-lg border transition-colors"
                  style={{ 
                    borderColor: errors.startDate ? '#DC2626' : '#D9D9D9',
                    color: '#0C121D',
                    fontFamily: 'var(--it-ff-body)'
                  }}
                />
                {errors.startDate && (
                  <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                  End Date <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  value={form.endDate}
                  className="w-full px-4 py-3 rounded-lg border transition-colors"
                  style={{ 
                    borderColor: errors.endDate ? '#DC2626' : '#D9D9D9',
                    color: '#0C121D',
                    fontFamily: 'var(--it-ff-body)'
                  }}
                />
                {errors.endDate && (
                  <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.endDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                  Last Enrollment <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="date"
                  name="lastEnrollmentDate"
                  onChange={handleChange}
                  value={form.lastEnrollmentDate}
                  className="w-full px-4 py-3 rounded-lg border transition-colors"
                  style={{ 
                    borderColor: errors.lastEnrollmentDate ? '#DC2626' : '#D9D9D9',
                    color: '#0C121D',
                    fontFamily: 'var(--it-ff-body)'
                  }}
                />
                {errors.lastEnrollmentDate && (
                  <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.lastEnrollmentDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div>
            <h3 
              className="text-sm font-semibold mb-3 uppercase tracking-wide"
              style={{ color: '#03594E', fontFamily: 'var(--it-ff-heading)' }}
            >
              Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                  About
                </label>
                <textarea
                  name="about"
                  placeholder="Tell us about this hackathon..."
                  onChange={handleChange}
                  value={form.about}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
                  style={{ 
                    borderColor: '#D9D9D9',
                    color: '#0C121D',
                    fontFamily: 'var(--it-ff-body)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#0C121D' }}>
                  Prize Details
                </label>
                <textarea
                  name="prizeDetails"
                  placeholder="Describe the prize distribution..."
                  onChange={handleChange}
                  value={form.prizeDetails}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
                  style={{ 
                    borderColor: '#D9D9D9',
                    color: '#0C121D',
                    fontFamily: 'var(--it-ff-body)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <h3 
              className="text-sm font-semibold mb-3 uppercase tracking-wide"
              style={{ color: '#03594E', fontFamily: 'var(--it-ff-heading)' }}
            >
              Cover Image <span style={{ color: '#DC2626' }}>*</span>
            </h3>
            
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-lg shadow-lg transition-colors"
                    style={{ backgroundColor: '#ffffff', color: '#DC2626' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ borderColor: errors.image ? '#DC2626' : '#D9D9D9' }}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-12 h-12 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#6C757D"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm" style={{ color: '#6C757D' }}>
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs" style={{ color: '#6C757D' }}>
                      PNG, JPG, WEBP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              )}
              {errors.image && (
                <p className="text-xs" style={{ color: '#DC2626' }}>{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="sticky bottom-0 px-6 py-4 border-t flex justify-end gap-3"
          style={{ backgroundColor: '#ffffff', borderColor: '#F0F4F5' }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: '#F0F4F5',
              color: '#6C757D',
              fontFamily: 'var(--it-ff-heading)'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: '#03594E',
              color: '#ffffff',
              fontFamily: 'var(--it-ff-heading)'
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Hackathon'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHackathonModal;