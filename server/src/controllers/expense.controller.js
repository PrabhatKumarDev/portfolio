import Expense from "../models/expense.model.js";
import Tracker from "../models/tracker.model.js";
import normalizeMerchant from "../utils/normalizeMerchant.js";

export const createExpense = async (req, res) => {
  try {
    const { trackerId, merchant, amount, category, paymentMethod, date, note } = req.body;

    if (!trackerId || !merchant || !amount || !category || !date) {
      return res.status(400).json({
        message: "Tracker, merchant, amount, category, and date are required",
      });
    }

    const tracker = await Tracker.findOne({
      _id: trackerId,
      user: req.user._id,
    });

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found",
      });
    }

    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        message: "Amount must be a valid number greater than 0",
      });
    }

    const expense = await Expense.create({
      user: req.user._id,
      tracker: tracker._id,
      merchant: merchant.trim(),
      normalizedMerchant: normalizeMerchant(merchant),
      amount: parsedAmount,
      category: category.trim(),
      paymentMethod: paymentMethod?.trim() || "Cash",
      date,
      note: note?.trim() || "",
    });

    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error("Create expense error:", error.message);
    return res.status(500).json({
      message: "Server error while creating expense",
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { trackerId } = req.query;

    const filter = { user: req.user._id };

    if (trackerId) {
      const tracker = await Tracker.findOne({
        _id: trackerId,
        user: req.user._id,
      });

      if (!tracker) {
        return res.status(404).json({
          message: "Tracker not found",
        });
      }

      filter.tracker = trackerId;
    }

    const expenses = await Expense.find(filter)
      .populate("tracker", "name color isDefault")
      .sort({
        date: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error("Get expenses error:", error.message);
    return res.status(500).json({
      message: "Server error while fetching expenses",
    });
  }
};