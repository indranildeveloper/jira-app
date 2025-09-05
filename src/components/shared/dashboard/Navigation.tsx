import { FC } from "react";

import Link from "next/link";

import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

const Navigation: FC = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const isActive = false;
        const Icon = isActive ? route.activeIcon : route.icon;

        return (
          <Link key={route.href} href={route.href}>
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
