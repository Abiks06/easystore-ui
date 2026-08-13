import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async auth
    setTimeout(() => {
      setLoading(false);
      // redirect or set auth state...
    }, 1200);
  };

  return (
    <main className="min-h-[calc(100vh-140px)] flex items-center justify-center py-16 px-6 bg-linear-to-b from-violet-50/60 to-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="anim-blob absolute top-10 right-10 w-72 h-72 bg-violet-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="anim-blob absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-300/20 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="anim-slide-up w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl shadow-violet-100/50 p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-slate-500 text-sm">
            {isLogin
              ? "Enter your details to access your account."
              : "Sign up to start shopping for premium stickers."}
          </p>
        </div>

        {/* Social Auth */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all text-sm">
            <FontAwesomeIcon icon={faGoogle} className="text-rose-500" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all text-sm">
            <FontAwesomeIcon icon={faApple} className="text-slate-900" />
            Apple
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs font-semibold text-slate-400 uppercase">or</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Ayomide"
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
              </span>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <FontAwesomeIcon icon={faLock} className="text-sm" />
              </span>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
              />
            </div>
            {isLogin && (
              <a href="#" className="text-xs font-semibold text-violet-600 hover:text-violet-700 self-end mt-1">
                Forgot password?
              </a>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="anim-pulse-ring mt-2 w-full flex items-center justify-center gap-2 px-7 py-3 bg-linear-to-r from-violet-600 to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setForm({ email: "", password: "", name: "" }); }}
            className="font-semibold text-violet-600 hover:text-violet-700 underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </main>
  );
}
