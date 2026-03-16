import Expense from "../models/expense.model.js";
import normalizeMerchant from "../utils/normalizeMerchant.js";

export const createExpense = async (req, res) => {
  try {
    const { merchant, amount, category, paymentMethod, date, note } = req.body;

    if (!merchant || !amount || !category || !date) {
      return res.status(400).json({
        message: "Merchant, amount, category, and date are required",
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
    const expenses = await Expense.find({ user: req.user._id }).sort({
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