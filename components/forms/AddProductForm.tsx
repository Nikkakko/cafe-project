"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddProductSchema } from "@/validation/addproduct";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "../ui/use-toast";
import {
  createProductAction,
  updateProductAction,
} from "@/app/_actions/productAction";
import { getErrorMessage } from "@/lib/handle-error";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useModalStore } from "@/store/modalStore";
import { removeImage } from "@/app/_actions/uploadthing";
import { siteConfig } from "@/config/site";

interface AddProductFormProps {
  initialData?: AddProductInput & { id: string };
}

type AddProductInput = z.infer<typeof AddProductSchema>;

const AddProductForm: React.FC<AddProductFormProps> = ({ initialData }) => {
  const [isPending, startTransition] = React.useTransition();
  const { onClose } = useModalStore();
  const form = useForm<AddProductInput>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || "COFFE",
      subCategory: initialData?.subCategory || "BEANS",
      images: initialData?.images || [],
      quantity: initialData?.quantity || 1,
    },
  });

  const { toast } = useToast();
  const [images, setImages] = React.useState<
    { fileUrl: string; fileKey: string }[] | null
  >(
    initialData?.images?.map(image => ({
      fileUrl: image,
      fileKey: "",
    })) || null
  );

  const disabledButton = false;

  function onSubmit(values: AddProductInput) {
    startTransition(async () => {
      try {
        if (initialData) {
          await updateProductAction({ id: initialData.id, product: values });
          toast({
            title: "Success",
            description: `Product has been updated`,
          });
          onClose();
        } else {
          await createProductAction(values);
          toast({
            title: "Success",
            description: `Product has been created`,
          });
        }

        form.reset();
        setImages(null);
      } catch (error) {
        toast({
          title: "Error",
          description: getErrorMessage(error),
        });
      }
    });
  }

  const handleDelete = (imageUrl: string, imageKey: string) => {
    if (images && images.length > 0) {
      startTransition(async () => {
        await removeImage(imageKey);
        setImages(images.filter(image => image.fileUrl !== imageUrl));
      });

      //update form value
      form.setValue(
        "images",
        images
          .filter(image => image.fileUrl !== imageUrl)
          .map(image => image.fileUrl),
        { shouldDirty: true }
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  border rounded-sm p-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 ">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {siteConfig.productCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sub Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Sub Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {siteConfig.productSubcategories.map(subcategory => (
                      <SelectItem
                        key={subcategory.value}
                        value={subcategory.value}
                      >
                        {subcategory.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Price"
                    type="number"
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      const parsedValue = parseFloat(value);
                      if (isNaN(parsedValue)) return;
                      field.onChange(parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    className=""
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (isNaN(parsedValue)) return;
                      field.onChange(parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add images input here */}
        <FormField
          name="images"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <UploadButton
                  endpoint="imageUploader"
                  className=""
                  onClientUploadComplete={res => {
                    //copy old and add new image\

                    const newImages = res.map(image => ({
                      fileUrl: image.url,
                      fileKey: image.key,
                    }));

                    setImages([...(images || []), ...newImages]);

                    // update form value with new images
                    field.onChange([
                      ...(field.value || []),
                      ...newImages.map(image => image.fileUrl),
                    ]);

                    toast({
                      title: "Upload Completed",
                      description: "Your image has been uploaded",
                    });
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast({
                      title: "Upload Error",
                      description: error.message,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {images && (
          <div className="flex gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-md overflow-hidden"
              >
                <Image
                  src={image.fileUrl}
                  alt="Product Image"
                  fill
                  className="object-cover"
                />

                <button
                  onClick={() => handleDelete(image.fileUrl, image.fileKey)}
                  type="button"
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md w-6 h-6 flex justify-center items-center hover:bg-red-600 transition"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant={"outline"}
            className="w-full"
            disabled={disabledButton}
          >
            {isPending && <Loader2 className="animate-spin mr-2" size={20} />}
            {initialData ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
