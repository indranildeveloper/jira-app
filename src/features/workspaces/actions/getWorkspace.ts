"use server";

import { Account, Client, TablesDB } from "node-appwrite";

import { cookies } from "next/headers";

import { DATABASE_ID, WORKSPACES_ID } from "@/config/config";
import { AUTH_COOKIE } from "@/features/auth/constants/constants";
import { getMember } from "@/features/members/utils/getMember";
import { GetWorkspaceProps } from "@/interfaces/GetWorkspaceProps";
import { TWorkspace } from "@/types/workspace";

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const session = (await cookies()).get(AUTH_COOKIE);

    if (!session) {
      return null;
    }

    client.setSession(session?.value);

    const tables = new TablesDB(client);
    const account = new Account(client);

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
