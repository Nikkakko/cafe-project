const links = {
  github: "https://github.com/Nikkakko",
  linkedin: "https://www.linkedin.com/in/nika-kopadze/",
  xing: "https://twitter.com/nikako_00",
  nextjs: "https://nextjs.org",
};

import { SubImage, CoffeImage, EquipmentImage } from "@/public/images";

export const siteConfig = {
  name: "Coffe Shop",
  description: "The best coffee in town!",
  url: "https://coffeeshop.com",
  links,

  mainNav: [
    {
      title: "All Products",
      href: "/products",
    },

    {
      title: "Subscriptions",
      href: "/products/category/subscriptions",
    },
    {
      title: "Equipment",
      href: "/products/category/equipment",
      items: [
        {
          title: "Filter papers",
          href: "/products/category/filter-papers",
          description: "Filter papers for your coffee.",
        },
        {
          title: "Accessories",
          href: "/products/category/accessories",
          description: "Accessories for your coffee.",
        },
        {
          title: "Brewing Devices",
          href: "/products/category/brewing-devices",
          description: "Brewing devices for your coffee.",
        },
        {
          title: "Grinders",
          href: "/products/category/grinders",
          description: "Grinders for your coffee.",
        },
      ],
    },

    {
      title: "Coffe",
      href: "/products/category/coffe",
      items: [
        {
          title: "Filter coffe",
          href: "/products/category/filter-coffe",
          description: "Filter coffe for your coffee.",
        },

        {
          title: "Espresso",
          href: "/products/category/espresso",
          description: "Espresso for your coffee.",
        },
      ],
    },
  ],
  footernav: [],

  categories: [
    {
      title: "Subscriptions",
      href: "/products/category/subscriptions",
      label: "Shop now",
      image: SubImage,
    },
    {
      title: "Equipment",
      href: "/products/category/equipment",
      label: "Shop now",
      image: EquipmentImage,
    },
    {
      title: "Coffe",
      href: "/products/category/coffe",
      label: "Shop now",
      image: CoffeImage,
    },
  ],
};