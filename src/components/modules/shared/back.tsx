import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back({ path }: { path: string }) {
  const route = useRouter();
  return (
    <>
      <Button
        variant="ghost"
        onClick={() => route.push(path)}
        className="gap-2 "
      >
        <ChevronLeft className="size-4" /> Back
      </Button>
    </>
  );
}
