import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import AuthNav from "@/components/shared/authNav";
import { Home } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

export default function HLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="p-8">
        <Card className="w-full h-180 rounded-xl border-0">
          <CardContent className="h-full flex flex-col items-center p-3">
            <div className="flex items-center justify-between w-11/12">
              <div className="flex items-center gap-3">
                <Image
                  src={"vercel.svg"}
                  alt="Nostrum Store"
                  width={30}
                  height={30}
                />
                <h1 className="text-lg font-semibold">Quick Up</h1>
              </div>
              <Link href={"/"}>
                <Button>
                  <Home /> 
                </Button>
              </Link>
            </div>
            <div className="flex gap-10 items-center justify-between w-full h-full">
              <div>{children}</div>
              <div className="h-full flex items-center justify-center border-l-2 rounded-full pl-19">
                {/* <span className="border h-full"></span> */}
                <AuthNav />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
