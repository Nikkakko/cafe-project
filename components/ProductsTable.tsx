"use client";
import { Products } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { cn } from "@/lib/utils";
import { deleteProductAction } from "@/app/_actions/productAction";
import { useToast } from "./ui/use-toast";
import { getErrorMessage } from "@/lib/handle-error";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import EmptyState from "./EmptyState";
import { useModalStore } from "@/store/modalStore";

interface ProductsTableProps {
  products: Products[];
}

type tableHeads =
  | "Title"
  | "Category"
  | "Sub Category"
  | "Price"
  | "Quantity"
  | "Action";

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const { onOpen } = useModalStore();

  const tableHeads = [
    "Title",
    "Category",
    "Sub Category",
    "Price",
    "Quantity",
    "Action",
  ] as tableHeads[];

  if (!products.length)
    return (
      <EmptyState
        title="No products found"
        description="No products found in the database"
      />
    );

  return (
    <Table>
      <TableCaption>A list of products</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHeads.map(head => (
            <TableHead
              key={head}
              className={cn(head === "Action" && "text-right")}
            >
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.subCategory}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell className="text-right flex gap-1 justify-end items-center">
              <Button
                variant="outline"
                onClick={() =>
                  onOpen("product-edit", {
                    role: "admin",
                    id: product.id,
                    product,
                  })
                }
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  onOpen("product-delete", {
                    role: "admin",
                    id: product.id,
                  })
                }
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">
            Total Products: {products.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ProductsTable;
