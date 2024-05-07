import AddProductForm from "@/components/forms/AddProductForm";
import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/ui/shell";
import * as React from "react";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  return (
    <Shell variant="container" className="flex flex-col flex-1 py-24" as="main">
      <div className="flex flex-col space-y-4 ">
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <p className="text-sm text-gray-500">Add a new product to the store</p>
      </div>
      <Separator className="my-4" />
      <AddProductForm />
    </Shell>
  );
};

export default DashboardPage;
