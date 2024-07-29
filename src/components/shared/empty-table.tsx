import Link from "next/link";
import { Button } from "../ui/button";

interface EmptyTableProps {
  title: string;
  name: string;
  description: string;
  buttonLink: string;
}

export function EmptyTable({
  title,
  description,
  buttonLink = "",
  name,
}: EmptyTableProps) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no {name}
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Link href={buttonLink} prefetch={false}>
          <Button className="mt-4">Add {name}</Button>
        </Link>
      </div>
    </div>
  );
}
