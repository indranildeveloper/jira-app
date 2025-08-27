import { FC } from "react";
import { DashboardLayoutProps } from "@/interfaces/DashboardLayoutProps";
import Sidebar from "@/components/shared/dashboard/Sidebar";
import Navbar from "@/components/shared/dashboard/Navbar";

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="flex h-full w-full">
        <div className="fixed top-0 left-0 hidden h-full overflow-y-auto lg:block lg:w-[264px]">
          <Sidebar />
        </div>

        <div className="w-full lg:pl-[264px]">
          <div className="max-screen-w-2xl mx-auto h-full">
            <Navbar />
            <main className="flex h-full flex-col px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
