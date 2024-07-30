import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

export default function MovimentationsPage() {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Movimentations</h1>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Movimentation
          </span>
        </Button>
      </div>

      <section>
        <Tabs>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inner">Inner</TabsTrigger>
            <TabsTrigger value="outer">Outer</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <h1>Overview</h1>
          </TabsContent>
          <TabsContent value="inner">
            <h1>Overview</h1>
          </TabsContent>
          <TabsContent value="outer">
            <h1>Overview</h1>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
