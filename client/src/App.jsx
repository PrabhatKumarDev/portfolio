import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { getTheme, setTheme as saveTheme } from "./utils/themeStorage";

function App() {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    saveTheme(theme);
  }, [theme]);

  return <AppRoutes theme={theme} setTheme={setTheme} />;
}

export default App;