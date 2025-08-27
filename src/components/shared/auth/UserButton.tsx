"use client";

import { FC } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LoaderIcon, LogOutIcon } from "lucide-react";
import { useLogout } from "@/features/auth/api/useLogout";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const UserButton: FC = () => {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();

  if (!user) {
    return null;
  }

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : (email.charAt(0).toUpperCase() ?? "U");

  if (isLoading) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full border border-slate-300 bg-slate-200">
        <LoaderIcon className="text-muted-foreground size-4 animate-spin" />
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 border border-slate-300 hover:opacity-75">
          <AvatarFallback className="flex items-center justify-center bg-slate-200 font-medium text-slate-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        side="bottom"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-14 border border-slate-300">
            <AvatarFallback className="flex items-center justify-center bg-slate-200 text-xl font-medium text-slate-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-slate-900">
              {name ?? "User"}
            </p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>
        <Separator className="mb-1" />
        <DropdownMenuItem
          className="flex h-10 cursor-pointer items-center justify-center font-medium text-rose-600"
          onClick={() => logout()}
        >
          <LogOutIcon className="mr-2 size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
