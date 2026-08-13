export default function LoginPage() {
  return (
    <main className="py-24 px-6 flex justify-center min-h-[70vh] items-center">
      <div className="max-w-md w-full glass-card rounded-3xl p-10 anim-slide-up">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-slate-500 mb-8 text-center text-sm">Sign in to your account</p>
        
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" placeholder="you@example.com" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs text-violet-600 font-medium">Forgot?</a>
            </div>
            <input type="password" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" placeholder="••••••••" />
          </div>
          <button type="button" className="mt-4 w-full py-4 bg-linear-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl font-semibold shadow-lg shadow-violet-200 hover:scale-[1.02] transition-transform duration-300">
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? <a href="#" className="font-semibold text-violet-600">Sign up</a>
        </div>
      </div>
    </main>
  );
}
