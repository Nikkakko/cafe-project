import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Shell } from "@/components/ui/shell";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Shell as="main" className="flex flex-col flex-1">
      <section className="py-24">
        <div className="">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <div className="hidden sm:block">
              <BrowseAllCategories />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            {siteConfig.categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 sm:hidden">
          <BrowseAllCategories />
        </div>
      </section>
    </Shell>
  );
}

const BrowseAllCategories = () => (
  <Link
    href="/products"
    className="text-sm font-semibold text-sky-600 hover:text-sky-500"
  >
    Browse all products<span aria-hidden="true"> →</span>
  </Link>
);

type CategoryCardProps = {
  category: {
    label: string;
    title: string;
    href: string;
    image: StaticImageData;
  };
  index: number;
};

const CategoryCard = ({ category, index }: CategoryCardProps) => (
  <Link
    href={category.href}
    className={cn(
      "group relative overflow-hidden rounded-lg",
      index === 0 ? "sm:row-span-2 sm:aspect-h-1 " : ""
    )}
  >
    <div
      className={cn(
        "relative overflow-hidden rounded-lg h-40 w-full",
        index === 0
          ? "sm:aspect-w-1 sm:aspect-h-1 sm:h-full"
          : "sm:aspect-h-1 sm:aspect-w-2"
      )}
    >
      <Image
        src={category.image}
        alt={category.title}
        fill
        priority
        sizes="(min-width: 1480px) 668px, (min-width: 640px) 45.85vw, calc(100vw)"
        className="object-center object-cover opacity-80 group-hover:opacity-70 transition "
      />
    </div>

    {/* add overlay from bottom */}
    {/* <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-sm " /> */}

    {/* add text */}
    <div className="flex flex-col absolute left-0 px-4 bottom-4">
      <h3 className="text-lg font-semibold text-white">{category.title}</h3>
      <p className="text-sm text-white opacity-80">{category.label}</p>
    </div>
  </Link>
);
