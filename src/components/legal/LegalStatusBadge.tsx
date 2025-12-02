import { Badge } from "@/components/ui/badge";
import { NDAStatus } from "@/types/legal";
import { cn } from "@/lib/utils";

interface LegalStatusBadgeProps {
  status: NDAStatus;
  className?: string;
}

export function LegalStatusBadge({ status, className }: LegalStatusBadgeProps) {
  const statusConfig = {
    draft: {
      label: "Rascunho",
      className: "bg-muted text-muted-foreground hover:bg-muted/80",
    },
    pending_signature: {
      label: "Pendente Assinatura",
      className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
    },
    signed: {
      label: "Assinado",
      className: "bg-success/10 text-success border-success/20 hover:bg-success/20",
    },
    cancelled: {
      label: "Cancelado",
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
