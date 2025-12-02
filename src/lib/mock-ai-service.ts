import { getRandomDelay } from "./config";
import {
  CHAT_RESPONSE_TEMPLATES,
  DESCRIPTION_TEMPLATES,
  RECOMMENDATION_REASONS,
  COMPARISON_INSIGHTS_TEMPLATES,
  EXECUTIVE_SUMMARY_TEMPLATES,
  SEMANTIC_MAPPINGS,
  INTEREST_MESSAGE_TEMPLATES,
} from "./mock-ai-templates";

// Simulate AI delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate company description
export async function generateDescription(formData: {
  sector: string;
  foundationYear: string;
  employees: string;
  companyName: string;
  annualRevenue?: string;
}) {
  await delay(getRandomDelay());

  const sector = formData.sector || "Outro";
  const employees = parseInt(formData.employees) || 0;
  const years = new Date().getFullYear() - parseInt(formData.foundationYear);

  // Determine company size
  let sizeCategory = "small";
  if (employees > 100) sizeCategory = "large";
  else if (employees > 50) sizeCategory = "medium";

  // Get template for sector and size
  const sectorTemplates = DESCRIPTION_TEMPLATES[sector] || DESCRIPTION_TEMPLATES["Outro"];
  let template = sectorTemplates[sizeCategory] || sectorTemplates["small"];

  // Replace placeholders
  template = template
    .replace("{years}", years.toString())
    .replace("{employees}", formData.employees)
    .replace("{companyName}", formData.companyName);

  return template;
}

// Generate chat response suggestion
export async function generateChatResponse(context: {
  lastMessage: string;
  companyName?: string;
}) {
  await delay(getRandomDelay());

  const message = context.lastMessage.toLowerCase();

  // Detect intent
  let category = "greeting";
  if (message.includes("reunião") || message.includes("agendar") || message.includes("conversar")) {
    category = "scheduling";
  } else if (message.includes("documento") || message.includes("balanço") || message.includes("dre")) {
    category = "documents";
  } else if (message.includes("preço") || message.includes("valor") || message.includes("negociar")) {
    category = "negotiation";
  } else if (message.includes("obrigad") || message.includes("agradec")) {
    category = "thanks";
  }

  // Get random template from category
  const templates = CHAT_RESPONSE_TEMPLATES[category as keyof typeof CHAT_RESPONSE_TEMPLATES] || CHAT_RESPONSE_TEMPLATES.greeting;
  const template = templates[Math.floor(Math.random() * templates.length)];

  // Replace placeholders
  return template.replace("{companyName}", context.companyName || "esta empresa");
}

// Generate personalized recommendations
export async function getSmartRecommendations(
  allCompanies: any[],
  userProfile?: {
    viewedCompanies?: any[];
    preferredSectors?: string[];
    preferredStates?: string[];
  }
) {
  await delay(getRandomDelay());

  // Simple recommendation logic - prefer companies in viewed sectors
  const viewedSectors = userProfile?.viewedCompanies?.map((c) => c.sector.toLowerCase()) || [];
  const preferredSectors = userProfile?.preferredSectors?.map((s) => s.toLowerCase()) || [];

  const recommendations = allCompanies
    .filter((company) => {
      const sector = company.sector.toLowerCase();
      return viewedSectors.includes(sector) || preferredSectors.includes(sector);
    })
    .slice(0, 3);

  // If not enough, add random companies
  if (recommendations.length < 3) {
    const remaining = allCompanies
      .filter((c) => !recommendations.find((r) => r.id === c.id))
      .slice(0, 3 - recommendations.length);
    recommendations.push(...remaining);
  }

  // Add reason for each recommendation
  return recommendations.map((company, index) => ({
    ...company,
    recommendationReason: RECOMMENDATION_REASONS[index % RECOMMENDATION_REASONS.length]
      .replace("{sector}", company.sector)
      .replace("{lastViewedCompany}", viewedSectors[0] || "empresas similares"),
  }));
}

