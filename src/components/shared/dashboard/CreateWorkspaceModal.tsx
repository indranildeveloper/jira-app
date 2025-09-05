"use client";

import { FC } from "react";

import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/useCreateWorkspaceModal";

import CreateWorkspaceForm from "./CreateWorkspaceForm";
import ResponsiveModal from "./ResponsiveModal";

const CreateWorkspaceModal: FC = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm handleCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateWorkspaceModal;
