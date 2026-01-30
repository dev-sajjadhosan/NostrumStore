import { LucideIcon, ShoppingBasket } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function PageBanner({
  name = "Unknown",
  icon: Icon,
}: {
  name: string;
  icon: LucideIcon;
}) {
  return (
    <>
      <Card className="lg:h-100">
        <CardContent className="h-full flex flex-col gap-10 lg:flex-row items-center justify-around">
          <Icon
            strokeWidth={1}
            className="text-orange-700 animate-pulse size-48 lg:size-64"
          />

          <h1 className="text-8xl font-bold mb-4 capitalize">{name}</h1>
        </CardContent>
      </Card>
    </>
  );
}
