import { Hono } from "hono";
import { ID } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { createWorkSpaceSchema } from "@/validators/workspaces/createWorkspaceValidator";
import { sessionMiddleware } from "@/features/middlewares/sessionMiddleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config/config";

const app = new Hono()
  .get("/", sessionMiddleware, async (ctx) => {
    const databases = ctx.get("databases");

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
    );

    return ctx.json({
      data: workspaces,
    });
  })
  .post(
    "/",
    zValidator("form", createWorkSpaceSchema),
    sessionMiddleware,
    async (ctx) => {
      const databases = ctx.get("databases");
      const storage = ctx.get("storage");
      const user = ctx.get("user");

      const { name, image } = ctx.req.valid("form");

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );

        const arrayBuffer = await storage.getFileView(
          IMAGES_BUCKET_ID,
          file.$id,
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
        },
      );

      return ctx.json({ data: workspace });
    },
  );

export default app;
