import { FC } from "react";
import { getCurrentUser } from "@/features/auth/actions/getCurrentUser";
import { redirect } from "next/navigation";
import { getWorkspaces } from "@/features/workspaces/actions/getWorkspaces";

const HomePage: FC = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    return redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.rows[0].$id}`);
  }
};

export default HomePage;
