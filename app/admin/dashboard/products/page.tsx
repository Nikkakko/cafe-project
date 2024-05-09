import * as React from "react";
import ProductsTable from "@/components/ProductsTable";
import AddProductForm from "@/components/forms/AddProductForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardProductsPageProps {}

const DashboardProductsPage: React.FC<DashboardProductsPageProps> = ({}) => {
  return (
    <main className="flex flex-col w-full">
      <Tabs defaultValue="product" className="w-full">
        <TabsList>
          <TabsTrigger value="product">Add Product</TabsTrigger>
          <TabsTrigger value="table">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="product" className="w-1/2">
          <AddProductForm />
        </TabsContent>
        <TabsContent value="table" className="">
          <ProductsTable />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default DashboardProductsPage;