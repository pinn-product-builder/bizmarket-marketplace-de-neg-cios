import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Building2,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const mockCompanies = [
  {
    id: "1",
    name: "TechFlow Solutions",
    sector: "Tecnologia",
    status: "active",
    views: 342,
    interests: 8,
    revenue: "R$ 5M/ano",
  },
  {
    id: "2",
    name: "EcoGreen Logistics",
    sector: "Logística",
    status: "pending",
    views: 0,
    interests: 0,
    revenue: "R$ 12M/ano",
  },
];

export default function SellerDashboard() {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    if (status === "active")
      return (
        <Badge variant="default" className="bg-success hover:bg-success">
          Ativa
        </Badge>
      );
    if (status === "pending")
      return (
        <Badge variant="secondary" className="bg-warning hover:bg-warning">
          Pendente
        </Badge>
      );
    return <Badge variant="outline">Pausada</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              Bem-vindo, {user?.fullName}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Gerencie suas empresas e acompanhe o desempenho
            </p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-8 h-8 text-primary" />
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">2</div>
                <p className="text-sm text-muted-foreground">Empresas Cadastradas</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-secondary mb-1">342</div>
                <p className="text-sm text-muted-foreground">Visualizações Totais</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <MessageSquare className="w-8 h-8 text-success" />
                </div>
                <div className="text-3xl font-bold text-success mb-1">8</div>
                <p className="text-sm text-muted-foreground">Interessados</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-8 h-8 text-warning" />
                </div>
                <div className="text-3xl font-bold text-warning mb-1">1</div>
                <p className="text-sm text-muted-foreground">Empresa Ativa</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Companies Preview */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-heading">Minhas Empresas</CardTitle>
                      <CardDescription>Visão geral das suas empresas</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link to="/dashboard/seller/companies">Ver todas</Link>
                      </Button>
                      <Link to="/dashboard/seller/companies/new">
                        <Button variant="default">
                          <Plus className="w-4 h-4 mr-2" />
                          Nova Empresa
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockCompanies.slice(0, 2).map((company) => (
                    <Card key={company.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-heading font-semibold text-lg">
                                {company.name}
                              </h3>
                              {getStatusBadge(company.status)}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {company.sector}
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {company.revenue}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span>{company.views} visualizações</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            <span>{company.interests} interessados</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Editar
                          </Button>
                          {company.interests > 0 && (
                            <Button variant="default" size="sm" className="flex-1">
                              Ver Interessados ({company.interests})
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border-2 border-secondary/50 bg-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-secondary">
                    <Clock className="w-5 h-5" />
                    Próximos Passos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-secondary">1</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Complete o cadastro</p>
                      <p className="text-xs text-muted-foreground">
                        Adicione mais informações sobre suas empresas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-success">2</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Responda interessados</p>
                      <p className="text-xs text-muted-foreground">
                        8 compradores demonstraram interesse
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border">
                    <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-warning">3</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Aguarde aprovação</p>
                      <p className="text-xs text-muted-foreground">
                        1 empresa em análise pela equipe
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
                      <span className="text-sm font-semibold">2.3%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Perfil Completo</span>
                      <span className="text-sm font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
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
