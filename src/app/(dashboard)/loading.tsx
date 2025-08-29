import { Loader2Icon } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="flex h-[calc(100vh-232px)] items-center justify-center">
      <Loader2Icon className="text-muted-foreground size-6 animate-spin" />
    </div>
  );
};

export default DashboardLoading;
