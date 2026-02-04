import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./tooltip";
import React from "react";
import { Button } from "./button"; 

interface TooltipButtonProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
  description?: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  align?: "end" | "center" | "start" | undefined;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  disabled?: boolean;
  size?: "icon-sm" | "icon" | "icon-lg" | null | undefined;

  className?: string;
}

export function TooltipButton({
  icon: Icon, 
  title,
  onClick,
  description,
  side = "bottom",
  align,
  variant = "ghost",
  disabled,
  size = "icon-lg",
  className
}: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={size}
            variant={variant}
            className={`{className} rounded-full`}
            onClick={onClick}
            disabled={disabled}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{title}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
