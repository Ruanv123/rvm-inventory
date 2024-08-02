import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "./_components/overview";
import { RecentSales } from "./_components/recent-sales";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TotalRevenue } from "./_components/total-revenue";
import { HomeSubscriptions } from "./_components/subscriptions";
import { SalesCard } from "./_components/sales-card";
import { ActiveNow } from "./_components/active-now";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Home</h1>
      </div>

      {/* <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex justify-between items-start md:items-center gap-3 flex-col-reverse lg:flex-row">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList> */}
      {/* <div className="flex gap-2">
         <DatePickerWithRange /> 
        <Button size="sm" className="gap-1">
          {" "}
          <Download className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Download
          </span>
        </Button>
      </div> */}
      {/* </div>
        <TabsContent value="overview" className="space-y-4"> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense
          key={"total-revenue"}
          fallback={<Skeleton className="rounded-lg border w-full" />}
        >
          <TotalRevenue />
        </Suspense>
        <Suspense
          key={"subscriptions"}
          fallback={<Skeleton className="rounded-lg border w-full" />}
        >
          <HomeSubscriptions />
        </Suspense>
        <Suspense
          key={"sales"}
          fallback={<Skeleton className="rounded-lg border w-full" />}
        >
          <SalesCard />
        </Suspense>
        <Suspense
          key={"activenow"}
          fallback={<Skeleton className="rounded-lg border w-full" />}
        >
          <ActiveNow />
        </Suspense>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 h-fit">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3 h-fit">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
      {/* </TabsContent>
        <TabsContent value="reports">
          <h1>Reports</h1>
        </TabsContent>
      </Tabs> */}
    </>
  );
}
