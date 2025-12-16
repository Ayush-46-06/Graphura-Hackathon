import Transaction from "../model/Transaction.model.js";

export const createTransaction = async (req, res) => {
  const transaction = await Transaction.create({
    user: req.user._id,
    ...req.body
  });

  res.status(201).json({
    success: true,
    data: transaction
  });
};

export const updateTransactionStatus = async (req, res) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    data: transaction
  });
};

export const getMyTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.json({ success: true, data: transactions });
};

export const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find()
    .populate("user", "name email");

  res.json({ success: true, data: transactions });
};
