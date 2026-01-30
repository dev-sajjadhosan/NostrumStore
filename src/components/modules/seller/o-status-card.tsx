import { Card, CardContent } from "@/components/ui/card";

export default function StatusCard({
  title,
  count,
  icon: Icon,
  color = "bg-white",
}: any) {
  return (
    <Card className={`border-none shadow-sm`}>
      <CardContent className="p-6 flex items-center justify-between text-center">
        <div>
          <p className="text-xl font-semibold text-muted-foreground capitalize">
            {title}
          </p>
          <p className="text-2xl font-semibold mt-1">{count}</p>
        </div>
        <Icon
          className={`size-15 ${color || "text-muted-foreground"}`}
          strokeWidth={1}
        />
      </CardContent>
    </Card>
  );
}
