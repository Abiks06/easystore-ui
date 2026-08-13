export default function ContactPage() {
  return (
    <main className="py-24 px-6 flex justify-center min-h-[70vh]">
      <div className="max-w-lg w-full glass-card rounded-3xl p-10 anim-fade-up">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Get in Touch</h1>
        <p className="text-slate-500 mb-8">We'd love to hear from you. Send us a message!</p>
        
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none" placeholder="How can we help?" />
          </div>
          <button type="button" className="mt-2 w-full py-4 bg-slate-900 text-white rounded-xl font-semibold shadow-lg hover:bg-violet-600 hover:shadow-violet-200 transition-all duration-300">
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
