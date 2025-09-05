import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config/config";
import { MemberRole } from "@/features/members/constants/constants";
import { getMember } from "@/features/members/utils/getMember";
import { sessionMiddleware } from "@/features/middlewares/sessionMiddleware";
import { generateInviteCode } from "@/utils/generateInviteCode";
import { createWorkSpaceSchema } from "@/validators/workspaces/createWorkspaceValidator";
import { updateWorkSpaceSchema } from "@/validators/workspaces/updateWorkspaceValidator";

const app = new Hono()
  .get("/", sessionMiddleware, async (ctx) => {
    const tables = ctx.get("tables");
    const user = ctx.get("user");

    const members = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: MEMBERS_ID,
      queries: [Query.equal("userId", user.$id)],
    });

    if (members.total === 0) {
      return ctx.json({ data: { rows: [], total: 0 } });
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

    return ctx.json({
      data: workspaces,
    });
  })
  .post(
    "/",
    zValidator("form", createWorkSpaceSchema),
    sessionMiddleware,
    async (ctx) => {
      const tables = ctx.get("tables");
      const storage = ctx.get("storage");
      const user = ctx.get("user");

      const { name, image } = ctx.req.valid("form");

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile({
          bucketId: IMAGES_BUCKET_ID,
          fileId: ID.unique(),
          file: image,
        });

        const arrayBuffer = await storage.getFileView({
          bucketId: IMAGES_BUCKET_ID,
          fileId: file.$id,
        });

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      }

      const workspace = await tables.createRow({
        databaseId: DATABASE_ID,
        tableId: WORKSPACES_ID,
        rowId: ID.unique(),
        data: {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(10),
        },
      });

      await tables.createRow({
        databaseId: DATABASE_ID,
        tableId: MEMBERS_ID,
        rowId: ID.unique(),
        data: {
          userId: user.$id,
          workspaceId: workspace.$id,
          role: MemberRole.ADMIN,
        },
      });

      return ctx.json({ data: workspace });
    },
  )
  .patch(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form", updateWorkSpaceSchema),
    async (ctx) => {
      const tables = ctx.get("tables");
      const storage = ctx.get("storage");
      const user = ctx.get("user");

      const { workspaceId } = ctx.req.param();
      const { name, image } = ctx.req.valid("form");

      const member = await getMember({
        databases: tables,
        workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile({
          bucketId: IMAGES_BUCKET_ID,
          fileId: ID.unique(),
          file: image,
        });

        const arrayBuffer = await storage.getFileView({
          bucketId: IMAGES_BUCKET_ID,
          fileId: file.$id,
        });

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      } else {
        uploadedImageUrl = image;
      }

      const workspace = await tables.updateRow({
        databaseId: DATABASE_ID,
        tableId: WORKSPACES_ID,
        rowId: workspaceId,
        data: {
          name,
          imageUrl: uploadedImageUrl,
        },
      });

      return ctx.json({ data: workspace });
    },
  );

export default app;
