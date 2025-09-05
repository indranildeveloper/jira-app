import { FC } from "react";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";

const WorkspaceIdPage: FC = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return <div>WorkspaceIdPage</div>;
};

export default WorkspaceIdPage;
