import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";
import {
  clearAuthData,
  getUser,
  setAuthData,
  getToken,
} from "../utils/authStorage";

function DashboardPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);

        const token = getToken();
        if (token) {
          setAuthData({
            token,
            user: data.user,
          });
        }
      } catch (err) {
        console.error("Dashboard /me error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load user");
        clearAuthData();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-zinc-400 mt-1">
              Welcome back, {user?.name || "User"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-2 hover:border-violet-500 transition"
          >
            Logout
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold mb-2">Protected Auth Working</h2>
          <p className="text-zinc-400">
            Your dashboard is now verified through the backend.
          </p>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;