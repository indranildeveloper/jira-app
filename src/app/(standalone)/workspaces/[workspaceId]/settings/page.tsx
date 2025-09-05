import { FC } from "react";

import { redirect } from "next/navigation";

import EditWorkspaceForm from "@/components/shared/dashboard/EditWorkspaceForm";
import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";
import { getWorkspace } from "@/features/workspaces/actions/getWorkspace";
import { WorkspaceIdSettingsPageProps } from "@/interfaces/WorkspaceIdSettingsPageProps";

const WorkspaceIdSettingsPage: FC<WorkspaceIdSettingsPageProps> = async ({
  params,
}) => {
  const { workspaceId } = await params;

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const initialValues = await getWorkspace({ workspaceId });

  if (!initialValues) {
    return redirect(`/workspaces/${workspaceId}`);
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
