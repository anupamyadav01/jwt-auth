// src/pages/Unauthorized.jsx
import { useNavigate } from "react-router-dom";
import { ShieldX } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const role = user?.role?.toLowerCase();

    if (role === "admin") navigate("/admin");
    else if (role === "manager") navigate("/manager");
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldX className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          403 - Access Denied
        </h2>
        <p className="text-slate-500 text-sm mt-2 mb-6">
          You do not have permission to view this resource. Your role does not
          grant access to this route.
        </p>
        <button
          onClick={handleBack}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition"
        >
          Return to My Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
