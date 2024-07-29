"use client";

import { logout } from "@/_actions/login";
import { PropsWithChildren } from "react";

const Logout = ({ children }: PropsWithChildren) => {
  return (
    <span onClick={() => logout()} className="cursor-pointer">
      {children}
    </span>
  );
};

export default Logout;
