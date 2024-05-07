import AddProductForm from "@/components/forms/AddProductForm";
import { Shell } from "@/components/ui/shell";
import * as React from "react";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  return (
    <Shell variant="container" className="flex flex-col flex-1 py-24" as="main">
      <AddProductForm />
    </Shell>
  );
};

export default DashboardPage;
