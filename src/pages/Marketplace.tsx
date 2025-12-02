import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompanyCard } from "@/components/CompanyCard";
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
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
              Marketplace de Empresas
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore oportunidades de investimento em empresas consolidadas
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border-2 border-border rounded-xl p-6 mb-8 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-secondary" />
              <h3 className="font-heading font-semibold text-lg">Filtros de Busca</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Buscar por nome ou palavra-chave</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Ex: Tecnologia, Logística..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="sector">Setor</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Todos os setores" />
                  </SelectTrigger>
                  <SelectContent>
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
                  <SelectContent>
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
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{mockCompanies.length}</span> empresas
              encontradas
            </p>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="revenue-high">Maior faturamento</SelectItem>
                <SelectItem value="revenue-low">Menor faturamento</SelectItem>
                <SelectItem value="employees">Nº de funcionários</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCompanies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar Mais Empresas
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}