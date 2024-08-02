import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export function SessionLayout({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
