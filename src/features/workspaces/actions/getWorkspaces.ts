"use server";

import { Account, Client, Databases, Query, TablesDB } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config/config";

export const getWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const session = (await cookies()).get(AUTH_COOKIE);

    if (!session) {
      return { rows: [], total: 0 };
    }

    client.setSession(session?.value);

    // const databases = new Databases(client);
    const tables = new TablesDB(client);
    const account = new Account(client);

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
