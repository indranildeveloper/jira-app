import "server-only";
import { Client, Account, Storage, Users, TablesDB } from "node-appwrite";

import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/features/auth/constants/constants";

// eslint-disable-next-line @typescript-eslint/require-await
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
    .setKey(process.env.NEXT_APPWRITE_KEY as string);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

  const session = (await cookies()).get(AUTH_COOKIE);

  if (!session || !session.value) {
    return null;
  }

  client.setSession(session?.value);

  return {
    get account() {
      return new Account(client);
    },
    get tables() {
      return new TablesDB(client);
    },
  };
}
