import { authUser } from "@/actions/authUser";

import React from "react";
import WorkspacesNavLink from "./WorkspacesNavLink";
import { CalendarCheck, HomeIcon } from "lucide-react";
import WorkspaceMenu from "./WorkspaceMenu";

const WorkspacesNavbar = async () => {
  const user = await authUser("workspaces", false);
  return (
    <div className="flex h-full flex-col items-start">
      <nav className="h-30 w-full space-y-2 border-b p-4">
        <WorkspacesNavLink href="/workspaces">
          <HomeIcon className="h-4 w-4" />
          Home
        </WorkspacesNavLink>
        <WorkspacesNavLink href="/my_work">
          <CalendarCheck className="h-4 w-4" />
          My work
        </WorkspacesNavLink>
      </nav>
      <nav className="h-full w-full grow px-4 py-2">
        <WorkspaceMenu user={user} />
      </nav>
    </div>
  );
};

export default WorkspacesNavbar;
