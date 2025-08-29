"use client";

import { FC } from "react";
import { useMedia } from "react-use";
import { ResponsiveModalProps } from "@/interfaces/ResponsiveModalProps";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const ResponsiveModal: FC<ResponsiveModalProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogHeader className="hidden">
          <DialogTitle>Dashboard Modal</DialogTitle>
        </DialogHeader>
        <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto sm:max-w-lg">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerHeader className="hidden">
        <DrawerTitle>Dashboard Drawer</DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <div className="hide-scrollbar max-h-[85vh] overflow-y-auto">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;
