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
import { PageTitle } from "@/components/page-title";

export default function Home() {
  return (
    <>
      <PageTitle title="Home" />

      <div className="flex gap-2 ml-auto">
        <DatePickerWithRange />
        <Button size="sm" className="gap-1">
          {" "}
          <Download className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Download
          </span>
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </section>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 h-fit">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 sm:col-span-3 h-fit">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
