"use client";

import { Minus, Plus } from "lucide-react";
import { TooltipButton } from "../ui/tooltip-button";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";

interface QuantityControlProps {
  price: number;
  initialQuantity?: number;
  // This function sends data to the parent
  onUpdate?: (data: { quantity: number; totalPrice: number }) => void;
}

export default function QuantityControl({
  price,
  initialQuantity = 1,
  onUpdate,
}: QuantityControlProps) {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const totalPrice = quantity * price;

  useEffect(() => {
    if (onUpdate) {
      onUpdate({ quantity, totalPrice });
    }
  }, [quantity, totalPrice, onUpdate]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-5 items-center px-4 py-2 h-14 border rounded-full bg-background shadow-sm">
        <TooltipButton
          icon={Minus}
          title="Decrement"
          variant="secondary"
          onClick={handleDecrement}
          disabled={quantity <= 1}
        />

        <span className="text-lg font-bold min-w-[2ch] text-center">
          {quantity}
        </span>

        <TooltipButton
          icon={Plus}
          title="Increment"
          variant="secondary"
          onClick={handleIncrement}
        />
      </div>
    </div>
  );
}
