"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductImagePlaceholder from "./ProductImagePlaceholder";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card group flex flex-col">
      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <ProductImagePlaceholder color={product.color} name={product.name} image={product.image} />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#C9A84C] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
            {product.badge}
          </span>
        )}

        {/* Weight tag */}
        {product.weight && (
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-[11px] px-2 py-0.5 rounded-full backdrop-blur-sm">
            {product.weight}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-[#C9A84C] font-semibold uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg text-[#3D1F0F] font-bold leading-tight mb-2">
          {product.name}
        </h3>
        <p className="text-[#3D1F0F]/60 text-sm leading-relaxed flex-1 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-[#3D1F0F]">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-green-500 text-white scale-95"
                : "bg-[#C9A84C] hover:bg-[#b08a30] text-white hover:shadow-md active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check size={16} />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
