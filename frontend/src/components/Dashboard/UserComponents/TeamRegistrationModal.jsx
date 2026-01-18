import { useState } from "react";
import axios from "axios";
import openRazorpayPayment from "../../Payment";

const TeamRegistrationModal = ({
  hackathon,
  onClose,
  onSuccessComplete,
}) => {
  const token = localStorage.getItem("token");

  const [emails, setEmails] = useState([""]);
  const [loading, setLoading] = useState(false);

  /* ================= ADD FIELD ================= */
  const addEmailField = () => {
    if (emails.length < hackathon.maxTeamSize - 1) {
      setEmails([...emails, ""]);
    }
  };

  /* ================= UPDATE FIELD ================= */
  const updateEmail = (index, value) => {
    const copy = [...emails];
    copy[index] = value;
    setEmails(copy);
  };

  /* ================= ADD MEMBERS ================= */
  const addMembers = async () => {
    const memberEmails = emails
      .map((e) => e.trim())
      .filter(Boolean);

    if (memberEmails.length === 0) return;

    await axios.post(
      "/api/hackathon/register/team/add-member",
      {
        hackathonId: hackathon._id,
        memberEmails,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  /* ================= SUBMIT ================= */
  const submitTeam = async () => {
    setLoading(true);
    try {
      /* 1️⃣ CREATE TEAM */
      await axios.post(
        "/api/hackathon/register/team/create",
        { hackathonId: hackathon._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      /* 2️⃣ CLOSE MODAL IMMEDIATELY */
      onClose();

      /* 3️⃣ PAID FLOW */
      if (hackathon.isPaid) {
        openRazorpayPayment({
          hackathonId: hackathon._id,
          token,
          onSuccess: async () => {
            await addMembers();        // ✅ AFTER PAYMENT
            onSuccessComplete();       // parent handles alert/navigation
          },
        });
      }
      /* 4️⃣ FREE FLOW */
      else {
        await addMembers();
        onSuccessComplete();
      }

    } catch (err) {
      alert(err.response?.data?.message || "Team creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Team</h2>

        <p className="text-sm text-gray-500 mb-3">
          Enter <b>email addresses</b> of team members
        </p>

        {emails.map((email, i) => (
          <input
            key={i}
            type="email"
            value={email}
            onChange={(e) => updateEmail(i, e.target.value)}
            placeholder="member@email.com"
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />
        ))}

        {emails.length < hackathon.maxTeamSize - 1 && (
          <button
            onClick={addEmailField}
            className="text-sm text-teal-600 mb-4"
          >
            + Add member
          </button>
        )}

        <button
          onClick={submitTeam}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Processing..." : "Create Team"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TeamRegistrationModal;
