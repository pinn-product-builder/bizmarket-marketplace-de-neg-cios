// Sistema de pontuação de empresas baseado em múltiplas métricas

export interface CompanyScore {
  companyId: string;
  companyName: string;
  totalScore: number;
  financialScore: number;
  operationalScore: number;
  legalScore: number;
  breakdown: {
    revenue: number;
    profitMargin: number;
    growth: number;
    employees: number;
    maturity: number;
    legalCompliance: number;
    lowRisk: number;
  };
}

interface CompanyDetails {
  foundedYear: number;
  profitMargin: string;
  growthRate: string;
  debtLevel: string;
  legalStatus: string;
  legalRisk: string;
  documentsComplete: boolean;
  employees: number;
  revenue: string;
}

// Pesos padrão para cada categoria (somam 100%)
export const DEFAULT_WEIGHTS = {
  financial: 0.40, // 40%
  operational: 0.30, // 30%
  legal: 0.30, // 30%
};

export interface CategoryWeights {
  financial: number;
  operational: number;
  legal: number;
}

// Presets de pesos predefinidos
export const WEIGHT_PRESETS = {
  balanced: {
    name: "Balanceado",
    description: "Equilíbrio entre todas as categorias",
    detailedDescription: "Distribuição equilibrada considerando todos os aspectos da empresa",
    useCases: [
      "Avaliação geral sem prioridades específicas",
      "Primeira análise de empresas desconhecidas",
      "Comparação inicial para triagem",
    ],
    icon: "Scale",
    weights: { financial: 0.40, operational: 0.30, legal: 0.30 },
  },
  financialFocus: {
    name: "Foco Financeiro",
    description: "Prioriza métricas financeiras e rentabilidade",
    detailedDescription: "Ideal quando o retorno financeiro e lucratividade são prioridades",
    useCases: [
      "Investidores focados em ROI e rentabilidade",
      "Aquisições com objetivo de retorno rápido",
      "Análise de empresas maduras e lucrativas",
    ],
    icon: "DollarSign",
    weights: { financial: 0.60, operational: 0.20, legal: 0.20 },
  },
  operationalFocus: {
    name: "Foco Operacional",
    description: "Prioriza escala e maturidade operacional",
    detailedDescription: "Enfatiza tamanho da operação, equipe e tempo de mercado",
    useCases: [
      "Empresas buscando sinergia operacional",
      "Aquisições para expansão de capacidade",
      "Avaliação de infraestrutura e recursos humanos",
    ],
    icon: "Briefcase",
    weights: { financial: 0.20, operational: 0.60, legal: 0.20 },
  },
  legalFocus: {
    name: "Foco Jurídico",
    description: "Prioriza conformidade e baixo risco legal",
    detailedDescription: "Minimiza riscos legais e prioriza conformidade regulatória",
    useCases: [
      "Setores altamente regulados (saúde, financeiro)",
      "Empresas com histórico de problemas legais",
      "Due diligence pré-aquisição rigorosa",
    ],
    icon: "Scale",
    weights: { financial: 0.20, operational: 0.20, legal: 0.60 },
  },
  growth: {
    name: "Crescimento",
    description: "Equilibra crescimento financeiro e operacional",
    detailedDescription: "Otimizado para empresas em expansão com potencial de crescimento",
    useCases: [
      "Startups e scale-ups em crescimento",
      "Empresas com alta taxa de crescimento",
      "Investimentos focados em potencial futuro",
    ],
    icon: "TrendingUp",
    weights: { financial: 0.45, operational: 0.35, legal: 0.20 },
  },
} as const;

export type WeightPresetKey = keyof typeof WEIGHT_PRESETS;

// Pesos individuais dentro de cada categoria
const METRIC_WEIGHTS = {
  revenue: 0.35,
  profitMargin: 0.35,
  growth: 0.30,
  employees: 0.40,
  maturity: 0.60,
  legalCompliance: 0.50,
  lowRisk: 0.50,
};

// Normaliza um valor para escala 0-100
const normalize = (value: number, max: number): number => {
  return Math.min(100, (value / max) * 100);
};

