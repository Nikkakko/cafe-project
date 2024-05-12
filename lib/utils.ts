import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//slugify
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// brew-device => BREW_DEVICE
export const unSlugify = (text: string) => {
  return text.replace(/-/g, "_").toUpperCase();
};

export function formatPrice(
  price: number | string,
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency ?? "USD",
    notation: options.notation ?? "compact",
    ...options,
  }).format(Number(price));
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

//function to Uppercase the first letter of a string
export function capitalizeFirstLetter(str: string) {
  if (str === undefined) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
