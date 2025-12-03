// Mock AI Approval Suggestions Service

export interface ApprovalSuggestion {
  recommendation: "approve" | "reject" | "review";
  confidence: number; // 0-100
  reasons: string[];
  riskFactors: string[];
  suggestedActions: string[];
}

interface CompanyData {
  companyName: string;
  sector: string;
  cnpjStatus?: string;
  revenue?: string;
  employees?: number;
  documentsComplete?: boolean;
  description?: string;
}

// Mock AI analysis for company approval
export async function generateApprovalSuggestion(company: CompanyData): Promise<ApprovalSuggestion> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const reasons: string[] = [];
  const riskFactors: string[] = [];
  const suggestedActions: string[] = [];
  let score = 50; // Base score

  // Analyze CNPJ status
  if (company.cnpjStatus === "regular") {
    score += 25;
    reasons.push("CNPJ com situação regular na Receita Federal");
  } else if (company.cnpjStatus === "irregular") {
    score -= 20;
    riskFactors.push("CNPJ com pendências fiscais identificadas");
    suggestedActions.push("Solicitar comprovante de regularização fiscal");
  } else if (company.cnpjStatus === "baixada" || company.cnpjStatus === "suspensa") {
    score -= 50;
    riskFactors.push("CNPJ com situação cadastral inativa ou suspensa");
    suggestedActions.push("Rejeitar anúncio - empresa não está ativa");
  }

  // Analyze documents
  if (company.documentsComplete) {
    score += 15;
    reasons.push("Documentação completa anexada");
  } else {
    score -= 10;
    riskFactors.push("Documentação incompleta");
    suggestedActions.push("Solicitar documentos faltantes antes da aprovação");
  }

  // Analyze description quality
  if (company.description && company.description.length > 100) {
    score += 10;
    reasons.push("Descrição detalhada do negócio");
  } else {
    riskFactors.push("Descrição muito curta ou ausente");
    suggestedActions.push("Sugerir ao vendedor que melhore a descrição");
  }

  // Analyze revenue consistency
  if (company.revenue) {
    const revenueValue = parseFloat(company.revenue.replace(/[^\d.]/g, ""));
    if (revenueValue > 0) {
      score += 10;
      reasons.push("Faturamento declarado é consistente");
    }
  }

  // Analyze employee count
  if (company.employees && company.employees > 0) {
    score += 5;
    reasons.push("Número de funcionários informado");
  }

  // Sector-specific checks
  const highRiskSectors = ["Criptomoedas", "Apostas", "Adult"];
  if (highRiskSectors.includes(company.sector)) {
    score -= 30;
    riskFactors.push(`Setor "${company.sector}" requer análise adicional`);
    suggestedActions.push("Verificar conformidade regulatória do setor");
  }

  // Determine recommendation based on score
  let recommendation: ApprovalSuggestion["recommendation"];
  if (score >= 70) {
    recommendation = "approve";
    if (reasons.length === 0) {
      reasons.push("Anúncio atende aos requisitos mínimos da plataforma");
    }
  } else if (score >= 40) {
    recommendation = "review";
    suggestedActions.push("Recomendada análise manual antes da decisão final");
  } else {
    recommendation = "reject";
    if (riskFactors.length === 0) {
      riskFactors.push("Anúncio não atende aos requisitos mínimos");
    }
  }

  // Calculate confidence (higher score = higher confidence)
  const confidence = Math.min(95, Math.max(30, score + (Math.random() * 10 - 5)));

  return {
    recommendation,
    confidence: Math.round(confidence),
    reasons,
    riskFactors,
    suggestedActions,
  };
}

// Get recommendation badge color
export function getRecommendationColor(recommendation: ApprovalSuggestion["recommendation"]): string {
  switch (recommendation) {
    case "approve":
      return "success";
    case "review":
      return "warning";
    case "reject":
      return "destructive";
    default:
      return "secondary";
  }
}

// Get recommendation label
export function getRecommendationLabel(recommendation: ApprovalSuggestion["recommendation"]): string {
  switch (recommendation) {
    case "approve":
      return "Aprovação Sugerida";
    case "review":
      return "Revisão Manual Necessária";
    case "reject":
      return "Rejeição Sugerida";
    default:
      return "Análise Pendente";
  }
}
