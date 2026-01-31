import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function PMenuButton({
  icon: Icon,
  label,
  onClick,
  dev = true,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  dev?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="w-full justify-between h-12 px-4 hover:bg-muted/50 group"
    >
      <div className="flex items-center gap-3">
        <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="font-medium text-muted-foreground group-hover:text-foreground">
          {label}
        </span>
        <Badge
          className="px-5 text-md font-semibold text-muted-foreground"
          variant={"secondary"}
        >
          Working
        </Badge>
      </div>

      <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
    </Button>
  );
}
