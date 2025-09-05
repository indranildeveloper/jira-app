import { FC } from "react";

import CreateWorkspaceForm from "@/components/shared/dashboard/CreateWorkspaceForm";

const CreateWorkspacePage: FC = () => {
  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
};

export default CreateWorkspacePage;
