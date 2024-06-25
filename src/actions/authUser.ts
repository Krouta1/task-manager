"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const authUser = async (callbackUrl: string, callbackOff: boolean) => {
  const session = await auth();
  const user = session?.user;

  if (!user && !callbackOff) {
    redirect(`/api/auth/signin?callbackUrl=/${callbackUrl}`);
  }

  return user;
};
