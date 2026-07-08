import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faStar,
  faPalette,
  faTruck,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import PageHeading from "../PageHeading";

const values = [
  {
    icon: faPalette,
    title: "Creative Designs",
    desc: "Every sticker is crafted by passionate artists who pour creativity into each design — from bold aesthetics to minimalist vibes.",
    color: "from-violet-500 to-purple-600",
    delay: "0ms",
  },
  {
    icon: faStar,
    title: "Premium Quality",
    desc: "We use only top-tier vinyl materials that are waterproof, UV-resistant, and built to last through daily adventures.",
    color: "from-amber-400 to-orange-500",
    delay: "100ms",
  },
  {
    icon: faTruck,
    title: "Fast Delivery",
    desc: "Orders are packed with love and dispatched quickly. We partner with reliable couriers to get your stickers to your door, fast.",
    color: "from-emerald-400 to-teal-500",
    delay: "200ms",
  },
  {
    icon: faShieldHalved,
    title: "Satisfaction Guaranteed",
    desc: "Not happy? We'll make it right. Our hassle-free return policy ensures you always get what you love.",
    color: "from-sky-400 to-indigo-500",
    delay: "300ms",
  },
];

const stats = [
  { value: "2,500+", label: "Happy Customers" },
  { value: "120+", label: "Unique Designs" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "4.9★", label: "Average Rating" },
];

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <PageHeading title="About Abiks' Store">
        We believe self-expression should be fun, vibrant, and accessible.
        That's why we curate premium stickers that let you personalise
        everything — laptops, water bottles, journals, and beyond.
      </PageHeading>

      {/* Stats Strip */}
      <section className="bg-linear-to-r from-violet-600 to-indigo-600 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map(({ value, label }) => (
            <div key={label} className="anim-fade-up">
              <p className="text-3xl font-extrabold tracking-tight">{value}</p>
              <p className="text-sm text-white/75 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="anim-fade-up inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-violet-200">
          <FontAwesomeIcon icon={faTags} />
          Our Story
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-5 leading-tight">
          Born from a love of{" "}
          <span className="brand-shimmer">creativity & colour</span>
        </h2>
        <p className="text-slate-500 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
          Abiks' Store started as a passion project in a small bedroom studio.
          We were frustrated that high-quality, artistic stickers were so hard
          to find — so we made our own. What began as a handful of designs
          shared with friends quickly grew into a full-fledged store loved by
          thousands of customers worldwide.
        </p>
        <p className="text-slate-500 leading-relaxed text-base md:text-lg max-w-2xl mx-auto mt-4">
          Today, we work with independent artists and designers to bring you
          fresh drops every season. Every purchase directly supports the
          creators behind the art — and helps us keep making things that spark
          joy.
        </p>
      </section>

      {/* Values Grid */}
      <section className="bg-slate-50/70 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center mb-10">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon, title, desc, color, delay }) => (
              <div
                key={title}
                className="anim-slide-up group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-violet-100 hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: delay }}
              >
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br ${color} shadow-md mb-4`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className="text-white text-base"
                  />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="anim-fade-up bg-linear-to-br from-violet-600 to-indigo-600 rounded-3xl p-10 shadow-xl shadow-violet-200">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Ready to stick with us?
          </h2>
          <p className="text-white/80 mb-7 text-sm md:text-base">
            Browse our latest collection and find your next favourite sticker.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-7 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 no-underline text-sm"
          >
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
}
