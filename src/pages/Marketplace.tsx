import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { CompanyCard } from "@/components/CompanyCard";
import { ComparisonFloatingBar } from "@/components/ComparisonFloatingBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, X, FilterX, GitCompare, Sparkles } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { Link } from "react-router-dom";
import { AIBadge } from "@/components/ui/ai-badge";
import { getSmartRecommendations, parseSemanticQuery } from "@/lib/mock-ai-service";

const mockCompanies = [
  {
    id: "1",
    companyName: "TechFlow Solutions",
    sector: "Tecnologia",
    location: "São Paulo, SP",
    revenue: "R$ 5M/ano",
    employees: 45,
    description: "Empresa de desenvolvimento de software B2B com base de clientes consolidada e crescimento sustentável.",
  },
  {
    id: "2",
    companyName: "EcoGreen Logistics",
    sector: "Logística",
    location: "Rio de Janeiro, RJ",
    revenue: "R$ 12M/ano",
    employees: 120,
    description: "Rede de logística sustentável com frota própria e contratos de longo prazo com grandes varejistas.",
  },
  {
    id: "3",
    companyName: "Bella Vita Café",
    sector: "Alimentação",
    location: "Belo Horizonte, MG",
    revenue: "R$ 3M/ano",
    employees: 35,
    description: "Rede de cafeterias premium com 5 unidades próprias e modelo de franquia em expansão.",
  },
  {
    id: "4",
    companyName: "HealthPlus Clínicas",
    sector: "Saúde",
    location: "Curitiba, PR",
    revenue: "R$ 8M/ano",
    employees: 80,
    description: "Rede de clínicas médicas especializadas com equipamentos modernos e corpo clínico qualificado.",
  },
  {
    id: "5",
    companyName: "AutoParts Express",
    sector: "Comércio",
    location: "Porto Alegre, RS",
    revenue: "R$ 15M/ano",
    employees: 95,
    description: "Distribuidora de autopeças com ampla rede de fornecedores e presença em 3 estados.",
  },
  {
    id: "6",
    companyName: "EduTech Academy",
    sector: "Educação",
    location: "Brasília, DF",
    revenue: "R$ 4M/ano",
    employees: 60,
    description: "Plataforma de ensino online com cursos profissionalizantes e mais de 10.000 alunos ativos.",
  },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sector, setSector] = useState("");
  const [state, setState] = useState("");
  const [revenueRange, setRevenueRange] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { companies: comparisonCompanies } = useComparison();

  // Load AI recommendations on mount for authenticated buyers
  useEffect(() => {
    if (isAuthenticated && user?.userType === "buyer") {
      loadRecommendations();
    }
  }, [isAuthenticated, user]);

  const loadRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const recs = await getSmartRecommendations(mockCompanies, {
        viewedCompanies: mockCompanies.slice(0, 2), // Mock viewing history
      });
      setRecommendations(recs);
    } catch (error) {
      console.error("Recommendations error:", error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Handle semantic search
  const handleSemanticSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 3) {
      const filters = await parseSemanticQuery(query);
      if (filters.sectors) setSector(filters.sectors[0]);
      if (filters.states) setState(filters.states[0]);
      if (filters.revenueRange) setRevenueRange(filters.revenueRange);
      if (filters.sortBy) setSortBy(filters.sortBy);
    }
  };

  // Função para extrair valor numérico do revenue
  const getRevenueValue = (revenue: string): number => {
    const match = revenue.match(/R\$\s*([\d,]+)/);
    if (!match) return 0;
    return parseFloat(match[1].replace(",", "."));
  };

  // Filtrar empresas
  const filteredCompanies = useMemo(() => {
    let filtered = [...mockCompanies];

    // Filtro de busca por texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.companyName.toLowerCase().includes(query) ||
          company.sector.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query)
      );
    }

    // Filtro por setor
    if (sector && sector !== "all") {
      filtered = filtered.filter(
        (company) => company.sector.toLowerCase() === sector.toLowerCase()
      );
    }

    // Filtro por estado
    if (state && state !== "all") {
      filtered = filtered.filter((company) =>
        company.location.toLowerCase().includes(state.toLowerCase())
      );
    }

    // Filtro por faixa de faturamento
    if (revenueRange && revenueRange !== "all") {
      filtered = filtered.filter((company) => {
        const revenue = getRevenueValue(company.revenue);
        switch (revenueRange) {
          case "0-3":
            return revenue <= 3;
          case "3-10":
            return revenue > 3 && revenue <= 10;
          case "10-50":
            return revenue > 10 && revenue <= 50;
          case "50+":
            return revenue > 50;
          default:
            return true;
        }
      });
    }

    // Filtro por número de funcionários
    if (employeeRange && employeeRange !== "all") {
      filtered = filtered.filter((company) => {
        const employees = company.employees;
        switch (employeeRange) {
          case "0-50":
            return employees <= 50;
          case "51-100":
            return employees > 50 && employees <= 100;
          case "101-500":
            return employees > 100 && employees <= 500;
          case "500+":
            return employees > 500;
          default:
            return true;
        }
      });
    }

    // Ordenação
    switch (sortBy) {
      case "revenue-high":
        filtered.sort((a, b) => getRevenueValue(b.revenue) - getRevenueValue(a.revenue));
        break;
      case "revenue-low":
        filtered.sort((a, b) => getRevenueValue(a.revenue) - getRevenueValue(b.revenue));
        break;
      case "employees":
        filtered.sort((a, b) => b.employees - a.employees);
        break;
      default: // recent
        break;
    }

    return filtered;
  }, [searchQuery, sector, state, revenueRange, employeeRange, sortBy]);

  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchQuery("");
    setSector("");
    setState("");
    setRevenueRange("");
    setEmployeeRange("");
  };

  // Contar filtros ativos
  const activeFiltersCount = [
    searchQuery,
    sector && sector !== "all",
    state && state !== "all",
    revenueRange && revenueRange !== "all",
    employeeRange && employeeRange !== "all",
  ].filter(Boolean).length;

  const content = (
    <div className={isAuthenticated ? "p-8" : ""}>
      <div className={isAuthenticated ? "max-w-7xl mx-auto" : "container mx-auto px-4 lg:px-8"}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">
                Marketplace de Empresas
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore oportunidades de investimento em empresas consolidadas
              </p>
            </div>
            {comparisonCompanies.length > 0 && (
              <Link to="/marketplace/compare">
                <Button variant="default" size="lg" className="gap-2 w-full sm:w-auto">
                  <GitCompare className="w-5 h-5" />
                  Comparar ({comparisonCompanies.length})
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* AI Recommendations Section */}
        {isAuthenticated && user?.userType === "buyer" && recommendations.length > 0 && (
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-semibold text-lg">Recomendados para Você</h3>
                <AIBadge />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Empresas selecionadas com base no seu perfil e histórico de visualizações
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {recommendations.map((company) => (
                  <div key={company.id} className="relative">
                    <CompanyCard {...company} />
                    <Badge className="absolute top-2 right-2 gap-1 bg-primary/90">
                      <Sparkles className="w-3 h-3" />
                      Recomendado
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="border-2 mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-secondary" />
                <h3 className="font-heading font-semibold text-lg">Filtros de Busca</h3>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden"
                >
                  {showFilters ? "Ocultar" : "Mostrar"} Filtros
                </Button>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-2"
                  >
                    <FilterX className="w-4 h-4" />
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${!showFilters ? 'hidden sm:grid' : ''}`}>
              <div className="lg:col-span-3">
                <Label htmlFor="search">
                  Buscar por nome ou descreva o que procura 
                  <AIBadge className="ml-2" />
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Ex: 'empresa de tecnologia lucrativa em SP' ou apenas 'Tecnologia'"
                    value={searchQuery}
                    onChange={(e) => handleSemanticSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  💡 Dica: Use linguagem natural como "startup em crescimento" ou "baixo investimento"
                </p>
              </div>

              <div>
                <Label htmlFor="sector">Setor</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Todos os setores" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">Todos os setores</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="logistica">Logística</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">Estado</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Todos os estados" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">Todos os estados</SelectItem>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                    <SelectItem value="pr">Paraná</SelectItem>
                    <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                    <SelectItem value="df">Distrito Federal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="revenue">Faixa de Faturamento</Label>
                <Select value={revenueRange} onValueChange={setRevenueRange}>
                  <SelectTrigger id="revenue">
                    <SelectValue placeholder="Qualquer faturamento" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">Qualquer faturamento</SelectItem>
                    <SelectItem value="0-3">Até R$ 3M/ano</SelectItem>
                    <SelectItem value="3-10">R$ 3M - R$ 10M/ano</SelectItem>
                    <SelectItem value="10-50">R$ 10M - R$ 50M/ano</SelectItem>
                    <SelectItem value="50+">Acima de R$ 50M/ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employees">Número de Funcionários</Label>
                <Select value={employeeRange} onValueChange={setEmployeeRange}>
                  <SelectTrigger id="employees">
                    <SelectValue placeholder="Qualquer quantidade" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">Qualquer quantidade</SelectItem>
                    <SelectItem value="0-50">Até 50 funcionários</SelectItem>
                    <SelectItem value="51-100">51 - 100 funcionários</SelectItem>
                    <SelectItem value="101-500">101 - 500 funcionários</SelectItem>
                    <SelectItem value="500+">Mais de 500 funcionários</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sortBy">Ordenar por</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sortBy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="revenue-high">Maior faturamento</SelectItem>
                    <SelectItem value="revenue-low">Menor faturamento</SelectItem>
                    <SelectItem value="employees">Nº de funcionários</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Busca: {searchQuery}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}
                {sector && sector !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Setor: {sector}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setSector("")}
                    />
                  </Badge>
                )}
                {state && state !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Estado: {state.toUpperCase()}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setState("")}
                    />
                  </Badge>
                )}
                {revenueRange && revenueRange !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Faturamento
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setRevenueRange("")}
                    />
                  </Badge>
                )}
                {employeeRange && employeeRange !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Funcionários
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => setEmployeeRange("")}
                    />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground text-lg">{filteredCompanies.length}</span> 
            {filteredCompanies.length === 1 ? ' empresa encontrada' : ' empresas encontradas'}
            {activeFiltersCount > 0 && (
              <span className="ml-2 text-sm">
                (de {mockCompanies.length} no total)
              </span>
            )}
          </p>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>
        ) : (
          <Card className="border-2 py-12">
            <CardContent className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">
                Nenhuma empresa encontrada
              </h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros para ver mais resultados
              </p>
              <Button variant="outline" onClick={clearFilters}>
                <FilterX className="w-4 h-4 mr-2" />
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredCompanies.length > 0 && filteredCompanies.length >= 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar Mais Empresas
            </Button>
          </div>
        )}
      </div>
      
      {/* Floating Comparison Bar */}
      <ComparisonFloatingBar />
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