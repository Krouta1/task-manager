"use client";
import { User } from "next-auth";
import { z } from "zod";
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

type AddWorkspaceFormProps = {
  user?: User;
};

const AddWorkspaceFormSchema = z.object({
  name: z.string().min(2).max(50),
  icon: z.string().min(2).max(50),
  iconColor: z.string().min(2).max(50),
});

const AddWorkspaceForm = ({ user }: AddWorkspaceFormProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddWorkspaceFormSchema>>({
    resolver: zodResolver(AddWorkspaceFormSchema),
    defaultValues: {
      name: "",
      icon: "Zap",
      iconColor: "black",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AddWorkspaceFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-1/2 items-center justify-between">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon color</FormLabel>
                <FormControl>
                  <IconsSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    color={form.getValues("iconColor")}
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
                <FormLabel>Icon</FormLabel>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddWorkspaceForm;
