import React, { use } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import SignInButton from "@/components/sign-in-button";
import { authUser } from "@/actions/authUser";
import AppLogo from "@/app/(presentation)/_components/AppLogo";

const WorkspacesHeader = async () => {
  const user = await authUser("workspaces", false);

  return (
    <div className="flex h-full w-full items-center justify-between px-4">
      <div>
        <div className="hidden md:block">
          <AppLogo size="medium" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {user ? <div>jsem lognut takže tu něco bude</div> : <SignInButton />}
        <ModeToggle />
      </div>
    </div>
  );
};

export default WorkspacesHeader;
