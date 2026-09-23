import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import axiosInstance from "../../axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      console.log("this is the reaponse", res);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role?.toLowerCase();
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "manager") {
        navigate("/manager");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-400 mb-4 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Please enter your credentials to log in
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 flex items-center gap-3 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm">
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm transition placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm transition placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium text-sm text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Signing in...</span>
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-400 hover:text-indigo-300 transition"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
