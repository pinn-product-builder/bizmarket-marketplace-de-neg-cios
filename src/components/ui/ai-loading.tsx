import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AILoadingProps {
  className?: string;
  message?: string;
}

export const AILoading = ({ className, message = "IA pensando..." }: AILoadingProps) => {
  return (
    <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
      <div className="relative">
        <Loader2 className="w-4 h-4 animate-spin" />
        <Sparkles className="w-3 h-3 absolute top-0 left-0 animate-pulse text-primary" />
      </div>
      <span className="text-sm animate-pulse">{message}</span>
    </div>
  );
};
