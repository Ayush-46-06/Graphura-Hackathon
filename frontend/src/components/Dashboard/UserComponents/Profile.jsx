import { useEffect, useState } from "react";
import { Camera, Edit2, Save, X, Phone, Mail, Building2, BookOpen, GraduationCap, Calendar } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        setPreview(data.data?.image || null);
      })
      .catch((err) => console.error("Error fetching profile:", err));
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
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    const token = localStorage.getItem("token");
    const API = "http://localhost:5001/api/user/profile";

    try {
      const fd = new FormData();

      fd.append("name", profile.name);
      fd.append("contactNumber", profile.contactNumber || "");
      fd.append("university", profile.university || "");
      fd.append("college", profile.college || "");
      fd.append("courseName", profile.courseName || "");
      fd.append("yearOfStudy", profile.yearOfStudy || "");

      if (image) {
        fd.append("image", image);
      }

      const response = await fetch(API, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSuccess(true);
      setIsEditing(false);
      setImage(null);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ submit: err.message || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    setSuccess(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3 animate-pulse">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
            <p className="text-green-800 font-medium">Profile updated successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT CARD - Profile Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center lg:sticky lg:top-8 h-fit">
            <div className="relative inline-block mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg">
                <img
                  src={preview || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=4F46E5&color=fff&size=200`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {isEditing && (
                <label className="absolute bottom-0 right-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition shadow-lg">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <Camera className="w-5 h-5" />
                </label>
              )}
            </div>

            {errors.image && (
              <p className="text-red-500 text-sm mb-3">{errors.image}</p>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-2">{profile.name}</h2>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <Mail className="w-4 h-4" />
              <p className="text-sm">{profile.email}</p>
            </div>
            {profile.contactNumber && (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <p className="text-sm">{profile.contactNumber}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3 text-left">
                {profile.university && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">University</p>
                      <p className="text-sm font-medium text-gray-800">{profile.university}</p>
                    </div>
                  </div>
                )}
                {profile.college && (
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">College</p>
                      <p className="text-sm font-medium text-gray-800">{profile.college}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* RIGHT CARD - Profile Details */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
              {isEditing && (
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              
              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  name="name"
                  value={profile.name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition ${
                    isEditing 
                      ? 'border-gray-200 focus:border-indigo-500 focus:outline-none bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  } ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* CONTACT */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                <input
                  name="contactNumber"
                  value={profile.contactNumber || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition ${
                    isEditing 
                      ? 'border-gray-200 focus:border-indigo-500 focus:outline-none bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  } ${errors.contactNumber ? 'border-red-500' : ''}`}
                />
                {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
              </div>

              {/* UNIVERSITY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">University</label>
                <input
                  name="university"
                  value={profile.university || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your university name"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition ${
                    isEditing 
                      ? 'border-gray-200 focus:border-indigo-500 focus:outline-none bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  }`}
                />
              </div>

              {/* COLLEGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College/School</label>
                <input
                  name="college"
                  value={profile.college || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your college or school name"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition ${
                    isEditing 
                      ? 'border-gray-200 focus:border-indigo-500 focus:outline-none bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  }`}
                />
              </div>

              {/* COURSE NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
                <input
                  name="courseName"
                  value={profile.courseName || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Computer Science, Engineering"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition ${
                    isEditing 
                      ? 'border-gray-200 focus:border-indigo-500 focus:outline-none bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  }`}
                />
              </div>

              {/* YEAR OF STUDY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year of Study</label>
                <input
                  name="yearOfStudy"
                  value={profile.yearOfStudy || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., 1st Year, 2nd Year"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition ${
                    isEditing 
                      ? 'border-gray-200 focus:border-indigo-500 focus:outline-none bg-white' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600'
                  }`}
                />
              </div>

              {/* SUBMIT BUTTONS */}
              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-8 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {errors.submit && (
                <p className="text-red-500 text-sm text-center">{errors.submit}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;