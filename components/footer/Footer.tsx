import * as React from "react";
import { Shell } from "../ui/shell";
import { siteConfig } from "@/config/site";
import Link from "next/link";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Shell variant="container" as="footer" className="py-10">
      <h5 className="text-center text-stone-400 text-sm ">
        &copy; {new Date().getFullYear()} {siteConfig.name}.
      </h5>
      <div className="flex items-center gap-1">
        {/* developed by */}
        <p className="text-stone-400 text-sm">Developed by</p>
        <Link
          href={siteConfig.links.github}
          className="text-sky-600"
          target="_blank"
        >
          Nikako
        </Link>
        {/* using */}
        <p className="text-stone-400 text-sm">using</p>
        <Link
          href={siteConfig.links.nextjs}
          className="text-sky-600"
          target="_blank"
        >
          Next.js
        </Link>
        {/* and */}
      </div>
    </Shell>
  );
};

export default Footer;
