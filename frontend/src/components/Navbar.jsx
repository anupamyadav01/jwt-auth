import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          onClick={() => {
            if (role === "admin") {
              navigate("/admin");
            } else if (role === "manager") {
              navigate("/manager");
            } else {
              navigate("/dashboard");
            }
          }}
          className="cursor-pointer text-xl font-bold text-blue-600"
        >
          HR Portal
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Admin */}
          {role === "admin" && (
            <>
              <button
                onClick={() => navigate("/admin")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive("/admin")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Admin Dashboard
              </button>

              <button
                onClick={() => navigate("/manager")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive("/manager")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Manager Dashboard
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                User Dashboard
              </button>
            </>
          )}

          {/* Manager */}
          {role === "manager" && (
            <>
              <button
                onClick={() => navigate("/manager")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive("/manager")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Manager Dashboard
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                User Dashboard
              </button>
            </>
          )}

          {/* User */}
          {role === "user" && (
            <button
              onClick={() => navigate("/dashboard")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive("/dashboard")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              My Dashboard
            </button>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          {user && (
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>

              <p className="text-xs capitalize text-gray-500">{role}</p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
