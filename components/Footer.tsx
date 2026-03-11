import Link from "next/link";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3D1F0F] text-white/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-serif font-bold text-lg">S</span>
            </div>
            <div>
              <p className="text-[#C9A84C] font-serif text-lg font-bold leading-tight">
                Shatila Bakery
              </p>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">
                Est. 1979
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60 mb-5">
            Bringing the authentic flavors of Lebanon to Dearborn since 1979.
            Every pastry is crafted with love, tradition, and the finest
            ingredients.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[#C9A84C] font-serif text-lg mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop All" },
              { href: "/shop?cat=Baklava", label: "Baklava" },
              { href: "/shop?cat=Gift+Boxes", label: "Gift Boxes" },
              { href: "/cart", label: "My Cart" },
              { href: "/contact", label: "Contact & Hours" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-[#C9A84C] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#C9A84C] font-serif text-lg mb-4">Visit Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
              <span>
                14300 W. Ford Rd
                <br />
                Dearborn, MI 48126
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[#C9A84C] flex-shrink-0" />
              <a href="tel:+13135824000" className="hover:text-[#C9A84C] transition-colors">
                (313) 582-4000
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
              <div>
                <p>Mon – Thu: 9 AM – 10 PM</p>
                <p>Fri – Sat: 9 AM – 11 PM</p>
                <p>Sunday: 10 AM – 9 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Shatila Bakery. All rights reserved. · Made with{" "}
        <span className="text-[#C9A84C]">♥</span> in Dearborn, Michigan.
      </div>
    </footer>
  );
}
