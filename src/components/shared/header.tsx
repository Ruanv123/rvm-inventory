import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { Search } from "lucide-react";
import Logout from "../logou";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ">
      <MobileNav />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <Button variant="secondary" size="icon" className="rounded-full"> */}
          {/* <CircleUser className="h-5 w-5" /> */}
          <div>
            <Avatar className="rounded-md size-[38px] cursor-pointer border">
              <AvatarImage
                src={
                  session.user.image ||
                  "https://xsgames.co/randomusers/avatar.php?g=pixel"
                }
                alt=""
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </div>
          {/* </Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings" prefetch={false}>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <Logout>
            <DropdownMenuItem className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </Logout>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
