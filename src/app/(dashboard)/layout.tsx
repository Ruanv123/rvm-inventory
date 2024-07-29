import { Breadcrumb } from "@/components/shared/breadcrumb";
import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col h-screen">
        <Header />
        {/* <ScrollArea className="h-[calc(100vh-60px)]"> */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <Breadcrumb /> */}
          {children}
        </main>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}
