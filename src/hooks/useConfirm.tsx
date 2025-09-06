import { ReactNode, useState } from "react";

import ResponsiveModal from "@/components/shared/dashboard/ResponsiveModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseConfirmProps } from "@/interfaces/UseConfirmProps";

export const useConfirm = ({
  title,
  message,
  variant = "default",
}: UseConfirmProps): [() => ReactNode, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = async () => {
    try {
      return await new Promise((resolve) => {
        setPromise({ resolve });
      });
    } catch (error) {
      console.error("Something went wrong while confirming: ", error);
    }
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
        <Card className="h-full w-full border-none shadow-none">
          <CardContent className="px-0">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <div className="flex w-full flex-col items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row">
              <Button
                className="w-full lg:w-auto"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="w-full lg:w-auto"
                variant={variant}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );
  };

  return [ConfirmationDialog, confirm];
};
