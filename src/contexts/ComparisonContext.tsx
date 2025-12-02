import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface Company {
  id: string;
  companyName: string;
  sector: string;
  location: string;
  revenue: string;
  employees: number;
  description: string;
}

interface ComparisonContextType {
  companies: Company[];
  addCompany: (company: Company) => void;
  removeCompany: (id: string) => void;
  clearAll: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { toast } = useToast();

  const addCompany = (company: Company) => {
    if (companies.length >= 3) {
      toast({
        title: "Limite atingido",
        description: "Você pode comparar no máximo 3 empresas.",
        variant: "destructive",
      });
      return;
    }

    if (companies.some((c) => c.id === company.id)) {
      toast({
        title: "Empresa já adicionada",
        description: "Esta empresa já está na comparação.",
      });
      return;
    }

    setCompanies([...companies, company]);
    toast({
      title: "Empresa adicionada",
      description: `${company.companyName} foi adicionada à comparação.`,
    });
  };

  const removeCompany = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
    toast({
      title: "Empresa removida",
      description: "Empresa removida da comparação.",
    });
  };

  const clearAll = () => {
    setCompanies([]);
    toast({
      title: "Comparação limpa",
      description: "Todas as empresas foram removidas da comparação.",
    });
  };

  const isInComparison = (id: string) => {
    return companies.some((c) => c.id === id);
  };

  return (
    <ComparisonContext.Provider
      value={{ companies, addCompany, removeCompany, clearAll, isInComparison }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
};
