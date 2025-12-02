import { Badge } from "@/components/ui/badge";
import { DDItemStatus } from "@/types/legal";
import { cn } from "@/lib/utils";
import { FileX, Upload, FileCheck, XCircle } from "lucide-react";

interface DDItemStatusBadgeProps {
  status: DDItemStatus;
  className?: string;
  showIcon?: boolean;
}

export function DDItemStatusBadge({ status, className, showIcon = false }: DDItemStatusBadgeProps) {
  const statusConfig = {
    missing: {
      label: "Faltando",
      icon: FileX,
      className: "bg-muted text-muted-foreground hover:bg-muted/80",
    },
    uploaded: {
      label: "Enviado",
      icon: Upload,
      className: "bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20",
    },
    approved: {
      label: "Aprovado",
      icon: FileCheck,
      className: "bg-success/10 text-success border-success/20 hover:bg-success/20",
    },
    rejected: {
      label: "Rejeitado",
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn("gap-1", config.className, className)}>
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </Badge>
  );
}
