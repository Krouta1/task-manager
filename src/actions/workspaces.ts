"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  CreateWorkspaceFormSchema,
  CreateWorkspaceSchemaType,
} from "@/schema-types/workspaces";
import { redirect } from "next/navigation";

export async function CreateWorkspace(form: CreateWorkspaceSchemaType) {
  const parsedBody = CreateWorkspaceFormSchema.safeParse(form);
  if (!parsedBody.success) throw new Error(parsedBody.error.message);

  // Get user
  const session = await auth();
  if (!session) redirect("/sign-in");

  const { icon, iconColor, name, user } = parsedBody.data;

  const workspace = await prisma.workspace.create({
    data: {
      name,
      icon,
      iconColor,
      userId: user,
    },
  });

  // Add user who created the workspace to workspace users
  await prisma.workspaceUser.create({
    data: {
      userId: user,
      workspaceId: workspace.id,
    },
  });
}
