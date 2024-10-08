"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightLeft,
  Bell,
  Home,
  Package,
  Package2,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";

export const navItems = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Products",
    href: "/products",
    icon: <Package className="h-4 w-4" />,
  },
  {
    label: "Movimentations",
    href: "/movimentations",
    icon: <ArrowRightLeft className="h-4 w-4" />,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    label: "Suppliers",
    href: "/suppliers",
    icon: <Truck className="h-4 w-4" />,
  },
  // {
  //   label: "Customers",
  //   href: "/customer",
  //   icon: <Users2 className="h-4 w-4" />,
  // },
  // {
  //   label: "Sales",
  //   href: "/sale",
  //   icon: <CreditCard className="h-4 w-4" />,
  // },
  // {
  //   label: "Analytics",
  //   href: "/analytics",
  //   icon: <LineChart className="h-4 w-4" />,
  // },
  {
    label: "Organizations",
    href: "/admin/organization",
    icon: <Users className="h-4 w-4" />,
    role: "ADMIN",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="hidden border-r bg-muted/40 md:block h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Rvm Systems</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((navItem) => {
              /* verificacao para rotas privadas */
              if (navItem.role && navItem.role !== session?.user.role)
                return null;

              return (
                <Link
                  key={navItem.label}
                  href={navItem.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    pathname === navItem.href ? "bg-muted text-primary" : ""
                  }`}
                >
                  {navItem.icon}
                  {navItem.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {session?.user.role !== "ADMIN" && (
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </aside>
  );
}
