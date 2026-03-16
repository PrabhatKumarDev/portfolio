import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportExpensesToPdf = (expenses, trackerName) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`${trackerName || "Expenses"} Report`, 14, 18);

  autoTable(doc, {
    startY: 28,
    head: [["Merchant", "Amount", "Category", "Payment", "Date", "Note"]],
    body: expenses.map((expense) => [
      expense.merchant,
      `₹${expense.amount}`,
      expense.category,
      expense.paymentMethod,
      new Date(expense.date).toLocaleDateString(),
      expense.note || "",
    ]),
  });

  doc.save(`${trackerName || "expenses"}-report.pdf`);
};