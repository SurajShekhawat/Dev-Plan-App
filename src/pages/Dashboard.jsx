import { useAuth } from "../features/auth/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Welcome, {user.email}</h1>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
