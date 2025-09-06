"use client";

import { ChangeEvent, FC, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ImageIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDeleteWorkspace } from "@/features/workspaces/api/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/useUpdateWorkspace";
import { useConfirm } from "@/hooks/useConfirm";
import { EditWorkspaceFormProps } from "@/interfaces/EditWorkspaceFormProps";
import { cn } from "@/lib/utils";
import {
  updateWorkSpaceSchema,
  updateWorkspaceValidator,
} from "@/validators/workspaces/updateWorkspaceValidator";

const EditWorkspaceForm: FC<EditWorkspaceFormProps> = ({
  handleCancel,
  initialValues,
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateWorkspace, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const [DeleteDialog, confirmDelete] = useConfirm({
    title: "Delete Workspace",
    message: "This action can not be undone.",
    variant: "destructive",
  });

  const form = useForm<updateWorkspaceValidator>({
    resolver: zodResolver(updateWorkSpaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const handleCreateWorkspace = (values: updateWorkspaceValidator) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    updateWorkspace(
      {
        form: finalValues,
        param: {
          workspaceId: initialValues.$id,
        },
      },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      },
    );
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDeleteWorkspace = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteWorkspace(
      {
        param: {
          workspaceId: initialValues.$id,
        },
      },
      {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="h-full w-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center space-y-0 gap-x-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              handleCancel
                ? handleCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4" /> Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <Separator />
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateWorkspace)}>
              <div className="flex flex-col gap-y-6">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Workspace name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="relative size-[72px] overflow-hidden rounded-md">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="Workspace logo"
                              className="object-cover"
                              fill
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-slate-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-muted-foreground text-sm">
                            JPG, PNG, SVG or JPEG, max 1MB
                          </p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            className="hidden"
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value === null ||
                          field.value === "" ||
                          field.value === undefined ? (
                            <Button
                              type="button"
                              className="mt-2 w-fit"
                              disabled={isPending}
                              size="sm"
                              variant="secondary"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              className="mt-2 w-fit"
                              disabled={isPending}
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                field.onChange(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className="mt-5 flex items-center justify-end gap-4">
                <Button
                  type="button"
                  className={cn(!handleCancel && "invisible")}
                  disabled={isPending}
                  size="lg"
                  variant="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  variant="default"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="h-full w-full border-none shadow-none">
        <CardContent>
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-muted-foreground text-sm">
              Deleting a workspace is irreversible and will delete all
              associated data.
            </p>
            <Button
              type="button"
              className="mt-4 ml-auto w-fit"
              disabled={isPending || isDeletingWorkspace}
              variant="destructive"
              onClick={handleDeleteWorkspace}
            >
              <TrashIcon /> Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditWorkspaceForm;
