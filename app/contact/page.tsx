import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Car } from "lucide-react";

export const metadata = {
  title: "Contact & Location | Shatila Bakery — Dearborn, MI",
};

const hours = [
  { day: "Monday", hours: "9:00 AM – 10:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 10:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 10:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 10:00 PM" },
  { day: "Friday", hours: "9:00 AM – 11:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 11:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 9:00 PM" },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#3D1F0F] pt-28 pb-16 px-4 text-center">
        <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
          We'd love to see you
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
          Visit Us in Dearborn
        </h1>
        <p className="text-white/60 max-w-lg mx-auto text-sm">
          Stop by our bakery on Ford Road or reach out — we're always happy to
          help with orders, events, and gift boxes.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — Info cards */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3D1F0F] mb-1">
                    Our Location
                  </h3>
                  <p className="text-[#3D1F0F]/70">14300 W. Ford Rd</p>
                  <p className="text-[#3D1F0F]/70">Dearborn, MI 48126</p>
                  <a
                    href="https://maps.google.com/?q=14300+W+Ford+Rd+Dearborn+MI+48126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#C9A84C] font-semibold hover:underline"
                  >
                    <Car size={14} /> Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-[#3D1F0F]/40 uppercase font-semibold tracking-wider mb-0.5">
                    Phone
                  </p>
                  <a
                    href="tel:+13135824000"
                    className="text-[#3D1F0F] font-semibold hover:text-[#C9A84C] transition-colors"
                  >
                    (313) 582-4000
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-xs text-[#3D1F0F]/40 uppercase font-semibold tracking-wider mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:info@shatilafoods.com"
                    className="text-[#3D1F0F] font-semibold hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    info@shatilafoods.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-serif text-lg font-bold text-[#3D1F0F] mb-4">
                Follow Along
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FDF6EC] border border-[#C9A84C]/30 text-[#3D1F0F] text-sm font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                >
                  <Instagram size={16} className="text-[#C9A84C]" />
                  Instagram
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FDF6EC] border border-[#C9A84C]/30 text-[#3D1F0F] text-sm font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                >
                  <Facebook size={16} className="text-[#C9A84C]" />
                  Facebook
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-serif text-lg font-bold text-[#3D1F0F] mb-5">
                Send Us a Message
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D1F0F]/50 uppercase tracking-wider mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A84C]/30 bg-[#FDF6EC] text-[#3D1F0F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3D1F0F]/50 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A84C]/30 bg-[#FDF6EC] text-[#3D1F0F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C]"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D1F0F]/50 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A84C]/30 bg-[#FDF6EC] text-[#3D1F0F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C]"
                    placeholder="Catering, gift orders, custom cakes…"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3D1F0F]/50 uppercase tracking-wider mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C9A84C]/30 bg-[#FDF6EC] text-[#3D1F0F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] resize-none"
                    placeholder="Tell us how we can help…"
                  />
                </div>
                <button type="submit" className="btn-gold w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right — Map + Hours */}
          <div className="space-y-6">
            {/* Map embed placeholder */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-br from-[#3D1F0F] to-[#7a3d1a] h-64 flex flex-col items-center justify-center text-white gap-3 relative">
                {/* Decorative grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute border-t border-white"
                      style={{ top: `${(i + 1) * 12.5}%`, left: 0, right: 0 }}
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute border-l border-white"
                      style={{ left: `${(i + 1) * 12.5}%`, top: 0, bottom: 0 }}
                    />
                  ))}
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <MapPin size={24} className="text-white" fill="white" />
                  </div>
                  <p className="font-serif text-xl font-bold">Shatila Bakery</p>
                  <p className="text-white/70 text-sm">14300 W. Ford Rd, Dearborn, MI</p>
                  <a
                    href="https://maps.google.com/?q=14300+W+Ford+Rd+Dearborn+MI+48126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-[#C9A84C] hover:bg-[#b08a30] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="p-4 bg-[#FDF6EC] flex items-center gap-2 text-sm text-[#3D1F0F]/60">
                <Car size={16} className="text-[#C9A84C]" />
                Free parking available in our lot
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                  <Clock size={18} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3D1F0F]">
                  Store Hours
                </h3>
              </div>

              <div className="space-y-2">
                {hours.map(({ day, hours: h }) => {
                  const isToday = day === today;
                  return (
                    <div
                      key={day}
                      className={`flex justify-between items-center text-sm py-2 border-b border-[#3D1F0F]/5 last:border-0 ${
                        isToday
                          ? "text-[#3D1F0F] font-semibold"
                          : "text-[#3D1F0F]/60"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        )}
                        <span>{day}</span>
                      </div>
                      <span>{h}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 bg-[#C9A84C]/10 rounded-xl p-3 flex items-start gap-2 text-sm">
                <Clock size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <p className="text-[#3D1F0F]/70">
                  Hours may vary on holidays and during Ramadan. Call us to
                  confirm.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="bg-[#3D1F0F] rounded-2xl p-6 text-white">
              <h3 className="font-serif text-lg font-bold text-[#C9A84C] mb-4">
                Our Services
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                {[
                  "In-store pickup available",
                  "Local delivery (Metro Detroit)",
                  "Custom catering orders",
                  "Corporate & event gift boxes",
                  "Wholesale inquiries welcome",
                  "Nationwide shipping available",
                ].map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
