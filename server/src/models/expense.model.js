import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tracker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tracker",
      required: true,
    },
    merchant: {
      type: String,
      required: [true, "Merchant is required"],
      trim: true,
      maxlength: [100, "Merchant must be at most 100 characters"],
    },
    normalizedMerchant: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [50, "Category must be at most 50 characters"],
    },
    paymentMethod: {
      type: String,
      trim: true,
      default: "Cash",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [300, "Note must be at most 300 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.index({ user: 1, tracker: 1, date: -1 });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;