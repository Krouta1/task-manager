import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/auth";

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default SignInButton;
