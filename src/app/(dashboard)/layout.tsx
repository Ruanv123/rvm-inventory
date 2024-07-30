import { Breadcrumb } from "@/components/shared/breadcrumb";
import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/signin");
  }
  return (
    <div className=" w-full h-dvh flex">
      <div className="lg:w-[280px] md:w-[220px]">
        <Sidebar />
      </div>

      <div className="flex-1  flex flex-col">
        <Header />
        <div className="h-[calc(100vh-60px)] overflow-y-auto">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full">
            <Breadcrumb />
            {children}
          </main>
        </div>
      </div>
    </div>

    // <div className="grid min-h-svh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    //   <Sidebar />
    //   <div className="flex flex-col h-screen">
    //     <Header />
    //     {/* <ScrollArea className="h-[calc(100vh-60px)]"> */}
    //     <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    //       {/* <Breadcrumb /> */}
    //       {/* {children} */}

    //       <div className="bg-red-500 max-h-full overflow-y-auto">
    //           <div className=" h-[1000px] bg-green-500">

    //           </div>

    //       </div>
    //     </main>
    //     {/* </ScrollArea> */}
    //   </div>
    // </div>
  );
}
