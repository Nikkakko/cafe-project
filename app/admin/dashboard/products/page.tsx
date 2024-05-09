import AddProductForm from "@/components/forms/AddProductForm";
import { Shell } from "@/components/ui/shell";
import * as React from "react";

interface DashboardProductsPageProps {}

const DashboardProductsPage: React.FC<DashboardProductsPageProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 w-full">
      <AddProductForm />
    </div>
  );
};

export default DashboardProductsPage;
