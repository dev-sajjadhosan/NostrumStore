import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeAlert, Construction } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Badge variant={"secondary"} className="px-4 py-3 text-md">
        Announcement
      </Badge>
      <h1 className="text-[13rem]">Nostrum Store</h1>
      <h2 className="text-xl">This is under development. Stay tuned!</h2>
    </div>
  );
}
