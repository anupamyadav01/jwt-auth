import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, LogOut, ShieldAlert, ExternalLink } from "lucide-react";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user?.role?.toLowerCase();

  const [teamMembers] = useState([
    { id: 1, name: "Rahul Sharma", role: "Developer", status: "Active" },
    { id: 2, name: "Priya Singh", role: "Designer", status: "Active" },
    { id: 3, name: "Amit Kumar", role: "Developer", status: "Away" },
  ]);

  const [tasks] = useState([
    {
      id: 1,
      title: "Complete project documentation",
      assignedTo: "Rahul Sharma",
      status: "Pending",
    },
    {
      id: 2,
      title: "Review UI changes",
      assignedTo: "Priya Singh",
      status: "Completed",
    },
  ]);

  const activities = [
    "Approved project proposal from Team A",
    "Reviewed performance reports",
    "Scheduled team meeting for next week",
    "Assigned new tasks to team members",
  ];

  const [search, setSearch] = useState("");
  const [showTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({ title: "", assignedTo: "" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
              Manager Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>View User Dashboard</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {userRole === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Go to Admin Dashboard</span>
              </button>
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome, {user?.name || "Manager"}!
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your team effectively and track ongoing tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Team Members
            </p>
            <p className="mt-2 text-3xl font-extrabold text-blue-600">
              {teamMembers.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Members
            </p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-600">
              {teamMembers.filter((m) => m.status === "Active").length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Tasks
            </p>
            <p className="mt-2 text-3xl font-extrabold text-indigo-600">
              {tasks.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Tasks
            </p>
            <p className="mt-2 text-3xl font-extrabold text-amber-600">
              {tasks.filter((t) => t.status === "Pending").length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Team Members
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search member..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Rahul Sharma
                  </p>
                  <p className="text-xs text-slate-500">Developer</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Priya Singh
                  </p>
                  <p className="text-xs text-slate-500">Designer</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Amit Kumar
                  </p>
                  <p className="text-xs text-slate-500">Developer</p>
                </div>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
                  Away
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Recent Activities
            </h3>
            <ul className="space-y-3">
              {activities.map((act, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-xs text-slate-600"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">
              Assigned Tasks
            </h3>
            <button className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">
              <Plus className="h-4 w-4" />
              <span>{showTaskForm ? "Cancel" : "Assign Task"}</span>
            </button>
          </div>

          {showTaskForm && (
            <form className="flex flex-wrap gap-3 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="text"
                placeholder="Task description..."
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                className="flex-1 min-w-[200px] px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
              />
              <select
                value={taskData.assignedTo}
                onChange={(e) =>
                  setTaskData({ ...taskData, assignedTo: e.target.value })
                }
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none bg-white"
              >
                <option value="">Select Assignee</option>
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
              >
                Save
              </button>
            </form>
          )}

          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    Assigned to: {task.assignedTo}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    task.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                      : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
