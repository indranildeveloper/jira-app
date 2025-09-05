"use server";

import { Account, Client } from "node-appwrite";

import { cookies } from "next/headers";

import { AUTH_COOKIE } from "../constants/constants";

export const getCurrentUser = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const session = (await cookies()).get(AUTH_COOKIE);

    if (!session) {
      return null;
    }

    client.setSession(session?.value);

    const account = new Account(client);

    return await account.get();
  } catch (error) {
    console.error("Error while getting the user!", error);
    return null;
  }
};
