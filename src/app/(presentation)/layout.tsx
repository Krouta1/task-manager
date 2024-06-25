import { ReactNode } from "react";
import PresentationHeader from "./_components/PresentationHeader";

const PresentationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="fixed top-0 h-14 w-full border-b backdrop-blur-sm">
        <PresentationHeader />
      </header>
      <main className="pt-14">{children}</main>
    </div>
  );
};

export default PresentationLayout;
