const THEME_KEY = "expense_tracker_theme";

export const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || "dark";
};

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};