// Calcula score financeiro (0-100)
const calculateFinancialScore = (details: CompanyDetails): { score: number; breakdown: any } => {
  const revenueValue = parseFloat(details.revenue.replace(/[^\d.]/g, ""));
  const revenueScore = normalize(revenueValue, 15); // Max 15M
  
  const profitMarginValue = parseFloat(details.profitMargin);
  const profitMarginScore = normalize(profitMarginValue, 30); // Max 30%
  
  const growthValue = parseFloat(details.growthRate);
  const growthScore = normalize(growthValue, 40); // Max 40%
  
  const score = 
    revenueScore * METRIC_WEIGHTS.revenue +
    profitMarginScore * METRIC_WEIGHTS.profitMargin +
    growthScore * METRIC_WEIGHTS.growth;
  
  return {
    score,
    breakdown: {
      revenue: revenueScore,
      profitMargin: profitMarginScore,
      growth: growthScore,
    },
  };
};

// Calcula score operacional (0-100)
const calculateOperationalScore = (details: CompanyDetails): { score: number; breakdown: any } => {
  const employeesScore = normalize(details.employees, 120); // Max 120 funcionários
  
  const currentYear = 2024;
  const age = currentYear - details.foundedYear;
  const maturityScore = normalize(age, 15); // Max 15 anos
  
  const score = 
    employeesScore * METRIC_WEIGHTS.employees +
    maturityScore * METRIC_WEIGHTS.maturity;
  
  return {
    score,
    breakdown: {
      employees: employeesScore,
      maturity: maturityScore,
    },
  };
};

// Calcula score jurídico (0-100)
const calculateLegalScore = (details: CompanyDetails): { score: number; breakdown: any } => {
  const complianceScore = details.documentsComplete ? 100 : 50;
  
  let riskScore = 0;
  if (details.legalRisk === "Baixo") riskScore = 100;
  else if (details.legalRisk === "Médio") riskScore = 50;
  else riskScore = 20;
  
  const score = 
    complianceScore * METRIC_WEIGHTS.legalCompliance +
    riskScore * METRIC_WEIGHTS.lowRisk;
  
  return {
    score,
    breakdown: {
      legalCompliance: complianceScore,
      lowRisk: riskScore,
    },
  };
};

// Calcula score total de uma empresa com pesos customizáveis
export const calculateCompanyScore = (
  companyId: string,
  companyName: string,
  details: CompanyDetails,
  weights: CategoryWeights = DEFAULT_WEIGHTS
): CompanyScore => {
  const financial = calculateFinancialScore(details);
  const operational = calculateOperationalScore(details);
  const legal = calculateLegalScore(details);
  
  const totalScore = 
    financial.score * weights.financial +
    operational.score * weights.operational +
    legal.score * weights.legal;
  
  return {
    companyId,
    companyName,
    totalScore: Math.round(totalScore * 10) / 10,
    financialScore: Math.round(financial.score * 10) / 10,
    operationalScore: Math.round(operational.score * 10) / 10,
    legalScore: Math.round(legal.score * 10) / 10,
    breakdown: {
      revenue: Math.round(financial.breakdown.revenue * 10) / 10,
      profitMargin: Math.round(financial.breakdown.profitMargin * 10) / 10,
      growth: Math.round(financial.breakdown.growth * 10) / 10,
      employees: Math.round(operational.breakdown.employees * 10) / 10,
      maturity: Math.round(operational.breakdown.maturity * 10) / 10,
      legalCompliance: Math.round(legal.breakdown.legalCompliance * 10) / 10,
      lowRisk: Math.round(legal.breakdown.lowRisk * 10) / 10,
    },
  };
};

// Retorna classificação baseada no score
export const getScoreRating = (score: number): { label: string; color: string } => {
  if (score >= 80) return { label: "Excelente", color: "text-success" };
  if (score >= 70) return { label: "Muito Bom", color: "text-success" };
  if (score >= 60) return { label: "Bom", color: "text-secondary" };
  if (score >= 50) return { label: "Regular", color: "text-warning" };
  return { label: "Abaixo da Média", color: "text-destructive" };
};

// Retorna cor de fundo baseada no score
export const getScoreBgColor = (score: number): string => {
  if (score >= 80) return "bg-success/10 border-success/30";
  if (score >= 70) return "bg-success/5 border-success/20";
  if (score >= 60) return "bg-secondary/10 border-secondary/30";
  if (score >= 50) return "bg-warning/10 border-warning/30";
  return "bg-destructive/10 border-destructive/30";
};
