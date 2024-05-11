import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ProductBreadCrumbsProps {
  slug: string;
}

const ProductBreadCrumbs: React.FC<ProductBreadCrumbsProps> = ({ slug }) => {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[1];

  return (
    <Breadcrumb className="flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{capitalizeFirstLetter(currentPath)}</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/products/${slug}`}>
              {capitalizeFirstLetter(slug)}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadCrumbs;
