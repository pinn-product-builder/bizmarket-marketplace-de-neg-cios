import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const mockRecentCompanies = [
  {
    id: "1",
    name: "TechFlow Solutions",
    sector: "Tecnologia",
    revenue: 5000000,
    viewedAt: "2024-12-01",
  },
  {
    id: "2",
    name: "Café Premium LTDA",
    sector: "Alimentos e Bebidas",
    revenue: 2500000,
    viewedAt: "2024-11-30",
  },
];

const mockInterests = [
  {
    id: "1",
    companyName: "TechFlow Solutions",
    status: "pending",
    sentAt: "2024-12-01",
  },
  {
    id: "2",
    companyName: "Indústria MG",
    status: "accepted",
    sentAt: "2024-11-28",
  },
];

export default function BuyerDashboard() {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>;
      case "accepted":
        return <Badge className="bg-success text-success-foreground">Aceito</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary">
            Bem-vindo, {user?.fullName}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">Acompanhe sua atividade e interesses</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Empresas Visualizadas
              </CardTitle>
              <Eye className="w-5 h-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Interesses Enviados
              </CardTitle>
              <Heart className="w-5 h-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-xs text-muted-foreground mt-1">2 aceitos</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversas Ativas
              </CardTitle>
              <MessageSquare className="w-5 h-5 text-success" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground mt-1">Em andamento</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Companies */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-heading">Visualizadas Recentemente</CardTitle>
                <Link to="/marketplace">
                  <Button variant="ghost" size="sm">
                    Ver todas
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentCompanies.map((company) => (
                  <div key={company.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{company.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {company.sector}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          R$ {(company.revenue / 1000000).toFixed(1)}M/ano
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Vista em {new Date(company.viewedAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Link to={`/marketplace/companies/${company.id}`}>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Interests Status */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-heading">Meus Interesses</CardTitle>
                <Link to="/dashboard/buyer/interests">
                  <Button variant="ghost" size="sm">
                    Ver todos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInterests.map((interest) => (
                  <div key={interest.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{interest.companyName}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Enviado em {new Date(interest.sentAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    {getStatusBadge(interest.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5 mt-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                  Procurando novas oportunidades?
                </h3>
                <p className="text-muted-foreground">
                  Explore o marketplace e encontre a empresa perfeita para investir
                </p>
              </div>
              <Link to="/marketplace">
                <Button size="lg">
                  Ver Marketplace
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
