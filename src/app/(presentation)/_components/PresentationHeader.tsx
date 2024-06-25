import React, { use } from "react";
import AppLogo from "./AppLogo";
import MobileNav from "./MobileNav";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import SignInButton from "@/components/sign-in-button";
import { authUser } from "@/actions/authUser";

const PresentationHeader = async () => {
  const user = await authUser("", false);

  return (
    <div className="container flex h-full w-full items-center justify-between">
      <div>
        <div className="hidden md:block">
          <AppLogo size="medium" />
        </div>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {user ? <div>jsem lognut takže tu něco bude</div> : <SignInButton />}
        <ModeToggle />
      </div>
    </div>
  );
};

export default PresentationHeader;
