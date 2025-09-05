import { FC } from "react";

import { redirect } from "next/navigation";

import CreateWorkspaceForm from "@/components/shared/dashboard/CreateWorkspaceForm";
import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";

const CreateWorkspacePage: FC = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
};

export default CreateWorkspacePage;
