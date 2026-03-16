import apiClient from "./apiClient";

export const createExpense = async (formData) => {
  const response = await apiClient.post("/expenses", formData);
  return response.data;
};

export const getExpenses = async (trackerId) => {
  const response = await apiClient.get("/expenses", {
    params: { trackerId },
  });
  return response.data;
};