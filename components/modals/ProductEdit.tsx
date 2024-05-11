import { useModalStore } from "@/store/modalStore";
import * as React from "react";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddProductForm from "../forms/AddProductForm";

interface ProductEditProps {}

const ProductEdit: React.FC<ProductEditProps> = ({}) => {
  const { isOpen, type, onClose, data } = useModalStore();

  const isModalOpen = isOpen && type === "product-edit";

  if (!isModalOpen) return null;
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            You can edit the product details here
          </DialogDescription>
        </DialogHeader>
        <AddProductForm initialData={data?.product} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductEdit;
