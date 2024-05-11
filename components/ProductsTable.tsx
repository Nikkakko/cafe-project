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
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const tableHeads = [
    "Title",
    "Category",
    "Sub Category",
    "Price",
    "Quantity",
    "Action",
  ] as tableHeads[];

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteProductAction(id);
        toast({
          title: "Product deleted successfully",
          description: "Product has been deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: getErrorMessage(error),
        });
      }
    });
  }

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
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the product.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
                      disabled={isPending}
                    >
                      {isPending && <Loader2 className="animate-spin" />}
                      Yes, delete
                    </Button>
                    <Button variant="default">No, cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
