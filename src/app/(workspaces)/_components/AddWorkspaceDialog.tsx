import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import AddWorkspaceForm from "./forms/AddWorkspaceForm";
import { User } from "next-auth";

const AddWorkspaceDialog = ({ user }: { user?: User }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <PlusIcon className="mr-2 h-4 w-4" />
          <p className="text-xs">Add workspace</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your workspace</DialogTitle>
          <DialogDescription>
            Please create your workspace or choose from template.
          </DialogDescription>
        </DialogHeader>
        <AddWorkspaceForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkspaceDialog;
