"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import AuthNav from "@/components/shared/authNav";
import { Home } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useActivePath } from "@/hooks/use-active-path";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HLayout({ children }: { children: ReactNode }) {
  const isPath = useActivePath();
  return (
    <>
      <div className="md:p-8">
        <Card className="w-full lg:h-180 rounded-xl border-0">
          <CardContent className="h-full flex flex-col items-center p-3">
            <div className="flex items-center justify-between w-11/12">
              <div className="flex items-center gap-3">
                <Avatar className="w-15 h-15">
                  <AvatarImage src={"vercel.svg"} className="p-3" />
                  <AvatarFallback>
                    {isPath("/quick-up")
                      ? "QU"
                      : isPath("/login")
                        ? "LG"
                        : isPath("/register")
                          ? "RG"
                          : isPath("/register/verify")
                            ? "VA"
                            : "UN"}
                  </AvatarFallback>
                </Avatar>

                <h1 className="text-lg font-semibold">
                  {isPath("/quick-up")
                    ? "Quick Up"
                    : isPath('/auth/roles')
                      ? "Update Your Role"
                      : isPath("/login")
                        ? "Login"
                        : isPath("/register")
                          ? "Register"
                          : isPath("/register/verify")
                            ? "Verify Account"
                            : "Unknown"}
                </h1>
              </div>
              <Link href={"/"}>
                <Button>
                  <Home />
                </Button>
              </Link>
            </div>
            <div className="flex gap-10 flex-col-reverse lg:flex-row items-center justify-between w-full h-full">
              <div className="lg:pl-40 w-full">{children}</div>
              <div className="h-full flex items-center justify-center border-l-2 rounded-full lg:pl-19 mt-5 lg:mt-0">
                {isPath("/auth/roles") ? <div /> : <AuthNav />}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
