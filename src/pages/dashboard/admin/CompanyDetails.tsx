import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  FileText,
  DollarSign,
  Phone,
  Mail,
  Globe,
  MessageSquare,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data - em produção viria de uma API
const mockCompanyDetails = {
  "2": {
    id: "2",
    name: "EcoGreen Logistics",
    sector: "Logística",
    status: "pending",
    sellerName: "João Silva",
    sellerEmail: "joao.silva@email.com",
    sellerPhone: "+55 11 98765-4321",
    revenue: "R$ 12M/ano",
    employees: 85,
    foundedYear: 2018,
    location: "São Paulo, SP",
    website: "www.ecogreenlogistics.com.br",
    description: "Empresa especializada em logística sustentável, focada em reduzir a pegada de carbono através de rotas otimizadas e veículos elétricos. Atende grandes varejistas e e-commerces com operação nacional.",
    highlights: [
      "Frota 100% elétrica",
      "Certificação ISO 14001",
      "15% de crescimento anual",
      "Contratos com grandes varejistas",
    ],
    financials: {
      revenue: "R$ 12.000.000",
      ebitda: "R$ 2.400.000",
      margin: "20%",
      growth: "+15% a.a.",
    },
    submittedAt: "2024-11-29",
    documents: [
      "Balanço Patrimonial 2023",
      "DRE 2023",
      "Contrato Social",
      "Certidões Negativas",
    ],
  },
  "4": {
    id: "4",
    name: "HealthPlus Clínicas",
    sector: "Saúde",
    status: "pending",
    sellerName: "Maria Santos",
    sellerEmail: "maria.santos@email.com",
    sellerPhone: "+55 21 91234-5678",
    revenue: "R$ 8M/ano",
    employees: 120,
    foundedYear: 2015,
    location: "Rio de Janeiro, RJ",
    website: "www.healthplusclinicas.com.br",
    description: "Rede de clínicas médicas especializadas em atendimento ambulatorial e exames. Opera com 8 unidades no Rio de Janeiro, oferecendo consultas, exames laboratoriais e diagnósticos por imagem.",
    highlights: [
      "8 unidades estrategicamente localizadas",
      "Convênio com principais operadoras",
      "30.000 atendimentos/mês",
      "Equipamentos de última geração",
    ],
    financials: {
      revenue: "R$ 8.000.000",
      ebitda: "R$ 1.600.000",
      margin: "20%",
      growth: "+12% a.a.",
    },
    submittedAt: "2024-11-26",
    documents: [
      "Balanço Patrimonial 2023",
      "DRE 2023",
      "Licenças Sanitárias",
      "Contratos de Convênios",
    ],
  },
  "7": {
    id: "7",
    name: "AutoParts Express",
    sector: "Automotivo",
    status: "pending",
    sellerName: "Carlos Souza",
    sellerEmail: "carlos.souza@email.com",
    sellerPhone: "+55 11 99876-5432",
    revenue: "R$ 15M/ano",
    employees: 95,
    foundedYear: 2012,
    location: "São Paulo, SP",
    website: "www.autopartsexpress.com.br",
    description: "Distribuidora de autopeças com foco no mercado de reposição. Trabalha com mais de 50 marcas nacionais e importadas, atendendo oficinas, concessionárias e revendedores em todo território nacional.",
    highlights: [
      "Parceria com 50+ marcas",
      "Centro de distribuição próprio",
      "5.000+ SKUs em estoque",
      "Entrega em 48h para todo Brasil",
    ],
    financials: {
      revenue: "R$ 15.000.000",
      ebitda: "R$ 2.250.000",
      margin: "15%",
      growth: "+18% a.a.",
    },
    submittedAt: "2024-11-28",
    documents: [
      "Balanço Patrimonial 2023",
      "DRE 2023",
      "Contratos de Fornecimento",
      "Certidões Negativas",
    ],
  },
  "9": {
    id: "9",
    name: "FoodChain Brasil",
    sector: "Alimentos",
    status: "pending",
    sellerName: "Ana Lima",
    sellerEmail: "ana.lima@email.com",
    sellerPhone: "+55 11 98765-1234",
    revenue: "R$ 22M/ano",
    employees: 180,
    foundedYear: 2010,
    location: "São Paulo, SP",
    website: "www.foodchainbrasil.com.br",
    description: "Rede de restaurantes fast-casual com foco em alimentação saudável. Opera 12 unidades em shopping centers e food courts, com plano de expansão para franquias. Conceito inovador com menu rotativo sazonal.",
    highlights: [
      "12 unidades operacionais",
      "Ticket médio R$ 45",
      "Modelo replicável para franquias",
      "85% de satisfação dos clientes",
    ],
    financials: {
      revenue: "R$ 22.000.000",
      ebitda: "R$ 3.300.000",
      margin: "15%",
      growth: "+25% a.a.",
    },
    submittedAt: "2024-11-25",
    documents: [
      "Balanço Patrimonial 2023",
      "DRE 2023",
      "Manual de Franquia",
      "Licenças Sanitárias",
    ],
  },
};

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const company = id ? mockCompanyDetails[id as keyof typeof mockCompanyDetails] : null;

  if (!company) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="max-w-4xl mx-auto text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold mb-2">Empresa não encontrada</h2>
            <p className="text-muted-foreground mb-6">
              A empresa que você está procurando não existe ou foi removida.
            </p>
            <Button onClick={() => navigate("/dashboard/admin/pending")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Empresas Pendentes
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleApprove = () => {
    toast({
      title: "Empresa aprovada!",
      description: `${company.name} foi aprovada e está agora no marketplace.`,
    });
    navigate("/dashboard/admin/pending");
  };

  const handleReject = () => {
    toast({
      title: "Empresa rejeitada",
      description: `${company.name} foi rejeitada. O vendedor será notificado.`,
      variant: "destructive",
    });
    navigate("/dashboard/admin/pending");
  };

  const daysSinceSubmitted = Math.floor(
    (new Date().getTime() - new Date(company.submittedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard/admin/pending")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary">
                    {company.name}
                  </h1>
                  <Badge variant="secondary" className="bg-warning hover:bg-warning">
                    Pendente
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{company.description}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <Card className="border-2 border-warning/30 bg-warning/5 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Enviado há {daysSinceSubmitted} dias</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="destructive"
                    onClick={handleReject}
                    className="min-w-[120px]"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeitar
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleApprove}
                    className="bg-success hover:bg-success/90 min-w-[120px]"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Aprovar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Setor</p>
                        <p className="font-medium">{company.sector}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Receita Anual</p>
                        <p className="font-medium">{company.revenue}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-secondary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Funcionários</p>
                        <p className="font-medium">{company.employees} colaboradores</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Fundação</p>
                        <p className="font-medium">{company.foundedYear}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Localização</p>
                        <p className="font-medium">{company.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="font-medium text-primary hover:underline cursor-pointer">
                          {company.website}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Destaques</CardTitle>
                  <CardDescription>Principais diferenciais da empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {company.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg"
                      >
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financials */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Informações Financeiras</CardTitle>
                  <CardDescription>Dados financeiros reportados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-success" />
                        <span className="text-sm text-muted-foreground">Receita</span>
                      </div>
                      <p className="text-2xl font-bold">{company.financials.revenue}</p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">EBITDA</span>
                      </div>
                      <p className="text-2xl font-bold">{company.financials.ebitda}</p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-muted-foreground">Margem EBITDA</span>
                      </div>
                      <p className="text-2xl font-bold">{company.financials.margin}</p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        <span className="text-sm text-muted-foreground">Crescimento</span>
                      </div>
                      <p className="text-2xl font-bold">{company.financials.growth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Documentos Anexados</CardTitle>
                  <CardDescription>Documentação fornecida pelo vendedor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {company.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium">{doc}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Seller Info */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Informações do Vendedor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Nome</p>
                    <p className="font-medium">{company.sellerName}</p>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{company.sellerEmail}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{company.sellerPhone}</p>
                  </div>

                  <Separator />

                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Linha do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Empresa enviada</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(company.submittedAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-muted mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Aguardando análise
                        </p>
                        <p className="text-xs text-muted-foreground">Em revisão</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
