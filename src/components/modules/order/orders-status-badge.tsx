import { Badge } from "lucide-react";

export default function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Pending: "bg-orange-100 text-orange-700 border-orange-200",
    Shipped: "bg-purple-100 text-purple-700 border-purple-200",
    Delivered: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <Badge className={`${styles[status]} font-semibold px-5 py-2`}>
      {status}
    </Badge>
  );
}
