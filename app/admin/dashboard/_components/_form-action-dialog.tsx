"use client";
import * as React from "react";
import { setRoleAction } from "@/app/_actions/setRoleAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoleSchema } from "@/validation/role";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/handle-error";
import { useModalStore } from "@/store/modalStore";
import { Input } from "@/components/ui/input";

type FormActionProps = {};

const FormAction: React.FC<FormActionProps> = () => {
  const [isPending, startTransition] = React.useTransition();
  const { isOpen, type, onClose, data } = useModalStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      id: data?.id,
      role: data?.role,
    },
  });

  const isModalOpen = isOpen && type === "form-action";

  function onSubmit(values: z.infer<typeof RoleSchema>) {
    if (!data) return;
    startTransition(async () => {
      try {
        await setRoleAction(values);
        toast({
          title: "Success",
          description: `User role has been changed to ${data?.role}`,
        });

        handleClose();
      } catch (error) {
        toast({
          title: "Error",
          description: getErrorMessage(error),
        });
      }
    });
  }

  const handleClose = React.useCallback(() => {
    onClose();
    form.reset();
  }, [form, onClose]);

  //set values to form
  React.useEffect(() => {
    if (data) {
      form.setValue("id", data.id);
      form.setValue("role", data.role);
    }

    return () => {};
  }, [data, form]);

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <DialogDescription className="mt-1">
              Are you sure you want to make this user a {data?.role}?
            </DialogDescription>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" size="sm" disabled={isPending}>
                Yes
              </Button>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleClose}
                disabled={isPending}
              >
                No
              </Button>
            </div>
            <FormMessage />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormAction;
