"use server";

import { createSessionClient } from "@/appwrite/appwrite";
import { DATABASE_ID, WORKSPACES_ID } from "@/config/config";
import { getMember } from "@/features/members/utils/getMember";
import { GetWorkspaceProps } from "@/interfaces/GetWorkspaceProps";
import { TWorkspace } from "@/types/workspace";

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
  try {
    const sessionClient = await createSessionClient();

    if (!sessionClient) {
      return null;
    }

    const { tables, account } = sessionClient;

    const user = await account.get();

    const member = await getMember({
      databases: tables,
      workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return null;
    }

    const workspace = await tables.getRow<TWorkspace>({
      databaseId: DATABASE_ID,
      tableId: WORKSPACES_ID,
      rowId: workspaceId,
    });

    return workspace;
  } catch (error) {
    console.error("Error while getting the user!", error);
    return null;
  }
};
