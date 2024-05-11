import { useModalStore } from "@/store/modalStore";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteProductAction } from "@/app/_actions/productAction";
import { useToast } from "../ui/use-toast";
import { getErrorMessage } from "@/lib/handle-error";
import { Loader2 } from "lucide-react";

interface ProductDeleteProps {}

const ProductDelete: React.FC<ProductDeleteProps> = ({}) => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteProductAction(data?.id as string);
        toast({
          title: "Product deleted successfully",
          description: "Product has been deleted successfully",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description: getErrorMessage(error),
        });
      }
    });
  }

  const isModalOpen = isOpen && type === "product-delete";

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleDelete} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Yes, delete
          </Button>
          <Button variant="default">No, cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDelete;
