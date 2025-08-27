import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required!"),
  email: z.email().trim().min(1, "Email is required!"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

export type signUpFormValidator = z.infer<typeof signUpFormSchema>;
