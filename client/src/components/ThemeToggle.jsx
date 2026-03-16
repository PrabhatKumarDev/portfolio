function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-white hover:border-violet-500"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;