// Generate comparison insights
export async function generateComparisonInsights(insights: {
  companies: Array<{
    company: string;
    revenueGrowth: string;
    employeeGrowth: string;
    marginImprovement: string;
  }>;
  bestRevenue: any;
  bestMargin: any;
  weights?: { financial: number; operational: number; legal: number };
}) {
  await delay(getRandomDelay());

  const { companies, bestRevenue, weights } = insights;

  // Generate text insights
  const revenueGrowth = parseFloat(bestRevenue.revenueGrowth);
  const revenueText = COMPARISON_INSIGHTS_TEMPLATES.revenueLeader.positive
    .replace("{company}", bestRevenue.company)
    .replace("{growth}", bestRevenue.revenueGrowth)
    .replace("{comparison}", revenueGrowth > 30 ? "significativamente acima" : "alinhado com");

  // Overall recommendation
  const topCompany = companies[0].company;
  const overallText = COMPARISON_INSIGHTS_TEMPLATES.overall
    .replace("{financialWeight}", weights?.financial.toString() || "40")
    .replace("{operationalWeight}", weights?.operational.toString() || "30")
    .replace("{legalWeight}", weights?.legal.toString() || "30")
    .replace("{topCompany}", topCompany);

  return {
    revenueAnalysis: revenueText,
    overallRecommendation: overallText,
  };
}

// Generate executive summary
export async function generateExecutiveSummary(company: {
  companyName: string;
  sector: string;
  foundationYear: number;
  annualRevenue: number;
  employees: number;
  competitiveDifferentials: string;
  askingPrice: number;
}) {
  await delay(getRandomDelay());

  const revenueM = (company.annualRevenue / 1000000).toFixed(1);
  const multiple = (company.askingPrice / company.annualRevenue).toFixed(1);

  // Determine opportunity type based on sector
  const opportunityTypes: Record<string, string> = {
    Tecnologia: "aquisição estratégica no setor de SaaS/software B2B",
    Varejo: "expansão de rede varejista com marca consolidada",
    Indústria: "consolidação industrial com ganhos de escala",
    Saúde: "entrada no mercado de saúde com infraestrutura estabelecida",
    Educação: "investimento em educação com base de alunos ativa",
    Logística: "aquisição logística com ativos tangíveis",
  };

  const opportunityType =
    opportunityTypes[company.sector] || "investimento em empresa estabelecida";

  // Extract first differential
  const firstDifferential = company.competitiveDifferentials.split(",")[0]?.toLowerCase() || "operação consolidada";

  const intro = EXECUTIVE_SUMMARY_TEMPLATES.intro
    .replace("{companyName}", company.companyName)
    .replace("{sector}", company.sector.toLowerCase())
    .replace("{foundationYear}", company.foundationYear.toString())
    .replace("{revenueM}", revenueM)
    .replace("{employees}", company.employees.toString());

  const strength = EXECUTIVE_SUMMARY_TEMPLATES.strength.replace(
    "{differentials}",
    firstDifferential
  );

  const opportunity = EXECUTIVE_SUMMARY_TEMPLATES.opportunity
    .replace("{multiple}", multiple)
    .replace("{opportunityType}", opportunityType);

  return `${intro} ${strength} ${opportunity}`;
}

// Parse semantic search query
export async function parseSemanticQuery(query: string) {
  await delay(300); // Quick delay for search

  const lowercaseQuery = query.toLowerCase();
  let filters: any = {};

  // Check for semantic mappings
  for (const [keyword, mapping] of Object.entries(SEMANTIC_MAPPINGS)) {
    if (lowercaseQuery.includes(keyword)) {
      filters = { ...filters, ...mapping };
    }
  }

  return filters;
}

// Suggest initial interest message
export async function suggestInterestMessage(company: {
  companyName: string;
  sector: string;
}) {
  await delay(getRandomDelay());

  const template = INTEREST_MESSAGE_TEMPLATES[Math.floor(Math.random() * INTEREST_MESSAGE_TEMPLATES.length)];
  
  return template
    .replace("{companyName}", company.companyName)
    .replace("{sector}", company.sector);
}
