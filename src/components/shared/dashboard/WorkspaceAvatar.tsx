import { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WorkspaceAvatarProps } from "@/interfaces/WorkspaceAvatarProps";

const WorkspaceAvatar: FC<WorkspaceAvatarProps> = ({
  image,
  name,
  className,
}) => {
  if (image) {
    return (
      <div
        className={cn("relative size-8 overflow-hidden rounded-md", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-8 rounded-md", className)}>
      <AvatarFallback className="rounded-md bg-blue-600 text-lg font-semibold text-white uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
