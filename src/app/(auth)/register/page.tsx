import { FC } from "react";

import { redirect } from "next/navigation";

import RegisterCard from "@/components/shared/auth/RegisterCard";
import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";

const RegisterPage: FC = async () => {
  const user = await getCurrentUser();

  if (user) {
    return redirect("/");
  }

  return <RegisterCard />;
};

export default RegisterPage;
