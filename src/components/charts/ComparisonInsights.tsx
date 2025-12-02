import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCompanyHistoricalData } from "@/lib/mock-comparison-data";
import { TrendingUp, TrendingDown, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { AIBadge } from "@/components/ui/ai-badge";
import { useState, useEffect } from "react";
import { generateComparisonInsights } from "@/lib/mock-ai-service";
import { AILoading } from "@/components/ui/ai-loading";

interface Company {
  id: string;
  companyName: string;
}

interface ComparisonInsightsProps {
  companies: Company[];
}

export const ComparisonInsights = ({ companies }: ComparisonInsightsProps) => {
  const [aiInsights, setAiInsights] = useState<{
    revenueAnalysis: string;
    overallRecommendation: string;
  } | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Calculate insights for each company
  const insights = companies.map((company) => {
    const data = getCompanyHistoricalData(company.id);
    const firstYear = data[0];
    const lastYear = data[data.length - 1];

    const revenueGrowth = ((lastYear.revenue - firstYear.revenue) / firstYear.revenue) * 100;
    const employeeGrowth = ((lastYear.employees - firstYear.employees) / firstYear.employees) * 100;
    const marginImprovement = lastYear.profitMargin - firstYear.profitMargin;

    return {
      company: company.companyName,
      revenueGrowth: revenueGrowth.toFixed(1),
      employeeGrowth: employeeGrowth.toFixed(1),
      marginImprovement: marginImprovement.toFixed(1),
      revenueCAGR: (Math.pow(lastYear.revenue / firstYear.revenue, 1 / 3) - 1) * 100,
    };
  });

  // Find best performer
  const bestRevenue = insights.reduce((max, current) =>
    parseFloat(current.revenueGrowth) > parseFloat(max.revenueGrowth) ? current : max
  );

  const bestMargin = insights.reduce((max, current) =>
    parseFloat(current.marginImprovement) > parseFloat(max.marginImprovement) ? current : max
  );

  // Generate AI insights
  useEffect(() => {
    const loadAIInsights = async () => {
      setLoadingAI(true);
      try {
        const analysis = await generateComparisonInsights({
          companies: insights,
          bestRevenue,
          bestMargin,
        });
        setAiInsights(analysis);
      } catch (error) {
        console.error("AI insights error:", error);
      } finally {
        setLoadingAI(false);
      }
    };
    
    if (companies.length > 0) {
      loadAIInsights();
    }
  }, [companies]);

  return (
    <Card className="border-2 bg-muted/30">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Insights da Comparação</h3>
          <AIBadge />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Revenue Leader */}
          <div className="p-4 bg-background rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success">Maior Crescimento em Faturamento</span>
            </div>
            <p className="text-lg font-bold mb-1">{bestRevenue.company}</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-success hover:bg-success">
                +{bestRevenue.revenueGrowth}%
              </Badge>
              <span className="text-xs text-muted-foreground">nos últimos 3 anos</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              CAGR: {bestRevenue.revenueCAGR.toFixed(1)}% ao ano
            </p>
          </div>

          {/* Margin Leader */}
          <div className="p-4 bg-background rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Melhor Evolução de Margem</span>
            </div>
            <p className="text-lg font-bold mb-1">{bestMargin.company}</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-secondary hover:bg-secondary">
                {parseFloat(bestMargin.marginImprovement) > 0 ? '+' : ''}{bestMargin.marginImprovement}pp
              </Badge>
              <span className="text-xs text-muted-foreground">de melhoria</span>
            </div>
          </div>
        </div>

        {/* AI-Generated Detailed Analysis */}
        {loadingAI && <AILoading className="mt-4" message="Gerando análise detalhada..." />}
        
        {aiInsights && (
          <div className="mt-4 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold">Análise Detalhada por IA</h4>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-foreground leading-relaxed">{aiInsights.revenueAnalysis}</p>
              <p className="text-foreground leading-relaxed font-medium bg-background/50 p-3 rounded border">
                {aiInsights.overallRecommendation}
              </p>
            </div>
          </div>
        )}

        {/* Individual Company Insights */}
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-semibold mb-3">Resumo por Empresa:</h4>
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-background rounded-lg border"
            >
              <span className="font-medium min-w-[150px]">{insight.company}</span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  {parseFloat(insight.revenueGrowth) >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  Faturamento: {insight.revenueGrowth}%
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {parseFloat(insight.employeeGrowth) >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-secondary" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  Funcionários: {insight.employeeGrowth}%
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {parseFloat(insight.marginImprovement) >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  Margem: {insight.marginImprovement}pp
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
