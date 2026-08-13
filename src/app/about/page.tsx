import { Tag, Star, Truck, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Star className="w-6 h-6 text-amber-500" />,
      title: "Premium Quality",
      desc: "Top-tier products sourced from the best manufacturers around the world.",
      color: "bg-amber-100/50",
    },
    {
      icon: <Heart className="w-6 h-6 text-fuchsia-500" />,
      title: "Curated Selection",
      desc: "Every item is hand-picked by our team to ensure it meets our standard of excellence.",
      color: "bg-fuchsia-100/50",
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-500" />,
      title: "Fast Delivery",
      desc: "Orders are packed with care and dispatched quickly to get to your door.",
      color: "bg-emerald-100/50",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-500" />,
      title: "Satisfaction Guaranteed",
      desc: "Not happy? We'll make it right. Our hassle-free return policy ensures you get what you love.",
      color: "bg-sky-100/50",
    },
  ];

  const stats = [
    { value: "10k+", label: "Happy Customers" },
    { value: "1,000+", label: "Premium Products" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <main className="py-20 px-6">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center mb-24 anim-fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          About <span className="brand-shimmer">Abiks' Store</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          We believe shopping for the best lifestyle products should be an elevated, seamless experience.
          That's why we curate a wide range of premium electronics, beauty essentials, home goods, and beyond.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto mb-24 glass rounded-3xl p-10 anim-slide-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-extrabold text-violet-700 tracking-tight">{value}</p>
              <p className="text-sm text-slate-500 mt-2 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">What we stand for</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={v.title} className={`anim-slide-up p-8 rounded-3xl border border-white/40 shadow-sm glass-card hover:-translate-y-1 transition-transform`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${v.color}`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{v.title}</h3>
              <p className="text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
