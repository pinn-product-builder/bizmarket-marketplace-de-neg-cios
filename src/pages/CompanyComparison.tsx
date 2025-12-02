import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useComparison } from "@/contexts/ComparisonContext";
import { useAuth } from "@/contexts/AuthContext";
import { ComparisonLineChart } from "@/components/charts/ComparisonLineChart";
import { ComparisonBarChart } from "@/components/charts/ComparisonBarChart";
import { ComparisonRadarChart } from "@/components/charts/ComparisonRadarChart";
import { ComparisonInsights } from "@/components/charts/ComparisonInsights";
import { CompanyScoreCard } from "@/components/charts/CompanyScoreCard";
import { getCombinedHistoricalData, CHART_COLORS } from "@/lib/mock-comparison-data";
import { getAverageBenchmark } from "@/lib/sector-benchmarks";
import { calculateCompanyScore, DEFAULT_WEIGHTS, CategoryWeights } from "@/lib/company-scoring";
import {
  ArrowLeft,
  X,
  Building2,
  MapPin,
  Users,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Scale,
  DollarSign,
  CalendarDays,
  BarChart3,
  LineChart as LineChartIcon,
  Radar as RadarIcon,
  Target,
  Trophy,
  Settings,
  RotateCcw,
} from "lucide-react";

// Mock data para informações adicionais (normalmente viria de API)
const getMockCompanyDetails = (id: string) => {
  const details: Record<string, any> = {
    "1": {
      foundedYear: 2018,
      profitMargin: "25%",
      growthRate: "15%",
      debtLevel: "Baixo",
      legalStatus: "Aprovado",
      legalRisk: "Baixo",
      documentsComplete: true,
      employees: 45,
      revenue: "R$ 5M/ano",
    },
    "2": {
      foundedYear: 2015,
      profitMargin: "18%",
      growthRate: "22%",
      debtLevel: "Médio",
      legalStatus: "Em revisão",
      legalRisk: "Médio",
      documentsComplete: false,
      employees: 120,
      revenue: "R$ 12M/ano",
    },
    "3": {
      foundedYear: 2020,
      profitMargin: "30%",
      growthRate: "40%",
      debtLevel: "Baixo",
      legalStatus: "Aprovado",
      legalRisk: "Baixo",
      documentsComplete: true,
      employees: 35,
      revenue: "R$ 3M/ano",
    },
    "4": {
      foundedYear: 2012,
      profitMargin: "20%",
      growthRate: "12%",
      debtLevel: "Médio",
      legalStatus: "Aprovado",
      legalRisk: "Médio",
      documentsComplete: true,
      employees: 80,
      revenue: "R$ 8M/ano",
    },
    "5": {
      foundedYear: 2010,
      profitMargin: "15%",
      growthRate: "8%",
      debtLevel: "Alto",
      legalStatus: "Pendente",
      legalRisk: "Alto",
      documentsComplete: false,
      employees: 95,
      revenue: "R$ 15M/ano",
    },
    "6": {
      foundedYear: 2019,
      profitMargin: "28%",
      growthRate: "35%",
      debtLevel: "Baixo",
      legalStatus: "Aprovado",
      legalRisk: "Baixo",
      documentsComplete: true,
      employees: 60,
      revenue: "R$ 4M/ano",
    },
  };
  return details[id] || details["1"];
};

const getRiskBadge = (risk: string) => {
  if (risk === "Baixo")
    return (
      <Badge className="bg-success hover:bg-success">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        {risk}
      </Badge>
    );
  if (risk === "Médio")
    return (
      <Badge className="bg-warning hover:bg-warning">
        <AlertCircle className="w-3 h-3 mr-1" />
        {risk}
      </Badge>
    );
  return (
    <Badge variant="destructive">
      <XCircle className="w-3 h-3 mr-1" />
      {risk}
    </Badge>
  );
};

