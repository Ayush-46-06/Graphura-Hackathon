import { useState } from "react";
import api from "./api";
import { Github, Video, X, Upload, AlertCircle } from "lucide-react";

const SubmitProjectModal = ({ open, onClose, hackathonId, onSuccess }) => {
  const [githubLink, setGithubLink] = useState("");
  const [driveVideoLink, setDriveVideoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    if (!githubLink || !driveVideoLink) {
      setError("Both GitHub and Drive links are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post(`/hackathon/${hackathonId}/submit`, {
        githubLink,
        driveVideoLink
      });

      onSuccess();   // refresh MyHackathons
      onClose();     // close modal
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Submit Project</h2>
              <p className="text-emerald-100 text-sm mt-0.5">Share your work with the community</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* GitHub Link */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Github className="w-4 h-4 text-slate-600" />
              GitHub Repository
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://github.com/username/repository"
                className="w-full border-2 border-slate-200 p-3.5 pl-11 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-slate-700"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
              <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Drive Video Link */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Video className="w-4 h-4 text-slate-600" />
              Demo Video (Google Drive)
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://drive.google.com/file/..."
                className="w-full border-2 border-slate-200 p-3.5 pl-11 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-slate-700"
                value={driveVideoLink}
                onChange={(e) => setDriveVideoLink(e.target.value)}
              />
              <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-full flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-red-800 font-semibold text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Submit Project
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubmitProjectModal;