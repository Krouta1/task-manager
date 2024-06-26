import { authUser } from "@/actions/authUser";
import React from "react";

const WorkspacesPages = async () => {
  const user = await authUser("workspaces", false);

  return <div>WorkspacesPages</div>;
};

export default WorkspacesPages;
