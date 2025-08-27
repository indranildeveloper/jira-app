import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Navigation from "./Navigation";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const Sidebar: FC = () => {
  return (
    <aside className="h-full w-full bg-slate-100 p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Jira Logo" width={50} height={40} />
        <h2 className="text-xl font-bold">Jira App</h2>
      </Link>
      <Separator className="my-4" />
      <WorkspaceSwitcher />
      <Separator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
