import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export default function MetricCard({
  title,
  value,
  sub,
  icon: Icon
}: {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon
}) {
  return (
    <Card className="border-muted/40 shadow-sm">
      <CardHeader>
        <p className="text-xl font-normal text-muted-foreground ">{title}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-between px-5">
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-4xl font-bold tracking-tight">{value}</h3>
          <span className="text-xs text-muted-foreground">{sub}</span>
        </div>
        <Icon size={50} strokeWidth={1} />
      </CardContent>
    </Card>
  );
}
