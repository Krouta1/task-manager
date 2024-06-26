"use client";
import { User } from "next-auth";
import React, { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, StarIcon } from "lucide-react";
import AddWorkspaceDialog from "./AddWorkspaceDialog";
import IconsSelect from "@/components/icon-select";

type WorkspaceMenuProps = {
  user?: User;
};

const WorkspaceMenu = ({ user }: WorkspaceMenuProps) => {
  const [search, setSearch] = useState("");
  const workspacesQuery = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => axios.get(`/api/workspaces`).then((res) => res.data),
  });

  const workspacesDataAvailable =
    workspacesQuery.data && workspacesQuery.data?.length > 0;

  const filteredWorkspaces = useMemo(
    () =>
      workspacesDataAvailable
        ? workspacesQuery.data.filter((workspace: any) =>
            workspace.name.toLowerCase().includes(search.toLowerCase()),
          )
        : workspacesQuery.data,
    [search, workspacesQuery.data, workspacesDataAvailable],
  );

  return (
    <div>
      {workspacesDataAvailable ? (
        <Select
          defaultValue={
            workspacesQuery.data.find((workspace: any) => workspace.isMain)?.id
          }
        >
          <SelectTrigger className="text-sm font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-64">
            <div className="my-4 w-full">
              <Input
                placeholder="Search workspaces"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <SelectItem value="favorites" className="my-2">
              <div className="flex items-center gap-2">
                <StarIcon className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                Favorites
              </div>
            </SelectItem>
            <h3 className="mt-4 text-sm font-bold text-primary">
              My workspaces
            </h3>
            {filteredWorkspaces.map((workspace: any) => (
              <SelectItem
                key={workspace.id}
                value={workspace.id}
                className="text-sm"
              >
                {workspace.name}
              </SelectItem>
            ))}
            <Separator className="my-2" />
            <div>
              <AddWorkspaceDialog user={user} />
              <Button size={"sm"} variant={"ghost"}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <p className="text-xs">Browse all</p>
              </Button>
            </div>
          </SelectContent>
        </Select>
      ) : (
        <Skeleton className="h-[40px] w-full rounded-md" />
      )}
    </div>
  );
};

export default WorkspaceMenu;
