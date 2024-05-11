import * as React from "react";
import ProductsTable from "@/components/ProductsTable";
import AddProductForm from "@/components/forms/AddProductForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import db from "@/lib/db";

interface DashboardProductsPageProps {}

const DashboardProductsPage: React.FC<
  DashboardProductsPageProps
> = async ({}) => {
  const products = await db.products.findMany();
  return (
    <main className="flex flex-col w-full py-4">
      <Tabs defaultValue="product" className="w-full ">
        <TabsList>
          <TabsTrigger value="product">Add Product</TabsTrigger>
          <TabsTrigger value="table">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="product" className="">
          <AddProductForm />
        </TabsContent>
        <TabsContent value="table" className="">
          <ProductsTable products={products} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default DashboardProductsPage;
