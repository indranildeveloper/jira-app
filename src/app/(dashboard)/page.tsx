import { FC } from "react";
import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";
import { redirect } from "next/navigation";
import CreateWorkspaceForm from "@/components/shared/dashboard/CreateWorkspaceForm";

const HomePage: FC = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="m-10 flex gap-4">
      <div className="w-full">
        <CreateWorkspaceForm />
      </div>
    </div>
  );
};

export default HomePage;
