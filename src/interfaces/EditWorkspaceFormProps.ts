import { TWorkspace } from "@/types/workspace";

export interface EditWorkspaceFormProps {
  handleCancel?: () => void;
  initialValues: TWorkspace;
}
