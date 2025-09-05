import { Models } from "node-appwrite";

export type TWorkspace = Models.Row & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
