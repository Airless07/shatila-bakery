import Link from "next/link";
import { ChevronRight, Star, MapPin, Award, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-[#3D1F0F]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMzBhMzAgMzAgMCAwIDAgNjAgMEEzMCAzMCAwIDAgMCAwIDMweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjQzlBODRDIiBzdHJva2Utd2lkdGg9IjAuMyIgb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-40" />

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-[#C9A84C]/10 blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          {/* Eyebrow */}
          <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.3em] uppercase mb-6 arabesque">
            Authentic Lebanese Sweets
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
            A Taste of{" "}
            <span className="text-[#C9A84C]">Lebanon</span>
            <br />
            in the Heart of Dearborn
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Handcrafted baklava, maamoul, knafeh, and more — made fresh daily
            with time-honored recipes passed down through generations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-gold text-base px-8 py-4 inline-flex items-center gap-2 justify-center">
              Shop Now <ChevronRight size={18} />
            </Link>
            <Link href="/contact" className="btn-outline-gold text-base px-8 py-4 inline-flex items-center gap-2 justify-center text-white border-white hover:bg-white hover:text-[#3D1F0F]">
              <MapPin size={18} /> Find Us
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-14 text-white/50 text-xs uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-[#C9A84C]" fill="#C9A84C" />
              Family Recipe Since 1979
            </div>
            <div className="flex items-center gap-1.5">
              <Award size={14} className="text-[#C9A84C]" />
              Award-Winning Pastries
            </div>
            <div className="flex items-center gap-1.5">
              <Heart size={14} className="text-[#C9A84C]" />
              Made Fresh Daily
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-3 bg-[#C9A84C] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title font-bold">Our Signature Sweets</h2>
          <p className="text-center text-[#3D1F0F]/60 mt-3 mb-2 max-w-xl mx-auto">
            From our most celebrated baklava to show-stopping cakes — discover
            why Dearborn has been coming back for over four decades.
          </p>
          <div className="section-divider" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-gold inline-flex items-center gap-2">
              View All Products <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── About Banner ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#3D1F0F] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -left-20 top-0 w-72 h-72 rounded-full border border-[#C9A84C]/20" />
        <div className="absolute -right-20 bottom-0 w-96 h-96 rounded-full border border-[#C9A84C]/10" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl font-bold text-white mb-6 leading-snug">
                Over 45 Years of Sweetness
              </h2>
              <p className="text-white/70 leading-relaxed mb-5">
                Shatila Bakery was founded in 1979 on Ford Road in Dearborn,
                Michigan, by Lebanese immigrants who brought with them a deep
                love for traditional pastries and a commitment to quality that
                has never wavered.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Every tray of baklava, every maamoul cookie, and every knafeh
                is made using the same recipes and techniques that have delighted
                generations of families in Lebanon and now in Metro Detroit.
              </p>
              <Link href="/contact" className="btn-gold inline-flex items-center gap-2">
                Visit Our Bakery <MapPin size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "45+", label: "Years of Heritage" },
                { number: "100+", label: "Pastry Varieties" },
                { number: "50K+", label: "Happy Customers" },
                { number: "1979", label: "Year Founded" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-[#C9A84C]/30 rounded-2xl p-6 text-center"
                >
                  <p className="text-[#C9A84C] font-serif text-4xl font-bold mb-1">
                    {stat.number}
                  </p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories Strip ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title font-bold">Shop by Category</h2>
          <div className="section-divider" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Baklava", emoji: "🥐", bg: "from-amber-800 to-amber-600" },
              { name: "Cakes", emoji: "🎂", bg: "from-pink-800 to-rose-600" },
              { name: "Cookies", emoji: "🍪", bg: "from-orange-800 to-orange-600" },
              { name: "Seasonal Sweets", emoji: "✨", bg: "from-indigo-800 to-purple-600" },
              { name: "Gift Boxes", emoji: "🎁", bg: "from-emerald-800 to-teal-600" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/shop?cat=${encodeURIComponent(cat.name)}`}
                className={`group relative bg-gradient-to-br ${cat.bg} rounded-2xl p-6 text-center text-white overflow-hidden hover:scale-105 transition-transform duration-200 shadow-md`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <p className="font-serif font-bold text-sm leading-tight">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title font-bold">What Our Customers Say</h2>
          <div className="section-divider" />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah K.",
                stars: 5,
                text: "The best baklava outside of Lebanon. My family has been coming here for 20 years and it never disappoints!",
              },
              {
                name: "Mike A.",
                stars: 5,
                text: "Ordered the gift box for my mom's birthday. She cried happy tears — said it tasted just like home.",
              },
              {
                name: "Lina H.",
                stars: 5,
                text: "The knafeh cake is absolutely divine. Always fresh, always perfect. Shatila is a Dearborn treasure.",
              },
            ].map((review) => (
              <div key={review.name} className="bg-[#FDF6EC] rounded-2xl p-6 border border-[#C9A84C]/20">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-[#C9A84C]" fill="#C9A84C" />
                  ))}
                </div>
                <p className="text-[#3D1F0F]/70 text-sm leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
                <p className="text-[#3D1F0F] font-semibold text-sm">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#C9A84C]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Authentic Lebanese Sweets?
          </h2>
          <p className="text-white/80 mb-8">
            Order online or visit us on Ford Road in Dearborn, MI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-white text-[#C9A84C] font-bold px-8 py-3 rounded-full hover:bg-[#FDF6EC] transition-colors shadow-md"
            >
              Order Online
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
