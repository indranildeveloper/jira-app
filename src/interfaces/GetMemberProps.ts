import { type TablesDB } from "node-appwrite";

export interface GetMemberProps {
  databases: TablesDB;
  workspaceId: string;
  userId: string;
}
