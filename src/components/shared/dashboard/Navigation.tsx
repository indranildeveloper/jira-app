"use client";

import { FC } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/constants/routes";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";

const Navigation: FC = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const fullHref = `/workspaces/${workspaceId}${route.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <Link key={route.href} href={fullHref}>
            <div
              className={cn(
                "hover:text-primary flex items-center gap-2.5 rounded-md p-2.5 font-medium text-slate-500 transition",
                isActive && "text-primary bg-white shadow-sm hover:opacity-100",
              )}
            >
              <Icon className="size-5 text-slate-500" />
              {route.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

export default Navigation;
