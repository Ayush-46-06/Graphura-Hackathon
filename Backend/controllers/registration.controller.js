import Registration from "../models/Registration.model.js";
import Hackathon from "../models/Hackathon.model.js";
import { sendHackathonRegistrationMail } from "../services/mail.service.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto";
import mongoose from "mongoose";

/* ================= REGISTER FOR HACKATHON ================= */
export const registerForHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.body;
    const userId = req.user._id;

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ success: false, message: "Hackathon not found" });
    }

    if (hackathon.status === "completed") {
      return res.status(400).json({ success: false, message: "Registrations closed" });
    }

    const exists = await Registration.findOne({ user: userId, hackathon: hackathonId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Already registered" });
    }

    const registration = await Registration.create({
      user: userId,
      hackathon: hackathonId,
      participationType: hackathon.participationType,
      teamLeader: hackathon.participationType === "team" ? userId : null,
      paymentStatus: hackathon.isPaid ? "pending" : "free"
    });

    await Hackathon.findByIdAndUpdate(
      hackathonId,
      { $addToSet: { participants: userId } }
    );

    sendHackathonRegistrationMail({
      userName: req.user.name,
      userEmail: req.user.email,
      hackathonTitle: hackathon.title,
      startDate: hackathon.startDate,
      endDate: hackathon.endDate
    }).catch(() => {});

    res.status(201).json({
      success: true,
      message: hackathon.isPaid
        ? "Registration created. Complete payment to proceed"
        : "Registered successfully",
      registration
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to register" });
  }
};

/* ================= PARTICIPANTS COUNT ================= */
export const getParticipantsCount = async (req, res) => {
  try {
    const count = await Registration.countDocuments({
      hackathon: req.params.hackathonId
    });

    res.json({ success: true, data: { count } });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch count" });
  }
};

/* ================= PARTICIPANTS LIST ================= */
export const getParticipantsList = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId).select("title");
    if (!hackathon) {
      return res.status(404).json({ success: false, message: "Hackathon not found" });
    }

    const participants = await Registration.find({
      hackathon: req.params.hackathonId
    }).populate("user", "name email university");

    res.json({
      success: true,
      data: { hackathon, participants, count: participants.length }
    });

  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch participants" });
  }
};

/* ================= CREATE RAZORPAY ORDER ================= */
export const createPaidOrder = async (req, res) => {
  try {
    const { hackathonId } = req.body;
    const userId = req.user._id;

    const registration = await Registration.findOne({
      user: userId,
      hackathon: hackathonId,
      paymentStatus: "pending"
    });

    if (!registration) {
      return res.status(400).json({
        success: false,
        message: "Register first before payment"
      });
    }

    const hackathon = await Hackathon.findById(hackathonId);

    const receipt = `hack_${hackathonId
      .toString()
      .slice(-8)}_${userId.toString().slice(-6)}`;

    const order = await razorpay.orders.create({
      amount: hackathon.entryFee * 100,
      currency: "INR",
      receipt
    });

    registration.razorpayOrderId = order.id;
    await registration.save();

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Payment order failed"
    });
  }
};


export const verifyPaidRegistration = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    const registration = await Registration.findOneAndUpdate(
      { razorpayOrderId: orderId },
      {
        paymentStatus: "paid",
        status: "completed",   // ✅ VERY IMPORTANT
        razorpayPaymentId: paymentId,
        razorpaySignature: signature
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Payment successful & registration completed",
      registration
    });

  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed"
    });
  }
};

/* ================= CREATE TEAM ================= */
export const createTeamRegistration = async (req, res) => {
  try {
    const { hackathonId } = req.body;
    const userId = req.user._id;

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon || hackathon.participationType !== "team") {
      return res.status(400).json({
        success: false,
        message: "This hackathon does not support teams"
      });
    }

    const registration = await Registration.findOne({
      hackathon: hackathonId,
      user: userId
    });

    if (!registration) {
      return res.status(400).json({
        success: false,
        message: "Register for hackathon first"
      });
    }

    registration.participationType = "team";
    registration.teamLeader = userId;
    await registration.save();

    res.json({
      success: true,
      message: "Team created successfully",
      data: registration
    });

  } catch (error) {
    console.error("CREATE TEAM ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to create team" });
  }
};

/* ================= ADD TEAM MEMBERS ================= */
export const addTeamMember = async (req, res) => {
  try {
    const { hackathonId, memberId } = req.body;

    if (!Array.isArray(memberId) || memberId.length === 0) {
      return res.status(400).json({
        success: false,
        message: "memberId must be a non-empty array"
      });
    }

    const invalidId = memberId.find(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
      return res.status(400).json({
        success: false,
        message: "Invalid member ID provided"
      });
    }

    if (memberId.includes(req.user._id.toString())) {
      return res.status(400).json({
        success: false,
        message: "Team leader cannot be added as member"
      });
    }

    const registration = await Registration.findOne({
      hackathon: hackathonId,
      teamLeader: req.user._id,
      participationType: "team"
    });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: "Only team leader can add members"
      });
    }

    const hackathon = await Hackathon.findById(hackathonId);

    if (hackathon.isPaid && registration.paymentStatus !== "paid") {
      return res.status(403).json({
        success: false,
        message: "Complete payment before adding team members"
      });
    }

    if (
      registration.teamMembers.length + memberId.length >
      hackathon.maxTeamSize - 1
    ) {
      return res.status(400).json({
        success: false,
        message: `Max ${hackathon.maxTeamSize - 1} members allowed`
      });
    }

    registration.teamMembers = [
      ...new Set([
        ...registration.teamMembers.map(id => id.toString()),
        ...memberId
      ])
    ];

    await registration.save();

    res.json({
      success: true,
      message: "Team members added successfully",
      teamMembers: registration.teamMembers
    });

  } catch (error) {
    console.error("ADD TEAM MEMBER ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to add members" });
  }
};