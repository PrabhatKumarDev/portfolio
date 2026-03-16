export const exportExpensesToCsv = (expenses, trackerName) => {
  const headers = ["Merchant", "Amount", "Category", "Payment Method", "Date", "Note"];
  const rows = expenses.map((expense) => [
    expense.merchant,
    expense.amount,
    expense.category,
    expense.paymentMethod,
    new Date(expense.date).toLocaleDateString(),
    expense.note || "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${trackerName || "expenses"}-report.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};