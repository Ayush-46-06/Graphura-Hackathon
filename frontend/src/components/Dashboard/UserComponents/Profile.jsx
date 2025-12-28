import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5001/api/user/profile";

const Profile = () => {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    axios
      .get(API, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data.data);
        setPreview(res.data.data?.image || null);
      })
      .catch(console.error);
  }, []);

  /* ================= INPUT HANDLERS ================= */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setSuccess(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Only image files are allowed" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: "Image size should be less than 5MB" });
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setErrors({ ...errors, image: "" });
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};
    
    if (!profile.name || !profile.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (profile.contactNumber && !/^\d{10}$/.test(profile.contactNumber.replace(/\s/g, ""))) {
      newErrors.contactNumber = "Please enter a valid 10-digit phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SAVE PROFILE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(false);

    try {
      const fd = new FormData();

      fd.append("name", profile.name);
      fd.append("contactNumber", profile.contactNumber || "");
      fd.append("university", profile.university || "");

      if (image) {
        fd.append("image", image);
      }

      await axios.put(API, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setImage(null);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Failed to update profile" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7F9' }}>
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" 
               style={{ borderColor: '#03594E', borderTopColor: 'transparent' }}></div>
          <p className="mt-4 text-lg" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-heading)' }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7F9' }}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" 
              style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}>
            My Profile
          </h1>
          <p className="text-base" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
            Manage your personal information
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div 
            className="mb-6 p-4 rounded-lg flex items-center gap-3 animate-pulse"
            style={{ backgroundColor: '#E8F5E9', color: '#1AB69D' }}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium" style={{ fontFamily: 'var(--it-ff-body)' }}>
              Profile updated successfully!
            </span>
          </div>
        )}

        {/* Error Alert */}
        {errors.submit && (
          <div 
            className="mb-6 p-4 rounded-lg flex items-start gap-3"
            style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium" style={{ fontFamily: 'var(--it-ff-body)' }}>
              {errors.submit}
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div 
            className="lg:col-span-1 rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-4">
                <div 
                  className="w-32 h-32 rounded-full overflow-hidden border-4"
                  style={{ borderColor: '#03594E' }}
                >
                  <img
                    src={
                      preview ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=03594E&color=fff&size=200`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Edit Button */}
                <label 
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ backgroundColor: '#03594E', color: '#ffffff' }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>

              {errors.image && (
                <p className="text-xs mb-3" style={{ color: '#DC2626' }}>
                  {errors.image}
                </p>
              )}

              {/* Name & Email */}
              <h2 
                className="text-xl font-bold mb-1" 
                style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}
              >
                {profile.name}
              </h2>
              <p className="text-sm mb-4" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                {profile.email}
              </p>

              {/* Stats */}
              <div className="pt-4 border-t" style={{ borderColor: '#F0F4F5' }}>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#03594E', fontFamily: 'var(--it-ff-heading)' }}>
                      0
                    </p>
                    <p className="text-xs" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                      Hackathons
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#F8C62F', fontFamily: 'var(--it-ff-heading)' }}>
                      0
                    </p>
                    <p className="text-xs" style={{ color: '#6C757D', fontFamily: 'var(--it-ff-body)' }}>
                      Projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div 
            className="lg:col-span-2 rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: '#ffffff' }}
          >
            <h3 
              className="text-xl font-bold mb-6" 
              style={{ color: '#0C121D', fontFamily: 'var(--it-ff-heading)' }}
            >
              Personal Information
            </h3>

            <div onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#0C121D', fontFamily: 'var(--it-ff-body)' }}
                >
                  Full Name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#6C757D">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    name="name"
                    value={profile.name || ""}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border transition-all"
                    style={{ 
                      borderColor: errors.name ? '#DC2626' : '#D9D9D9',
                      color: '#0C121D',
                      fontFamily: 'var(--it-ff-body)'
                    }}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#0C121D', fontFamily: 'var(--it-ff-body)' }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#6C757D">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    value={profile.email || ""}
                    disabled
                    className="w-full pl-12 pr-4 py-3 rounded-lg border cursor-not-allowed"
                    style={{ 
                      borderColor: '#D9D9D9',
                      backgroundColor: '#F0F4F5',
                      color: '#6C757D',
                      fontFamily: 'var(--it-ff-body)'
                    }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: '#6C757D' }}>
                  Email cannot be changed
                </p>
              </div>

              {/* Contact Number */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#0C121D', fontFamily: 'var(--it-ff-body)' }}
                >
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#6C757D">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    name="contactNumber"
                    value={profile.contactNumber || ""}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border transition-all"
                    style={{ 
                      borderColor: errors.contactNumber ? '#DC2626' : '#D9D9D9',
                      color: '#0C121D',
                      fontFamily: 'var(--it-ff-body)'
                    }}
                  />
                </div>
                {errors.contactNumber && (
                  <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* University */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#0C121D', fontFamily: 'var(--it-ff-body)' }}
                >
                  University / Institution
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#6C757D">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    name="university"
                    value={profile.university || ""}
                    onChange={handleChange}
                    placeholder="Enter your university name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border transition-all"
                    style={{ 
                      borderColor: '#D9D9D9',
                      color: '#0C121D',
                      fontFamily: 'var(--it-ff-body)'
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: '#03594E',
                    color: '#ffffff',
                    fontFamily: 'var(--it-ff-heading)'
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving Changes...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;