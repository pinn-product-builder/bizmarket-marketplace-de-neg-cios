import { Badge } from "@/components/ui/badge";
import { RiskLevel } from "@/types/legal";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

interface RiskLevelBadgeProps {
  level: RiskLevel;
  className?: string;
  showIcon?: boolean;
}

export function RiskLevelBadge({ level, className, showIcon = true }: RiskLevelBadgeProps) {
  const riskConfig = {
    unknown: {
      label: "Não Avaliado",
      icon: HelpCircle,
      className: "bg-muted text-muted-foreground hover:bg-muted/80",
    },
    low: {
      label: "Baixo Risco",
      icon: CheckCircle,
      className: "bg-success/10 text-success border-success/20 hover:bg-success/20",
    },
    medium: {
      label: "Risco Médio",
      icon: AlertTriangle,
      className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
    },
    high: {
      label: "Alto Risco",
      icon: AlertCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
    },
  };

  const config = riskConfig[level];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn("gap-1.5", config.className, className)}>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {config.label}
    </Badge>
  );
}
