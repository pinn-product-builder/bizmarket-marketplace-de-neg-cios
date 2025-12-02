import { Sparkles } from "lucide-react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface AIBadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

export const AIBadge = ({ className, variant = "secondary" }: AIBadgeProps) => {
  return (
    <Badge variant={variant} className={cn("gap-1 bg-gradient-to-r from-primary/20 to-secondary/20", className)}>
      <Sparkles className="w-3 h-3" />
      IA
    </Badge>
  );
};
