"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import AuthNav from "@/components/shared/authNav";
import { Home } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useActivePath } from "@/hooks/use-active-path";

export default function PLayout({ children }: { children: ReactNode }) {
  const isPath = useActivePath();
  return (
    <>
    
      <div className="p-8">
        <Card className="w-full lg:h-180 rounded-xl border-0 p-0">
          <CardContent className="h-full flex flex-col items-center p-3">
            {children}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

{/* <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={"vercel.svg"}
                alt="Nostrum Store"
                width={30}
                height={30}
              />
              <h1 className="text-lg font-semibold">Your Profile</h1>
            </div>
            <Link href={"/"}>
              <Button>
                <Home />
              </Button>
            </Link>
          </CardHeader> */}