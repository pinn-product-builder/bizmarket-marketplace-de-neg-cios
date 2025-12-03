// Mock CNPJ validation service

export interface CNPJValidationResult {
  valid: boolean;
  status: "regular" | "irregular" | "baixada" | "suspensa" | "inapta" | "not_found";
  companyName?: string;
  fantasyName?: string;
  cnae?: string;
  openDate?: string;
  message: string;
}

// Mock CNPJ database for demo purposes
const MOCK_CNPJ_DATABASE: Record<string, CNPJValidationResult> = {
  "12345678000190": {
    valid: true,
    status: "regular",
    companyName: "EMPRESA EXEMPLO LTDA",
    fantasyName: "EXEMPLO",
    cnae: "6201-5/01 - Desenvolvimento de programas de computador sob encomenda",
    openDate: "2015-03-15",
    message: "CNPJ com situação cadastral ATIVA na Receita Federal",
  },
  "98765432000199": {
    valid: true,
    status: "irregular",
    companyName: "EMPRESA IRREGULAR LTDA",
    message: "CNPJ com pendências fiscais. Verificar situação na Receita Federal.",
  },
  "11111111000111": {
    valid: false,
    status: "baixada",
    companyName: "EMPRESA BAIXADA LTDA",
    message: "CNPJ com situação cadastral BAIXADA. Empresa encerrada.",
  },
  "22222222000122": {
    valid: false,
    status: "suspensa",
    companyName: "EMPRESA SUSPENSA LTDA",
    message: "CNPJ com situação cadastral SUSPENSA. Verificar pendências.",
  },
};

// Format CNPJ for display
export function formatCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) return cnpj;
  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

// Remove formatting from CNPJ
export function cleanCNPJ(cnpj: string): string {
  return cnpj.replace(/\D/g, "");
}

// Validate CNPJ format (basic validation)
export function isValidCNPJFormat(cnpj: string): boolean {
  const cleaned = cleanCNPJ(cnpj);
  if (cleaned.length !== 14) return false;
  
  // Check for known invalid patterns
  if (/^(\d)\1+$/.test(cleaned)) return false;
  
  // Validate check digits
  let size = cleaned.length - 2;
  let numbers = cleaned.substring(0, size);
  const digits = cleaned.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  size = size + 1;
  numbers = cleaned.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;
  
  return true;
}

// Mock API call to validate CNPJ with Receita Federal
export async function validateCNPJ(cnpj: string): Promise<CNPJValidationResult> {
  const cleaned = cleanCNPJ(cnpj);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Check format first
  if (!isValidCNPJFormat(cnpj)) {
    return {
      valid: false,
      status: "not_found",
      message: "CNPJ com formato inválido. Verifique os dígitos informados.",
    };
  }
  
  // Check mock database
  if (MOCK_CNPJ_DATABASE[cleaned]) {
    return MOCK_CNPJ_DATABASE[cleaned];
  }
  
  // For demo purposes, generate a random "valid" result for unknown CNPJs
  // In production, this would call the actual Receita Federal API
  const isRegular = Math.random() > 0.3; // 70% chance of being regular
  
  return {
    valid: isRegular,
    status: isRegular ? "regular" : "irregular",
    companyName: `EMPRESA ${cleaned.slice(0, 4)} LTDA`,
    message: isRegular 
      ? "CNPJ com situação cadastral ATIVA na Receita Federal"
      : "CNPJ com pendências. Recomendamos verificação adicional.",
  };
}

// Get status badge color
export function getCNPJStatusColor(status: CNPJValidationResult["status"]): string {
  switch (status) {
    case "regular":
      return "success";
    case "irregular":
      return "warning";
    case "baixada":
    case "suspensa":
    case "inapta":
      return "destructive";
    default:
      return "secondary";
  }
}

// Get status label
export function getCNPJStatusLabel(status: CNPJValidationResult["status"]): string {
  switch (status) {
    case "regular":
      return "Regular";
    case "irregular":
      return "Irregular";
    case "baixada":
      return "Baixada";
    case "suspensa":
      return "Suspensa";
    case "inapta":
      return "Inapta";
    case "not_found":
      return "Não Encontrado";
    default:
      return "Desconhecido";
  }
}
