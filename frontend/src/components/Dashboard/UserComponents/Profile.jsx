import { useEffect, useState } from "react";
import {
  Edit2,
  Save,
  X,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  MapPin,
  Building2,
  User,
  Calendar,
  CheckCircle,
  Camera
} from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
const [imagePreview, setImagePreview] = useState(null);


  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const API = "http://localhost:5001/api/user/profile";

    fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.data);
        setOriginalProfile(data.data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess(false);
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};

    if (!profile.name || !profile.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!profile.address || !profile.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!profile.contactNumber || !/^\d{10}$/.test(profile.contactNumber)) {
      newErrors.contactNumber = "Valid 10-digit contact number required";
    }

    if (!profile.university) {
      newErrors.university = "University is required";
    }

    if (!profile.college) {
      newErrors.college = "College is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SAVE PROFILE ================= */
  const handleSubmit = async () => {
  if (!validateForm()) return;

  setLoading(true);
  setSuccess(false);

  const token = localStorage.getItem("token");
  const API = "http://localhost:5001/api/user/profile";

  try {
    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("address", profile.address);
    formData.append("contactNumber", profile.contactNumber);
    formData.append("university", profile.university);

    // 🔥 IMPORTANT FIX
    formData.append("collegeName", profile.college);

    formData.append("courseName", profile.courseName || "");
    formData.append("yearOfStudy", profile.yearOfStudy || "");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(API, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // ❗ NO Content-Type
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    setProfile(data.data);
    setOriginalProfile(data.data);
    setIsEditing(false);
    setSuccess(true);
    setImageFile(null);
    setImagePreview(null);

    setTimeout(() => setSuccess(false), 3000);
  } catch (err) {
    setErrors({ submit: err.message });
  } finally {
    setLoading(false);
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
};

  /* ================= CANCEL EDIT ================= */
  const handleCancel = () => {
    setProfile(originalProfile);
    setErrors({});
    setSuccess(false);
    setIsEditing(false);
  };

  /* ================= LOADING ================= */
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4">
            <User size={18} className="text-teal-600" />
            <span className="text-sm font-semibold text-gray-700">My Profile</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl flex items-center justify-center gap-3 animate-slideDown shadow-lg">
            <CheckCircle size={24} />
            <p className="font-bold text-lg">Profile updated successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT CARD - Profile Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] -z-0"></div>
            
            {/* Avatar */}
           <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center mb-4 relative">
  {imagePreview || profile.image ? (
    <img
      src={imagePreview || `http://localhost:5001/${profile.image}`}
      alt="profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white text-4xl font-bold">
      {profile.name?.charAt(0).toUpperCase() || "U"}
    </span>
  )}

  {isEditing && (
    <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
      <Camera size={16} className="text-teal-600" />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  )}
</div>


            {/* Info Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm text-gray-900 font-semibold truncate">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Phone</p>
                  <p className="text-sm text-gray-900 font-semibold">{profile.contactNumber}</p>
                </div>
              </div>

              {profile.courseName && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Course</p>
                    <p className="text-sm text-gray-900 font-semibold truncate">{profile.courseName}</p>
                  </div>
                </div>
              )}

              {profile.yearOfStudy && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Year</p>
                    <p className="text-sm text-gray-900 font-semibold">{profile.yearOfStudy}</p>
                  </div>
                </div>
              )}
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full py-3 bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D] text-white rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg hover:scale-105 transition-transform"
              >
                <Edit2 size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* RIGHT CARD - Edit Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-500 mt-1">Update your details below</p>
              </div>
              {isEditing && (
                <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <X className="text-gray-500" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <User size={16} className="text-teal-600" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={profile.name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                    isEditing 
                      ? 'border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  } ${errors.name ? 'border-red-500' : ''} outline-none`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.name}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <MapPin size={16} className="text-teal-600" />
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="address"
                  value={profile.address || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your address"
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                    isEditing 
                      ? 'border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  } ${errors.address ? 'border-red-500' : ''} outline-none`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.address}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Phone size={16} className="text-teal-600" />
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="contactNumber"
                  value={profile.contactNumber || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="10-digit phone number"
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                    isEditing 
                      ? 'border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  } ${errors.contactNumber ? 'border-red-500' : ''} outline-none`}
                />
                {errors.contactNumber && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.contactNumber}</p>}
              </div>

              {/* University & College Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Building2 size={16} className="text-teal-600" />
                    University <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="university"
                    value={profile.university || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="University name"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                      isEditing 
                        ? 'border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 bg-white' 
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                    } ${errors.university ? 'border-red-500' : ''} outline-none`}
                  />
                  {errors.university && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.university}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <GraduationCap size={16} className="text-teal-600" />
                    College <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="college"
                    value={profile.college || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="College name"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                      isEditing 
                        ? 'border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 bg-white' 
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                    } ${errors.college ? 'border-red-500' : ''} outline-none`}
                  />
                  {errors.college && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><span>⚠️</span>{errors.college}</p>}
                </div>
              </div>

              {/* Course & Year Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <BookOpen size={16} className="text-teal-600" />
                    Course Name
                  </label>
                  <input
                    name="courseName"
                    value={profile.courseName || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., Computer Science"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                      isEditing 
                        ? 'border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 bg-white' 
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                    } outline-none`}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Calendar size={16} className="text-teal-600" />
                    Year of Study
                  </label>
                  <input
                    name="yearOfStudy"
                    value={profile.yearOfStudy || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., 2nd Year"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                      isEditing 
                        ? 'border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 bg-white' 
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                    } outline-none`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {errors.submit && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700 font-medium">{errors.submit}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;