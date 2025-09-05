"use client";

import { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AuthLayoutProps } from "@/interfaces/AuthLayoutProps";

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isSignInPage = pathname === "/login";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-screen-w-2xl mx-auto p-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Jira Logo" height={40} width={60} />
            <h2 className="text-2xl">Jira App</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href={isSignInPage ? "/register" : "/login"}>
                {isSignInPage ? "Register" : "Log In"}
              </Link>
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-8 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
