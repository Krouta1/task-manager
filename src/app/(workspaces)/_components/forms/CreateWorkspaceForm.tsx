"use client";
import { User } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import IconsSelect from "@/components/icon-select";
import IconColorSelect from "@/components/icon-color-select";
import {
  CreateWorkspaceFormSchema,
  CreateWorkspaceSchemaType,
} from "@/schema-types/workspaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWorkspace } from "@/actions/workspaces";
import { toast } from "sonner";
import { useCallback } from "react";
import { set } from "zod";

type AddWorkspaceFormProps = {
  user?: User;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CreateWorkspaceForm = ({
  user,
  open,
  setOpen,
}: AddWorkspaceFormProps) => {
  const form = useForm<CreateWorkspaceSchemaType>({
    resolver: zodResolver(CreateWorkspaceFormSchema),
    defaultValues: {
      name: "",
      icon: "Zap",
      iconColor: "purple",
      user: user?.id,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkspace,
    onSuccess: () => {
      toast.success("Workspace created successfully", {
        id: "create-workspace",
      });
      form.reset({
        name: "",
        icon: "Zap",
        iconColor: "purple",
        user: user?.id,
      });

      //After creating a transaction, we need to invalidate the transactions query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["workspaces", user?.id],
      });

      setOpen(false);
    },
  });

  const onSubmit = useCallback(
    (data: CreateWorkspaceSchemaType) => {
      toast.loading("Creating workspace...", { id: "create-workspace" });
      mutate({
        ...data,
      });
    },
    [mutate],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-1/2 items-center justify-between">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <IconsSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    color={form.watch("iconColor")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iconColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon color</FormLabel>
                <FormControl>
                  <IconColorSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input placeholder="New Workspace" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateWorkspaceForm;
