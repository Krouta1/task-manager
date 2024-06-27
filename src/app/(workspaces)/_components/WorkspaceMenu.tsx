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
import { LayoutDashboard, PlusIcon, StarIcon } from "lucide-react";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import WorkspaceDropdownMenu from "./WorkspaceDropdownMenu";
import Icon from "@/components/icon";

type WorkspaceMenuProps = {
  user?: User;
};

type WorkspaceType = {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  isMain: boolean;
};

const WorkspaceMenu = ({ user }: WorkspaceMenuProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const workspacesQuery = useQuery({
    queryKey: ["workspaces", user?.id],
    queryFn: () => axios.get(`/api/workspaces`).then((res) => res.data),
  });

  const workspacesDataAvailable =
    workspacesQuery.isSuccess && workspacesQuery.data;

  // const [selectedValue, setSelectedValue] = useState(
  //   `${workspacesQuery.data.find((workspace: any) => workspace.isMain)?.id}`,
  // );

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
    <div className="flex w-full items-center gap-3">
      <div className="w-full">
        {workspacesDataAvailable ? (
          <Select
            defaultValue={
              workspacesQuery.data.find(
                (workspace: WorkspaceType) => workspace.isMain,
              )?.id
            }
          >
            <SelectTrigger className="w-full text-sm font-bold">
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
              {filteredWorkspaces.map((workspace: WorkspaceType) => (
                <SelectItem
                  key={workspace.id}
                  value={workspace.id}
                  className="text-sm"
                >
                  <div className="flex items-center gap-3">
                    {workspace.icon && (
                      <Icon name={workspace.icon} color={workspace.iconColor} />
                    )}
                    {workspace.name}
                  </div>
                </SelectItem>
              ))}
              <Separator className="my-2" />
              <div>
                <CreateWorkspaceDialog
                  user={user}
                  open={open}
                  setOpen={setOpen}
                >
                  <Button size={"sm"} variant={"ghost"}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    <p className="text-xs">Add workspace</p>
                  </Button>
                </CreateWorkspaceDialog>
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
      <WorkspaceDropdownMenu />
    </div>
  );
};

export default WorkspaceMenu;
