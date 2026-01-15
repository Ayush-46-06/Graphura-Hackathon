import Hackathon from "../models/Hackathon.model.js";

export const getAllHackathonsForJudge = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .select("title category status startDate endDate prizePool image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: hackathons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hackathons"
    });
  }
};

export const getHackathonParticipantsForJudge = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const hackathon = await Hackathon.findById(hackathonId)
      .populate("participants.user", "name email university");

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    res.json({
      success: true,
      data: {
        hackathonId: hackathon._id,
        title: hackathon.title,
        participants: hackathon.participants
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch participants"
    });
  }
};



export const reviewAndRankParticipant = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const { userId, rank } = req.body;
    const judgeId = req.judge._id;
    const judgeName = req.judge.name;

    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found"
      });
    }

    const participant = hackathon.participants.find(
      p => p.user.toString() === userId
    );

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    if (!participant.submittedAt) {
      return res.status(400).json({
        success: false,
        message: "Participant has not submitted project"
      });
    }

    /* ✅ Rank validation ONLY if provided */
    if (rank !== undefined) {
      if (![1, 2, 3].includes(rank)) {
        return res.status(400).json({
          success: false,
          message: "Rank must be 1, 2 or 3"
        });
      }

      /* 🚫 Prevent duplicate ranks */
      const rankAlreadyUsed = hackathon.participants.some(
        p => p.rank === rank && p.user.toString() !== userId
      );

      if (rankAlreadyUsed) {
        return res.status(400).json({
          success: false,
          message: `Rank ${rank} already assigned`
        });
      }

      participant.rank = rank;
    }

    participant.reviewedBy = judgeId;
    participant.reviewedByName = judgeName;

    await hackathon.save();

    res.json({
      success: true,
      message: rank
        ? "Participant ranked successfully"
        : "Participant reviewed successfully"
    });

  } catch (error) {
    console.error("REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to review participant"
    });
  }
};