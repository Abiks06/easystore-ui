import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faEnvelope,
  faLocationDot,
  faClock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import PageHeading from "../PageHeading";

import {
  faInstagram,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const contactInfo = [
  {
    icon: faEnvelope,
    label: "Email Us",
    value: "hello@abiksstore.com",
    href: "mailto:hello@abiksstore.com",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: faLocationDot,
    label: "Our Location",
    value: "Lagos, Nigeria 🇳🇬",
    href: null,
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: faClock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
    color: "from-emerald-400 to-teal-500",
  },
];

const socials = [
  {
    icon: faInstagram,
    label: "Instagram",
    href: "#",
    color: "hover:text-pink-600",
  },
  {
    icon: faXTwitter,
    label: "X / Twitter",
    href: "#",
    color: "hover:text-slate-800",
  },
  { icon: faTiktok, label: "TikTok", href: "#", color: "hover:text-slate-900" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async send
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <main>
      <PageHeading title="Get in Touch">
        Have a question, a custom order idea, or just want to say hi? We'd love
        to hear from you. Drop us a message and we'll get back to you quickly.
      </PageHeading>

      <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left — contact info */}
        <aside className="lg:col-span-2 flex flex-col gap-5">
          {contactInfo.map(({ icon, label, value, href, color }) => (
            <div
              key={label}
              className="anim-slide-up flex items-start gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span
                className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br ${color} shadow-md`}
              >
                <FontAwesomeIcon icon={icon} className="text-white text-sm" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-medium text-slate-700 no-underline hover:text-violet-600 transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-slate-700">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Socials */}
          <div className="anim-fade-up bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Follow us
            </p>
            <div className="flex items-center gap-4">
              {socials.map(({ icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`text-slate-400 text-xl transition-colors duration-200 ${color} no-underline`}
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Right — form */}
        <div className="lg:col-span-3">
          <div className="anim-fade-up bg-white rounded-3xl border border-slate-100 shadow-md p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 text-3xl">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <h2 className="text-xl font-bold text-slate-800">
                  Message Sent!
                </h2>
                <p className="text-slate-500 text-sm max-w-xs">
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-2 px-6 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                id="contact-form"
                noValidate
              >
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  Send a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ayomide"
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Order enquiry, custom design..."
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold text-slate-500 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition resize-none"
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="anim-pulse-ring self-start flex items-center gap-2 px-7 py-3 bg-linear-to-r from-violet-600 to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
                  )}
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
