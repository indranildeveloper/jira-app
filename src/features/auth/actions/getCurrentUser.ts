"use server";

import { createSessionClient } from "@/appwrite/appwrite";

export const getCurrentUser = async () => {
  try {
    const sessionClient = await createSessionClient();

    if (!sessionClient) {
      return null;
    }

    const { account } = sessionClient;

    return await account.get();
  } catch (error) {
    console.error("Error while getting the user!", error);
    return null;
  }
};
