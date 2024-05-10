import { redirect } from "next/navigation";
import * as React from "react";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
  return redirect("/admin/dashboard");
};

export default AdminPage;
