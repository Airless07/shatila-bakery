"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories, Category } from "@/data/products";
import { Search } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") as Category | null;

  const [activeCategory, setActiveCategory] = useState<Category | "All">(
    initialCat && categories.includes(initialCat) ? initialCat : "All"
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, search, sortBy]);

  return (
    <>
      {/* Page header */}
      <div className="bg-[#3D1F0F] pt-28 pb-12 px-4 text-center">
        <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
          Fresh Daily
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
          Our Sweet Shop
        </h1>
        <p className="text-white/60 max-w-lg mx-auto text-sm">
          Browse our full collection of handcrafted Lebanese pastries and sweets.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]"
            />
            <input
              type="text"
              placeholder="Search sweets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#C9A84C]/40 bg-white text-[#3D1F0F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 placeholder:text-[#3D1F0F]/40"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as typeof sortBy)
            }
            className="px-4 py-2.5 rounded-full border border-[#C9A84C]/40 bg-white text-[#3D1F0F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <span className="text-[#3D1F0F]/50 text-sm md:ml-auto">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(["All", ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#C9A84C] text-white shadow-md"
                  : "bg-white border border-[#C9A84C]/40 text-[#3D1F0F] hover:border-[#C9A84C] hover:text-[#C9A84C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#3D1F0F]/40">
            <p className="font-serif text-2xl mb-2">No sweets found</p>
            <p className="text-sm">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <ShopContent />
    </Suspense>
  );
}
