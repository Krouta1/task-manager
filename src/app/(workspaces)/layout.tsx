import { ReactNode } from "react";
import WorkspacesHeader from "./_components/WorkspacesHeader";
import WorkspacesNavbar from "./_components/WorkspacesNavbar";

const WorkspacesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="fixed top-0 h-14 w-full border-b backdrop-blur-sm">
        <WorkspacesHeader />
      </header>
      <div className="flex pt-14">
        <div className="fixed left-0 h-full w-72 border-r">
          <WorkspacesNavbar />
        </div>
        <div className="pl-72">{children}</div>
      </div>
    </div>
  );
};

export default WorkspacesLayout;
