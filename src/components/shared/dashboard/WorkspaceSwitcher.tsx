"use client";

import { FC } from "react";

import { RiAddCircleFill } from "react-icons/ri";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/useCreateWorkspaceModal";
import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import WorkspaceAvatar from "./WorkspaceAvatar";

const WorkspaceSwitcher: FC = () => {
  const router = useRouter();
  const { data: workspaces } = useGetWorkspaces();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspaceModal();

  const handleWorkspaceChange = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 uppercase">Workspaces</p>
        <button onClick={open}>
          <RiAddCircleFill className="size-5 cursor-pointer text-slate-500 transition hover:opacity-75" />
        </button>
      </div>
      <Select value={workspaceId} onValueChange={handleWorkspaceChange}>
        <SelectTrigger className="w-full cursor-pointer bg-slate-200 py-6 font-medium">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.rows.map((workspace) => (
            <SelectItem
              key={workspace.$id}
              value={workspace.$id}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-start gap-3 font-medium">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
