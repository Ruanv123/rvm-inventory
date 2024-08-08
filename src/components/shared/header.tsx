import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
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
import { Button } from "../ui/button";
import { SeachFilter } from "./filter";

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
          <SeachFilter />
        </form>
      </div>
      <ModeToggle />

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
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
      </DropdownMenu> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session.user.image || "/04.png"}
                alt={session.user.name || "avatar image"}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <Link href="/settings">
              <DropdownMenuItem className="cursor-pointer">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Logout>
            <DropdownMenuItem className="cursor-pointer">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Logout>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
