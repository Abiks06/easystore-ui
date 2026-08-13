"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!isLogin && !name) {
      toast.error("Name is required to register");
      return;
    }

    // Mock authentication
    login(isLogin ? "User" : name, email);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    router.push("/");
  };

  return (
    <main className="py-24 px-6 flex justify-center min-h-[70vh] items-center">
      <div className="max-w-md w-full glass-card rounded-3xl p-10 anim-slide-up">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-slate-500 mb-8 text-center text-sm">
          {isLogin ? "Sign in to your account" : "Join us to start shopping"}
        </p>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" 
                placeholder="John Doe" 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              {isLogin && <a href="#" className="text-xs text-violet-600 font-medium">Forgot?</a>}
            </div>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="mt-4 w-full py-4 bg-linear-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl font-semibold shadow-lg shadow-violet-200 hover:scale-[1.02] transition-transform duration-300">
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-violet-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
