import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";

export interface UseConfirmProps {
  title: string;
  message: string;
  variant: VariantProps<typeof buttonVariants>["variant"];
}