export default function CompanyComparison() {
  const { companies, removeCompany, clearAll } = useComparison();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [yearsFilter, setYearsFilter] = useState<1 | 2 | 3>(3);
  const [customWeights, setCustomWeights] = useState<CategoryWeights>(DEFAULT_WEIGHTS);
  const [showWeightSettings, setShowWeightSettings] = useState(false);

  // Reset weights to default
  const resetWeights = () => {
    setCustomWeights(DEFAULT_WEIGHTS);
  };

  // Update weight and adjust others to maintain 100% total
  const updateWeight = (category: keyof CategoryWeights, value: number) => {
    const newValue = value / 100; // Convert from 0-100 to 0-1
    const otherCategories = (Object.keys(customWeights) as Array<keyof CategoryWeights>)
      .filter(k => k !== category);
    
    // Calculate remaining weight
    const remaining = 1 - newValue;
    
    // Distribute remaining proportionally to other categories
    const currentOthersTotal = otherCategories.reduce((sum, key) => sum + customWeights[key], 0);
    
    const newWeights = { ...customWeights, [category]: newValue };
    
    if (currentOthersTotal > 0) {
      otherCategories.forEach(key => {
        newWeights[key] = (customWeights[key] / currentOthersTotal) * remaining;
      });
    } else {
      // If others are 0, distribute equally
      const equalShare = remaining / otherCategories.length;
      otherCategories.forEach(key => {
        newWeights[key] = equalShare;
      });
    }
    
    setCustomWeights(newWeights);
  };

  // Prepare chart data with year filter
  const historicalData = companies.length > 0 
    ? getCombinedHistoricalData(companies.map((c) => c.id), yearsFilter)
    : [];

  // Prepare data keys for charts
  const revenueDataKeys = companies.map((company, index) => ({
    key: `revenue${index}`,
    name: company.companyName,
    color: CHART_COLORS[index],
  }));

  const employeesDataKeys = companies.map((company, index) => ({
    key: `employees${index}`,
    name: company.companyName,
    color: CHART_COLORS[index],
  }));

  const profitMarginDataKeys = companies.map((company, index) => ({
    key: `profitMargin${index}`,
    name: company.companyName,
    color: CHART_COLORS[index],
  }));

  // Prepare radar chart data - normalize all metrics to 0-100 scale
  const getRadarData = () => {
    if (companies.length === 0) return [];

    // Get benchmark based on company sectors
    const sectors = companies.map((c) => c.sector);
    const benchmark = getAverageBenchmark(sectors);

    const metrics = [
      { metric: "Faturamento", max: 15, benchmarkKey: "revenue" },
      { metric: "Margem de Lucro", max: 30, benchmarkKey: "profitMargin" },
      { metric: "Crescimento", max: 40, benchmarkKey: "growth" },
      { metric: "Funcionários", max: 120, benchmarkKey: "employees" },
      { metric: "Maturidade", max: 15, benchmarkKey: "maturity" },
      { metric: "Conformidade Jurídica", max: 100, benchmarkKey: "legalCompliance" },
      { metric: "Baixo Risco", max: 100, benchmarkKey: "lowRisk" },
    ];

    return metrics.map((m) => {
      const dataPoint: any = { metric: m.metric };
      
      companies.forEach((company, index) => {
        const details = getMockCompanyDetails(company.id);
        const currentYear = 2024;
        
        let value = 0;
        switch (m.metric) {
          case "Faturamento":
            value = (parseFloat(details.revenue.replace(/[^\d.]/g, "")) / m.max) * 100;
            break;
          case "Margem de Lucro":
            value = (parseFloat(details.profitMargin) / m.max) * 100;
            break;
          case "Crescimento":
            value = (parseFloat(details.growthRate) / m.max) * 100;
            break;
          case "Funcionários":
            value = (details.employees / m.max) * 100;
            break;
          case "Maturidade":
            const age = currentYear - details.foundedYear;
            value = (age / m.max) * 100;
            break;
          case "Conformidade Jurídica":
            value = details.documentsComplete ? 100 : 50;
            break;
          case "Baixo Risco":
            if (details.legalRisk === "Baixo") value = 100;
            else if (details.legalRisk === "Médio") value = 50;
            else value = 20;
            break;
        }
        
        dataPoint[`company${index}`] = Math.min(100, value);
      });

      // Add benchmark value
      dataPoint["benchmark"] = benchmark[m.benchmarkKey as keyof typeof benchmark];
      
      return dataPoint;
    });
  };

  const radarData = getRadarData();
  const radarDataKeys = [
    ...companies.map((company, index) => ({
      key: `company${index}`,
      name: company.companyName,
      color: CHART_COLORS[index],
    })),
    {
      key: "benchmark",
      name: "Média do Setor",
      color: "hsl(var(--muted-foreground))",
    },
  ];

  // Calculate scores for all companies with custom weights
  const companyScores = companies
    .map((company) => {
      const details = getMockCompanyDetails(company.id);
      return calculateCompanyScore(company.id, company.companyName, details, customWeights);
    })
    .sort((a, b) => b.totalScore - a.totalScore); // Sort by score descending

  const content = (
    <div className={isAuthenticated ? "p-4 md:p-8" : ""}>
      <div className={isAuthenticated ? "max-w-7xl mx-auto" : "container mx-auto px-4 lg:px-8"}>
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Marketplace
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
                Comparar Empresas
              </h1>
              <p className="text-muted-foreground">
                Compare métricas financeiras, operacionais e jurídicas lado a lado
              </p>
            </div>
            {companies.length > 0 && (
              <Button variant="outline" onClick={clearAll} className="w-full sm:w-auto">
                <X className="w-4 h-4 mr-2" />
                Limpar Todas
              </Button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {companies.length === 0 && (
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">
                Nenhuma empresa selecionada
              </h3>
              <p className="text-muted-foreground mb-6">
                Adicione até 3 empresas do marketplace para comparar
              </p>
              <Button onClick={() => navigate("/marketplace")}>
                Ir para Marketplace
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Comparison Grid */}
        {companies.length > 0 && (
          <div className="space-y-8">
            {/* Insights Section */}
            <ComparisonInsights companies={companies} />

            {/* Scores Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-warning" />
                  Pontuação Geral
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWeightSettings(!showWeightSettings)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Ajustar Pesos
                </Button>
              </div>

              {/* Weight Settings Panel */}
              {showWeightSettings && (
                <Card className="mb-6 border-2 bg-muted/30 animate-fade-in">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Personalizar Pesos das Categorias</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetWeights}
                        className="h-8"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                        Restaurar Padrão
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ajuste a importância de cada categoria no cálculo do score total (soma = 100%)
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Financial Weight */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-success" />
                          <label className="text-sm font-medium">Financeiro</label>
                        </div>
                        <Badge variant="secondary" className="font-mono">
                          {Math.round(customWeights.financial * 100)}%
                        </Badge>
                      </div>
                      <Slider
                        value={[customWeights.financial * 100]}
                        onValueChange={(value) => updateWeight('financial', value[0])}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    {/* Operational Weight */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-secondary" />
                          <label className="text-sm font-medium">Operacional</label>
                        </div>
                        <Badge variant="secondary" className="font-mono">
                          {Math.round(customWeights.operational * 100)}%
                        </Badge>
                      </div>
                      <Slider
                        value={[customWeights.operational * 100]}
                        onValueChange={(value) => updateWeight('operational', value[0])}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    {/* Legal Weight */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-warning" />
                          <label className="text-sm font-medium">Jurídico</label>
                        </div>
                        <Badge variant="secondary" className="font-mono">
                          {Math.round(customWeights.legal * 100)}%
                        </Badge>
                      </div>
                      <Slider
                        value={[customWeights.legal * 100]}
                        onValueChange={(value) => updateWeight('legal', value[0])}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <p className="text-sm text-muted-foreground mb-6">
                Score calculado com base em métricas financeiras ({Math.round(customWeights.financial * 100)}%), 
                operacionais ({Math.round(customWeights.operational * 100)}%) e 
                jurídicas ({Math.round(customWeights.legal * 100)}%)
              </p>
              <div className={`grid gap-4 ${
                companies.length === 1 ? 'lg:grid-cols-1 max-w-md mx-auto' : 
                companies.length === 2 ? 'lg:grid-cols-2' : 
                'lg:grid-cols-3'
              }`}>
                {companyScores.map((score, index) => (
                  <CompanyScoreCard
                    key={score.companyId}
                    score={score}
                    rank={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* Radar Chart - Multi-dimensional Comparison */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RadarIcon className="w-5 h-5 text-accent" />
                  Comparação Multidimensional
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Visualização integrada de métricas financeiras, operacionais e jurídicas (escala 0-100)
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Benchmark do Setor</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        A linha cinza representa a média do mercado para os setores selecionados.
                        Compare o desempenho de cada empresa com esse referencial.
                      </p>
                    </div>
                  </div>
                </div>
                <ComparisonRadarChart
                  data={radarData}
                  dataKeys={radarDataKeys}
                  height={500}
                />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-success" />
                      Métricas Financeiras
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Faturamento anual</li>
                      <li>• Margem de lucro</li>
                      <li>• Taxa de crescimento</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-secondary" />
                      Métricas Operacionais
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Número de funcionários</li>
                      <li>• Maturidade (anos de operação)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-warning" />
                      Métricas Jurídicas
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Conformidade documental</li>
                      <li>• Nível de risco jurídico</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Análise Histórica
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Período:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((years) => (
                        <Button
                          key={years}
                          variant={yearsFilter === years ? "default" : "outline"}
                          size="sm"
                          onClick={() => setYearsFilter(years as 1 | 2 | 3)}
                          className="transition-all duration-300"
                        >
                          {years} {years === 1 ? "ano" : "anos"}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="revenue" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="revenue">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Faturamento
                    </TabsTrigger>
                    <TabsTrigger value="employees">
                      <Users className="w-4 h-4 mr-2" />
                      Funcionários
                    </TabsTrigger>
                    <TabsTrigger value="profit">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Margem de Lucro
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="revenue" className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <LineChartIcon className="w-4 h-4" />
                        Evolução do Faturamento Anual (R$ Milhões)
                      </h4>
                      <ComparisonLineChart
                        data={historicalData}
                        dataKeys={revenueDataKeys}
                        yAxisLabel="Faturamento (R$ M)"
                        height={350}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Comparação por Período
                      </h4>
                      <ComparisonBarChart
                        data={historicalData}
                        dataKeys={revenueDataKeys}
                        yAxisLabel="Faturamento (R$ M)"
                        height={300}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="employees" className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <LineChartIcon className="w-4 h-4" />
                        Crescimento do Quadro de Funcionários
                      </h4>
                      <ComparisonLineChart
                        data={historicalData}
                        dataKeys={employeesDataKeys}
                        yAxisLabel="Funcionários"
                        height={350}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Comparação por Período
                      </h4>
                      <ComparisonBarChart
                        data={historicalData}
                        dataKeys={employeesDataKeys}
                        yAxisLabel="Funcionários"
                        height={300}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="profit" className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <LineChartIcon className="w-4 h-4" />
                        Evolução da Margem de Lucro (%)
                      </h4>
                      <ComparisonLineChart
                        data={historicalData}
                        dataKeys={profitMarginDataKeys}
                        yAxisLabel="Margem (%)"
                        height={350}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Comparação por Período
                      </h4>
                      <ComparisonBarChart
                        data={historicalData}
                        dataKeys={profitMarginDataKeys}
                        yAxisLabel="Margem (%)"
                        height={300}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Companies Cards */}
            <div className={`grid gap-4 ${
              companies.length === 1 ? 'lg:grid-cols-1 max-w-2xl mx-auto' : 
              companies.length === 2 ? 'lg:grid-cols-2' : 
              'lg:grid-cols-3'
            }`}>
              {companies.map((company) => {
                const details = getMockCompanyDetails(company.id);
                return (
                  <Card key={company.id} className="border-2 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => removeCompany(company.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {company.sector}
                      </Badge>
                      <CardTitle className="text-xl">{company.companyName}</CardTitle>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{company.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {company.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Comparison Table - Financial Metrics */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-success" />
                  Métricas Financeiras
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Métrica</th>
                      {companies.map((company) => (
                        <th key={company.id} className="text-left py-3 px-4 font-semibold">
                          {company.companyName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Faturamento Anual</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-success" />
                              <span className="font-semibold">{details.revenue}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Margem de Lucro</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            <span className="font-semibold">{details.profitMargin}</span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Taxa de Crescimento</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            <Badge variant="secondary">{details.growthRate}</Badge>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Nível de Endividamento</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            {getRiskBadge(details.debtLevel)}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Comparison Table - Operational Metrics */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-secondary" />
                  Métricas Operacionais
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Métrica</th>
                      {companies.map((company) => (
                        <th key={company.id} className="text-left py-3 px-4 font-semibold">
                          {company.companyName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Número de Funcionários</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-secondary" />
                              <span className="font-semibold">{details.employees}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Ano de Fundação</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-muted-foreground" />
                              <span>{details.foundedYear}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Localização</td>
                      {companies.map((company) => (
                        <td key={company.id} className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{company.location}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Comparison Table - Legal Metrics */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Situação Jurídica
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Métrica</th>
                      {companies.map((company) => (
                        <th key={company.id} className="text-left py-3 px-4 font-semibold">
                          {company.companyName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Status Legal</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            <Badge
                              className={
                                details.legalStatus === "Aprovado"
                                  ? "bg-success hover:bg-success"
                                  : details.legalStatus === "Em revisão"
                                  ? "bg-warning hover:bg-warning"
                                  : "bg-muted hover:bg-muted"
                              }
                            >
                              {details.legalStatus}
                            </Badge>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Nível de Risco</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            {getRiskBadge(details.legalRisk)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Documentação Completa</td>
                      {companies.map((company) => {
                        const details = getMockCompanyDetails(company.id);
                        return (
                          <td key={company.id} className="py-3 px-4">
                            {details.documentsComplete ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : (
                              <XCircle className="w-5 h-5 text-destructive" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {companies.map((company) => (
                <Link
                  key={company.id}
                  to={`/marketplace/companies/${company.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Ver Detalhes de {company.companyName}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isAuthenticated) {
    return <DashboardLayout>{content}</DashboardLayout>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">{content}</main>
      <Footer />
    </div>
  );
}
