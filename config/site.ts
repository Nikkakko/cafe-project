import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { SubImage, CoffeImage, EquipmentImage } from "@/public/images";
import { Categories, Subcategories } from "@/types";

const links = {
  github: "https://github.com/Nikkakko",
  linkedin: "https://www.linkedin.com/in/nika-kopadze/",
  xing: "https://twitter.com/nikako_00",
  nextjs: "https://nextjs.org",
};

const dashboardLinks = [
  {
    href: "/admin/dashboard",
    icon: Home,
    title: "Dashboard",
  },

  {
    href: "/admin/dashboard/orders",
    icon: ShoppingCart,
    title: "Orders",
  },

  {
    href: "/admin/dashboard/products",
    icon: Package,
    title: "Products",
  },

  {
    href: "/admin/dashboard/users",
    icon: Users2,
    title: "Users",
  },

  {
    href: "/admin/dashboard/analytics",
    icon: LineChart,
    title: "Analytics",
  },
];
const dashboardPageLinks = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },

  {
    title: "Orders",
    href: "/admin/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    href: "/admin/dashboard/products",
    icon: Package,
  },
  {
    title: "Users",
    href: "/admin/dashboard/users",
    icon: Users2,
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    icon: LineChart,
  },
];

const productCategories: Categories[] = [
  { value: "COFFE", label: "Coffee" },
  { value: "EQUIPMENT", label: "Equipment" },
  { value: "SUBSCRIPTIONS", label: "Subscriptions" },
];

const productSubcategories: Subcategories[] = [
  { value: "BEANS", label: "Beans" },
  { value: "FILTER_PAPERS", label: "Filter Papers" },
  { value: "ACCESSORIES", label: "Accessories" },
  { value: "BREWING_DEVICES", label: "Brewing Devices" },
  { value: "GRINDERS", label: "Grinders" },
  { value: "FILTER_COFFEE", label: "Filter Coffee" },
  { value: "ESPRESSO", label: "Espresso" },
];

export const siteConfig = {
  name: "Coffe Shop",
  description: "The best coffee in town!",
  url: "https://coffeeshop.com",
  links,
  dashboardLinks,
  dashboardPageLinks,
  productCategories,
  productSubcategories,

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
