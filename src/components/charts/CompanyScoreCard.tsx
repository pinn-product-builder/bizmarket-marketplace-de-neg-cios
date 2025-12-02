import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CompanyScore, getScoreRating, getScoreBgColor } from "@/lib/company-scoring";
import { Trophy, DollarSign, Briefcase, Scale } from "lucide-react";

interface CompanyScoreCardProps {
  score: CompanyScore;
  rank?: number;
}

export const CompanyScoreCard = ({ score, rank }: CompanyScoreCardProps) => {
  const rating = getScoreRating(score.totalScore);
  const bgColor = getScoreBgColor(score.totalScore);

  return (
    <Card className={`border-2 ${bgColor} transition-all duration-300 hover:shadow-lg`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{score.companyName}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {rating.label}
            </Badge>
          </div>
          {rank && (
            <div className="flex flex-col items-center">
              <Trophy className={`w-6 h-6 mb-1 ${rank === 1 ? 'text-warning' : 'text-muted-foreground'}`} />
              <span className="text-xs font-semibold text-muted-foreground">#{rank}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Total */}
        <div className="text-center p-4 rounded-lg bg-background/50">
          <div className="text-4xl font-bold mb-1" style={{ color: `hsl(var(--${rating.label === 'Excelente' || rating.label === 'Muito Bom' ? 'success' : rating.label === 'Bom' ? 'secondary' : rating.label === 'Regular' ? 'warning' : 'destructive'}))` }}>
            {score.totalScore}
          </div>
          <div className="text-xs text-muted-foreground font-medium">SCORE GERAL</div>
        </div>

        {/* Scores por Categoria */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-success" />
                <span className="text-xs font-medium">Financeiro</span>
              </div>
              <span className="text-xs font-semibold">{score.financialScore}</span>
            </div>
            <Progress value={score.financialScore} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-medium">Operacional</span>
              </div>
              <span className="text-xs font-semibold">{score.operationalScore}</span>
            </div>
            <Progress value={score.operationalScore} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs font-medium">Jurídico</span>
              </div>
              <span className="text-xs font-semibold">{score.legalScore}</span>
            </div>
            <Progress value={score.legalScore} className="h-2" />
          </div>
        </div>

        {/* Breakdown Detalhado */}
        <div className="pt-3 border-t">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Detalhamento</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Faturamento:</span>
              <span className="font-medium">{score.breakdown.revenue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Margem:</span>
              <span className="font-medium">{score.breakdown.profitMargin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Crescimento:</span>
              <span className="font-medium">{score.breakdown.growth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Funcionários:</span>
              <span className="font-medium">{score.breakdown.employees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Maturidade:</span>
              <span className="font-medium">{score.breakdown.maturity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Conformidade:</span>
              <span className="font-medium">{score.breakdown.legalCompliance}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
