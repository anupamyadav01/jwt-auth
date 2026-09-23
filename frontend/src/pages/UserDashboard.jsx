import { useNavigate } from "react-router-dom";
import { LogOut, ClipboardList, ShieldAlert, Briefcase } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user?.role?.toLowerCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-tight text-indigo-600">
              JWT Auth
            </span>
            <span className="text-slate-300">|</span>
            <h1 className="text-lg font-bold text-slate-800">User Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            {userRole === "manager" && (
              <button
                onClick={() => navigate("/manager")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>Go to Manager Dashboard</span>
              </button>
            )}

            {userRole === "admin" && (
              <>
                <button
                  onClick={() => navigate("/manager")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>Go to Manager Dashboard</span>
                </button>
                <button
                  onClick={() => navigate("/admin")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Go to Admin Dashboard</span>
                </button>
              </>
            )}

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

      <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome, {user?.name || "User"}!
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            User Access Level: You have standard access to view your assigned
            tasks and profile details.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  My Tasks
                </p>
                <h2 className="mt-2 text-4xl font-extrabold text-indigo-600">
                  5
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ClipboardList className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">Tasks assigned to you</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Your Information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-500">Name:</span>
                <p className="font-semibold text-slate-800">
                  {user?.name || "Standard User"}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Email:</span>
                <p className="font-semibold text-slate-800">
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Role:</span>
                <div>
                  <span className="inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 capitalize">
                    {user?.role || "user"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Assigned Tasks
          </h3>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Pending Assignment
              </p>
              <p className="text-xs text-slate-500">
                You currently have 5 tasks awaiting review or submission.
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-600/20">
              5 Active
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
