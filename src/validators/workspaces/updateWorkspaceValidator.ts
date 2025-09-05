import { z } from "zod";

export const updateWorkSpaceSchema = z.object({
  name: z.string().trim().min(1, "Workspace name is required!").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export type updateWorkspaceValidator = z.infer<typeof updateWorkSpaceSchema>;
