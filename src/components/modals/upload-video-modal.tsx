"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import Thumbnail from "../studio/thumbnail";
import UploadContent from "../studio/upload-content";
import axios from "@/utils/axios";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { IAPIResponse } from "@/types";

type Props = {
  trigger: React.ReactNode;
  className?: string;
};

const formSchema = z.object({
  title: z.string().min(1, { message: "This field has to be filled." }),
  description: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(500),
  videoFiles: z
    .any()
    .refine((file) => file, { message: "This field is required." })
    .refine(
      (file) => file?.type?.startsWith("video/"),
      "Only Video are supported.",
    ),
  thumbnail: z
    .any()
    .refine((file) => file, { message: "This field is required." })
    .refine(
      (file) => file?.type?.startsWith("image/"),
      "Only Image are supported.",
    ),
  isPublished: z.boolean(),
});

function UploadVideoModal({ trigger, className }: Props) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublished: false,
      videoFiles: "",
      thumbnail: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("isPublished", String(values.isPublished));
      formData.append("videoFiles", values.videoFiles);
      formData.append("thumbnail", values.thumbnail);
      await axios.post("/videos/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Upload Successful",
        description: "You have successfully uploaded a video.",
      });
      form.reset();
      setOpen(false);
    } catch (error: AxiosError<IAPIResponse<any>> | any) {
      toast({
        title: "Upload Failed",
        description: error?.data?.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="block">{trigger}</DialogTrigger>
      <DialogContent className={cn("", className)}>
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Thumbnail</FormLabel>
                    <FormControl>
                      <Thumbnail
                        defaultFile={field?.value}
                        getFile={(file) => field.onChange(file)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoFiles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Video</FormLabel>
                    <FormControl>
                      <UploadContent
                        defaultFile={field?.value}
                        getFile={(file) => {
                          field.onChange(file);
                          form.setValue("title", file?.name || "");
                        }}
                        thumbnail={form.getValues().thumbnail}
                        onDelete={() => {
                          field.onChange(null);
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
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Publish this video</FormLabel>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <FormSubmitButton
                className="rounded"
                loading={form.formState.isSubmitting}
                loadingText="Uploading..."
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                Upload
              </FormSubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadVideoModal;
