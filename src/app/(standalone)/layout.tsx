import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import UserButton from "@/components/shared/auth/UserButton";
import { StandaloneLayoutProps } from "@/interfaces/StandaloneLayoutProps";

const StandaloneLayout: FC<Readonly<StandaloneLayoutProps>> = ({
  children,
}) => {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex h-[74px] items-center justify-between">
          <Link className="flex items-center gap-2" href="/">
            <Image src="/logo.svg" alt="Logo" height={40} width={60} />
            <h2 className="text-2xl">Jira App</h2>
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
