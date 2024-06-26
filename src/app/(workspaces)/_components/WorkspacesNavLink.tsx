"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type WorkspacesNavLinkProps = {
  href: string;
  children: ReactNode;
};

const WorkspacesNavLink = ({ href, children }: WorkspacesNavLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between rounded-md px-4 py-2 text-sm font-bold transition-colors duration-500 hover:bg-muted-foreground/20",
        pathname === href ? "bg-primary/20" : "bg-transparent",
      )}
    >
      <div className="flex items-center gap-2">{children}</div>
    </Link>
  );
};

export default WorkspacesNavLink;
