import { Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID } from "@/config/config";
import { GetMemberProps } from "@/interfaces/GetMemberProps";

export const getMember = async ({
  databases,
  workspaceId,
  userId,
}: GetMemberProps) => {
  const members = await databases.listRows({
    databaseId: DATABASE_ID,
    tableId: MEMBERS_ID,
    queries: [
      Query.equal("workspaceId", workspaceId),
      Query.equal("userId", userId),
    ],
  });

  return members.rows[0];
};
