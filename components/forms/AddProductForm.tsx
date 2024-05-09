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

interface AddProductFormProps {}

type AddProductInput = z.infer<typeof AddProductSchema>;
type Categories = {
  value: AddProductInput["category"];
  label: string;
};

type Subcategories = {
  value: AddProductInput["subCategory"];
  label: string;
};

const AddProductForm: React.FC<AddProductFormProps> = ({}) => {
  const form = useForm<AddProductInput>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "COFFE",
      subCategory: "BEANS",
      images: [],
      quantity: 1,
    },
  });

  const { toast } = useToast();
  const [images, setImages] = React.useState<
    { fileUrl: string; fileKey: string }[] | null
  >(null);

  function onSubmit(values: AddProductInput) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const categories: Categories[] = [
    { value: "COFFE", label: "Coffee" },
    { value: "EQUIPMENT", label: "Equipment" },
    { value: "SUBSCRIPTIONS", label: "Subscriptions" },
  ];

  const subcategories: Subcategories[] = [
    { value: "BEANS", label: "Beans" },
    { value: "FILTER_PAPERS", label: "Filter Papers" },
    { value: "ACCESSORIES", label: "Accessories" },
    { value: "BREWING_DEVICES", label: "Brewing Devices" },
    { value: "GRINDERS", label: "Grinders" },
    { value: "FILTER_COFFEE", label: "Filter Coffee" },
    { value: "ESPRESSO", label: "Espresso" },
  ];

  //make 5 input for images

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
                    {categories.map(category => (
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
                    {subcategories.map(subcategory => (
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

                    //update form value with new images
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

        <div className="flex gap-4">
          <Button variant={"outline"} className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
