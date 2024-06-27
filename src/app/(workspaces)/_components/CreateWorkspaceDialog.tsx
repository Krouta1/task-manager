import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateWorkspaceForm from "./forms/CreateWorkspaceForm";
import { User } from "next-auth";
import { ReactNode } from "react";

const CreateWorkspaceDialog = ({
  user,
  children,
  open,
  setOpen,
}: {
  user?: User;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your workspace</DialogTitle>
          <DialogDescription>
            Please create your workspace or choose from template.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm user={user} open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
