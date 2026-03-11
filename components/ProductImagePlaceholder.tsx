import Image from "next/image";

interface Props {
  color: string;
  name: string;
  image?: string;
  small?: boolean;
}

export default function ProductImagePlaceholder({
  color,
  name,
  image,
  small = false,
}: Props) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes={small ? "64px" : "(max-width: 640px) 100vw, 400px"}
      />
    );
  }

  // Gradient fallback for products without a photo
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}
    >
      <span
        className={`font-serif font-bold text-white/80 select-none ${
          small ? "text-lg" : "text-3xl"
        }`}
      >
        {initials}
      </span>
    </div>
  );
}
