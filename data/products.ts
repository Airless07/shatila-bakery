export type Category =
  | "Baklava"
  | "Cakes"
  | "Cookies"
  | "Seasonal Sweets"
  | "Gift Boxes";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  description: string;
  weight?: string;
  badge?: string;
  color: string; // tailwind bg color for placeholder image
  image?: string; // path relative to /public
}

export const categories: Category[] = [
  "Baklava",
  "Cakes",
  "Cookies",
  "Seasonal Sweets",
  "Gift Boxes",
];

export const products: Product[] = [
  // ── Baklava ────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Classic Pistachio Baklava",
    category: "Baklava",
    price: 18.99,
    description:
      "Layers of golden phyllo dough filled with finely chopped pistachios, drenched in our signature rose-water honey syrup.",
    weight: "1 lb box",
    badge: "Best Seller",
    color: "from-emerald-800 to-emerald-600",
    image: "/Balava.jpg",
  },
  {
    id: 2,
    name: "Walnut Baklava",
    category: "Baklava",
    price: 16.99,
    description:
      "Crispy phyllo layered with cinnamon-spiced walnuts and soaked in a fragrant orange blossom syrup.",
    weight: "1 lb box",
    color: "from-amber-800 to-amber-600",
    image: "/Balava.jpg",
  },
  {
    id: 3,
    name: "Bird's Nest (Esh el Bulbul)",
    category: "Baklava",
    price: 22.99,
    description:
      "Elegant nest-shaped pastries filled with whole pistachios, a Lebanese delicacy drizzled with pure honey.",
    weight: "1 lb box",
    badge: "Signature",
    color: "from-lime-800 to-lime-600",
    image: "/Balava.jpg",
  },
  {
    id: 4,
    name: "Cashew Baklava Rolls",
    category: "Baklava",
    price: 20.99,
    description:
      "Rolled phyllo packed with whole cashews and finished with a light simple syrup for a delicate crunch.",
    weight: "1 lb box",
    color: "from-yellow-700 to-yellow-500",
    image: "/Balava.jpg",
  },
  {
    id: 5,
    name: "Assorted Baklava Tray",
    category: "Baklava",
    price: 34.99,
    description:
      "A beautiful assortment of our most-loved baklava varieties — perfect for sharing or gifting.",
    weight: "2 lb tray",
    badge: "Popular",
    color: "from-amber-700 to-yellow-500",
    image: "/Balava.jpg",
  },

  // ── Cakes ──────────────────────────────────────────────────────────────────
  {
    id: 6,
    name: "Rose Water Semolina Cake",
    category: "Cakes",
    price: 28.99,
    description:
      "A moist, pillowy semolina cake perfumed with rose water and topped with slivered almonds.",
    weight: "Whole cake",
    badge: "Chef's Pick",
    color: "from-pink-700 to-rose-500",
    image: "/cake.jpeg",
  },
  {
    id: 7,
    name: "Knafeh Cheese Cake",
    category: "Cakes",
    price: 32.99,
    description:
      "The iconic Lebanese cheese pastry reimagined as a show-stopping cake with shredded wheat, sweet cheese, and orange blossom syrup.",
    weight: "Whole cake",
    badge: "Fan Favorite",
    color: "from-orange-700 to-orange-500",
    image: "/knafeh.jpg",
  },
  {
    id: 8,
    name: "Pistachio Layer Cake",
    category: "Cakes",
    price: 38.99,
    description:
      "Layers of pistachio sponge with whipped cream, crushed pistachios, and a hint of cardamom.",
    weight: "Whole cake",
    color: "from-green-700 to-green-500",
    image: "/cake.jpeg",
  },
  {
    id: 9,
    name: "Lebanese Carrot Cake",
    category: "Cakes",
    price: 26.99,
    description:
      "A moist spiced carrot cake with a cream cheese frosting dusted with cinnamon and orange zest.",
    weight: "Whole cake",
    color: "from-orange-600 to-amber-500",
    image: "/cake.jpeg",
  },

  // ── Cookies ────────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Maamoul (Date Filled)",
    category: "Cookies",
    price: 14.99,
    description:
      "Traditional semolina shortbread stuffed with a spiced date paste and pressed in ornate wooden molds.",
    weight: "1 lb box",
    badge: "Traditional",
    color: "from-amber-900 to-amber-700",
    image: "/maamoul.jpeg",
  },
  {
    id: 11,
    name: "Maamoul (Pistachio Filled)",
    category: "Cookies",
    price: 16.99,
    description:
      "Delicate semolina cookies filled with sweetened ground pistachios and rose water.",
    weight: "1 lb box",
    color: "from-green-800 to-emerald-600",
    image: "/maamoul.jpeg",
  },
  {
    id: 12,
    name: "Ghraybeh (Butter Cookies)",
    category: "Cookies",
    price: 12.99,
    description:
      "Melt-in-your-mouth Lebanese butter cookies shaped into crescents and rings, garnished with pistachios.",
    weight: "1 lb box",
    color: "from-yellow-600 to-amber-400",
    image: "/maamoul.jpeg",
  },
  {
    id: 13,
    name: "Sesame Seed Rings (Ka'ak)",
    category: "Cookies",
    price: 11.99,
    description:
      "Lightly sweetened ring-shaped cookies coated in sesame seeds, perfect with a cup of tea.",
    weight: "1 lb box",
    color: "from-stone-700 to-stone-500",
    image: "/maamoul.jpeg",
  },

  // ── Seasonal Sweets ────────────────────────────────────────────────────────
  {
    id: 14,
    name: "Ramadan Assorted Box",
    category: "Seasonal Sweets",
    price: 42.99,
    description:
      "A curated selection of sweets to celebrate the holy month — includes knafeh bites, maamoul, and dates.",
    weight: "2 lb box",
    badge: "Seasonal",
    color: "from-indigo-800 to-purple-700",
    image: "/maamoul.jpeg",
  },
  {
    id: 15,
    name: "Eid Special Tray",
    category: "Seasonal Sweets",
    price: 54.99,
    description:
      "A grand Eid celebration tray with our finest pastries, lovingly arranged and tied with a ribbon.",
    weight: "3 lb tray",
    badge: "Limited Edition",
    color: "from-purple-800 to-pink-700",
    image: "/Balava.jpg",
  },
  {
    id: 16,
    name: "Holiday Pistachio Bark",
    category: "Seasonal Sweets",
    price: 19.99,
    description:
      "Rich dark chocolate bark loaded with pistachios, dried rose petals, and a sprinkle of sea salt.",
    weight: "¾ lb slab",
    color: "from-rose-900 to-pink-700",
  },

  // ── Gift Boxes ─────────────────────────────────────────────────────────────
  {
    id: 17,
    name: "Classic Gift Box",
    category: "Gift Boxes",
    price: 45.99,
    description:
      "An elegantly packaged box of our bestselling sweets — a timeless gift for any occasion.",
    weight: "2 lb",
    badge: "Most Gifted",
    color: "from-amber-800 to-yellow-600",
    image: "/Balava.jpg",
  },
  {
    id: 18,
    name: "Luxury Gold Box",
    category: "Gift Boxes",
    price: 79.99,
    description:
      "Our premium collection presented in a gold-foil gift box with a satin ribbon. Includes baklava, maamoul, and specialty sweets.",
    weight: "3 lb",
    badge: "Premium",
    color: "from-yellow-700 to-amber-500",
    image: "/Balava.jpg",
  },
  {
    id: 19,
    name: "Sweet & Savory Hamper",
    category: "Gift Boxes",
    price: 64.99,
    description:
      "A curated hamper pairing our signature pastries with artisan date syrup, rose water, and premium nuts.",
    weight: "Hamper",
    color: "from-stone-800 to-amber-700",
    image: "/knafeh.jpg",
  },
  {
    id: 20,
    name: "Corporate Gift Box",
    category: "Gift Boxes",
    price: 95.99,
    description:
      "Impress clients and colleagues with a branded box of premium sweets, fully customizable with your logo.",
    weight: "4 lb",
    badge: "Custom",
    color: "from-slate-700 to-slate-500",
    image: "/Balava.jpg",
  },
];

export const featuredProducts = products.filter((p) =>
  [1, 3, 6, 7, 10, 17].includes(p.id)
);
