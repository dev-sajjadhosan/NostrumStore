"use client";
import { useEffect, useState } from "react";
import { Badge, Timer } from "lucide-react";
import { calculateTimeLeft, formatNumber } from "@/helpers/is-new-date";

export default function ProductTimer({ data }: { data: any }) {
  const [timeLeft, setTimeLeft] = useState<{hours: number, minutes: number, seconds: number} | null>(null);

  useEffect(() => {
    if (!data?.offerEndDate) return;
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(data.offerEndDate);
      setTimeLeft(remaining);
      
      if (!remaining) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.offerEndDate]);
  if (!timeLeft) return null; 

  return (
    <Badge className="text-md font-semibold tracking-wider px-4 py-2 flex items-center gap-1 bg-orange-500">
      <Timer className="size-4" />
      {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
    </Badge>
  );
}