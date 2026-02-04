"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
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