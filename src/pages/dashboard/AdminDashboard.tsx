import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const pendingCompanies = [
  {
    id: "2",
    name: "EcoGreen Logistics",
    sector: "Logística",
    sellerName: "João Silva",
    revenue: "R$ 12M/ano",
    submittedAt: "Há 2 dias",
  },
  {
    id: "4",
    name: "HealthPlus Clínicas",
    sector: "Saúde",
    sellerName: "Maria Santos",
    revenue: "R$ 8M/ano",
    submittedAt: "Há 5 dias",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              Painel Administrativo 🔧
            </h1>
            <p className="text-lg text-muted-foreground">
              Gerencie empresas e usuários da plataforma
            </p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">156</div>
                <p className="text-sm text-muted-foreground">Total de Empresas</p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <Badge variant="default" className="bg-success hover:bg-success">
                    124 Ativas
                  </Badge>
                  <Badge variant="secondary" className="bg-warning hover:bg-warning">
                    32 Pendentes
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-secondary mb-1">1,247</div>
                <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">🏢 89 Vendedores</span>
                  <span className="text-muted-foreground">💼 1,158 Compradores</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <div className="text-3xl font-bold text-success mb-1">R$ 2.5B</div>
                <p className="text-sm text-muted-foreground">Volume Total</p>
                <p className="text-xs text-muted-foreground mt-1">Em negociação</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-warning" />
                </div>
                <div className="text-3xl font-bold text-warning mb-1">
                  {pendingCompanies.length}
                </div>
                <p className="text-sm text-muted-foreground">Aguardando Aprovação</p>
                <p className="text-xs text-muted-foreground mt-1">Requer ação</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Approvals */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading flex items-center gap-2">
                    <Clock className="w-6 h-6 text-warning" />
                    Empresas Pendentes de Aprovação
                  </CardTitle>
                  <CardDescription>
                    Analise e aprove empresas cadastradas por vendedores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingCompanies.map((company) => (
                    <Card
                      key={company.id}
                      className="border-2 border-warning/30 hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-heading font-semibold text-lg">
                                {company.name}
                              </h3>
                              <Badge variant="secondary" className="bg-warning hover:bg-warning">
                                Pendente
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {company.sector}
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  {company.revenue}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>👤 Vendedor: {company.sellerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Enviado {company.submittedAt}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                          <Button variant="default" size="sm" className="bg-success hover:bg-success">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeitar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {pendingCompanies.length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-lg mb-2">
                        Tudo em dia! 🎉
                      </h3>
                      <p className="text-muted-foreground">
                        Não há empresas aguardando aprovação no momento.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium mb-1">Nova empresa cadastrada</p>
                      <p className="text-xs text-muted-foreground">TechFlow Solutions - Há 1 hora</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium mb-1">Novo usuário registrado</p>
                      <p className="text-xs text-muted-foreground">
                        Maria Santos (Comprador) - Há 3 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0"></div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium mb-1">Interesse demonstrado</p>
                      <p className="text-xs text-muted-foreground">
                        AutoParts Express - Há 5 horas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/50 bg-secondary/5">
                <CardHeader>
                  <CardTitle className="text-secondary">Métricas do Mês</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Empresas Aprovadas</span>
                      <span className="text-sm font-semibold">24/32</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Novos Usuários</span>
                      <span className="text-sm font-semibold">147</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
                      <span className="text-sm font-semibold">94%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}