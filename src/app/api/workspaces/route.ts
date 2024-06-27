import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Get user
  const session = await auth();
  if (!session) redirect("/sign-in");

  // find workspaces
  const workspaces = await prisma.workspace.findMany({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      isMain: "desc",
    },
  });

  return Response.json(workspaces);
}
