"use client";

import { ChangeEvent, FC, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
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
import { useCreateWorkspace } from "@/features/workspaces/api/useCreateWorkspace";
import { CreateWorkspaceFormProps } from "@/interfaces/CreateWorkspaceFormProps";
import { cn } from "@/lib/utils";
import {
  createWorkSpaceSchema,
  createWorkspaceValidator,
} from "@/validators/workspaces/createWorkspaceValidator";

const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({
  handleCancel,
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const form = useForm<createWorkspaceValidator>({
    resolver: zodResolver(createWorkSpaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCreateWorkspace = (values: createWorkspaceValidator) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    createWorkspace(
      { form: finalValues },
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

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="flex">
        <CardTitle className="text-xl font-bold">
          Create a new Workspace
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
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateWorkspaceForm;
