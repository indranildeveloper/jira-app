"use server";

import { Query } from "node-appwrite";

import { createSessionClient } from "@/appwrite/appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config/config";

export const getWorkspaces = async () => {
  try {
    const sessionClient = await createSessionClient();

    if (!sessionClient) {
      return null;
    }

    const { tables, account } = sessionClient;

    const user = await account.get();

    const members = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: MEMBERS_ID,
      queries: [Query.equal("userId", user.$id)],
    });

    if (members.total === 0) {
      return { rows: [], total: 0 };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const workspaceIds = members.rows.map((member) => member.workspaceId);

    const workspaces = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: WORKSPACES_ID,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.contains("$id", workspaceIds),
      ],
    });

    return workspaces;
  } catch (error) {
    console.error("Error while getting the user!", error);
    return { rows: [], total: 0 };
  }
};
