import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.email().trim().min(1, "Email is required!"),
  password: z.string().min(1, "Password is required!"),
});

export type signInFormValidator = z.infer<typeof signInFormSchema>;
