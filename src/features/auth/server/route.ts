import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { signInFormSchema } from "@/validators/auth/signInFormValidator";
import { signUpFormSchema } from "@/validators/auth/signUpFormValidator";
import { createAdminClient } from "@/appwrite/appwrite";
import { AUTH_COOKIE } from "../constants/constants";
import { sessionMiddleware } from "../../middlewares/sessionMiddleware";

const app = new Hono()
  .get("/current-user", sessionMiddleware, (ctx) => {
    const user = ctx.get("user");

    return ctx.json({ data: user });
  })
  .post("/login", zValidator("json", signInFormSchema), async (ctx) => {
    const { email, password } = ctx.req.valid("json");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(ctx, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return ctx.json({
      success: true,
    });
  })
  .post("/register", zValidator("json", signUpFormSchema), async (ctx) => {
    const { name, email, password } = ctx.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(ctx, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return ctx.json({
      success: true,
    });
  })
  .post("/logout", sessionMiddleware, async (ctx) => {
    const account = ctx.get("account");
    deleteCookie(ctx, AUTH_COOKIE);

    await account.deleteSession("current");

    return ctx.json({
      success: true,
    });
  });

export default app;
