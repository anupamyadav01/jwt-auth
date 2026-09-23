import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Settings,
  FileText,
  ShieldCheck,
  LogOut,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "../../axiosInstance";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const response = await axiosInstance.get("/admin");
        setAdminData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    getAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const adminActions = [
    { title: "Manage Users", desc: "Add, edit, or remove users", icon: Users },
    {
      title: "System Settings",
      desc: "Configure system preferences",
      icon: Settings,
    },
    { title: "View Logs", desc: "Access system audit logs", icon: FileText },
    {
      title: "Security Settings",
      desc: "Manage security configurations",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-tight text-indigo-600">
              JWT Auth
            </span>
            <span className="text-slate-300">|</span>
            <h1 className="text-lg font-bold text-slate-800">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/manager")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>Manager View</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>User View</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome, {user?.name || adminData?.user?.name || "Admin"}!
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            You have full system control and privileges across all resources.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Users
            </p>
            <p className="mt-2 text-3xl font-extrabold text-indigo-600">100</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Tasks
            </p>
            <p className="mt-2 text-3xl font-extrabold text-blue-600">15</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Access Level
            </p>
            <p className="mt-2 text-lg font-bold text-emerald-600">
              Full System
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              System Status
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              <span>Operational</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Admin Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {adminActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <div
                    key={idx}
                    className="flex cursor-pointer items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">
                        {action.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Admin Information
            </h3>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="font-semibold text-slate-800">
                  {user?.name || "Admin"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-semibold text-slate-800">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Role</p>
                <span className="inline-block rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 capitalize">
                  {user?.role || "admin"}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Admin Access Level: You have complete access to manage all
                  aspects of the application.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
