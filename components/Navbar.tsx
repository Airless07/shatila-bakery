"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#3D1F0F] shadow-lg"
          : "bg-[#3D1F0F]/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-serif font-bold text-lg leading-none">
                S
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[#C9A84C] font-serif text-lg font-bold leading-tight tracking-wide">
                Shatila Bakery
              </p>
              <p className="text-white/60 text-[10px] tracking-widest uppercase">
                Est. 1979 · Dearborn, MI
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#C9A84C]"
                    : "text-white/80 hover:text-[#C9A84C]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 text-white/80 hover:text-[#C9A84C] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A84C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-white/80 hover:text-[#C9A84C] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#3D1F0F] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-sm font-semibold tracking-wide uppercase border-b border-white/10 transition-colors ${
                pathname === link.href
                  ? "text-[#C9A84C]"
                  : "text-white/80 hover:text-[#C9A84C]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleCart();
              setMobileOpen(false);
            }}
            className="mt-4 btn-gold w-full text-center"
          >
            View Cart
          </button>
        </div>
      )}
    </header>
  );
}
