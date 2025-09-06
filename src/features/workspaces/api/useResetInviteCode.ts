import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/hono/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"]
>;

export const useResetInviteCode = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"][
        "reset-invite-code"
      ]["$post"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to reset invite code for workspace!");
      }

      return await response.json();
    },

    onSuccess: ({ data }) => {
      toast.success("Workspace invite code reset!");
      queryClient
        .invalidateQueries({ queryKey: ["workspaces"] })
        .catch((error) =>
          console.error(
            "Something went wrong while invalidating the query:",
            error,
          ),
        );
      queryClient
        .invalidateQueries({ queryKey: ["workspace", data.$id] })
        .catch((error) =>
          console.error(
            "Something went wrong while invalidating the query:",
            error,
          ),
        );
    },
    onError: () => {
      toast.error("Failed to reset invite code for workspace!");
    },
  });

  return mutation;
};
