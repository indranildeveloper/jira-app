import "server-only";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  TablesDB,
  type Account as AccountType,
  type Databases as DatabaseType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";

import { AUTH_COOKIE } from "../auth/constants/constants";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabaseType;
    tables: TablesDB;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (ctx, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

    const session = getCookie(ctx, AUTH_COOKIE);

    if (!session) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);
    const tables = new TablesDB(client);

    const user = await account.get();

    ctx.set("account", account);
    ctx.set("databases", databases);
    ctx.set("tables", tables);
    ctx.set("storage", storage);
    ctx.set("user", user);

    await next();
  },
);
