import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiskLevelBadge } from "./RiskLevelBadge";
import { LegalDDChecklist } from "@/types/legal";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LegalCompletionCardProps {
  checklist: LegalDDChecklist;
}

export function LegalCompletionCard({ checklist }: LegalCompletionCardProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Status da Due Diligence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Completude</span>
            <span className="text-sm font-bold">{checklist.completionPercentage}%</span>
          </div>
          <Progress value={checklist.completionPercentage} className="h-3" />
        </div>

        <div>
          <span className="text-sm font-medium mb-2 block">Nível de Risco</span>
          <RiskLevelBadge level={checklist.riskLevel} />
        </div>

        {checklist.lastReviewedAt && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <Calendar className="w-4 h-4" />
            <span>
              Última revisão:{" "}
              {format(new Date(checklist.lastReviewedAt), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </span>
          </div>
        )}

        {checklist.notes && (
          <div className="pt-2 border-t">
            <span className="text-sm font-medium mb-1 block">Observações</span>
            <p className="text-sm text-muted-foreground">{checklist.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
