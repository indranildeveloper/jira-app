import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/hono/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to delete workspace!");
      }

      return await response.json();
    },

    onSuccess: ({ data }) => {
      toast.success("Workspace Deleted!");
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
      toast.error("Failed to delete workspace!");
    },
  });

  return mutation;
};
