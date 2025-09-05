import { FC } from "react";

import { redirect, RedirectType } from "next/navigation";

import LoginCard from "@/components/shared/auth/LoginCard";
import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";

const LoginPage: FC = async () => {
  const user = await getCurrentUser();

  // TODO: This do not work on the first login

  if (user) {
    return redirect("/", RedirectType.replace);
  }

  return <LoginCard />;
};

export default LoginPage;
