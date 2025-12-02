import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Calendar, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const mockInterests = [
  {
    id: "1",
    companyId: "1",
    companyName: "TechFlow Solutions",
    sector: "Tecnologia",
    revenue: 5000000,
    status: "accepted",
    message: "Tenho muito interesse nesta empresa. Gostaria de saber mais detalhes.",
    sentAt: "2024-12-01",
  },
  {
    id: "2",
    companyId: "2",
    companyName: "Indústria MG",
    sector: "Indústria",
    revenue: 8000000,
    status: "pending",
    message: "Empresa com grande potencial. Podemos conversar sobre os detalhes?",
    sentAt: "2024-11-28",
  },
  {
    id: "3",
    companyId: "3",
    companyName: "Café Premium LTDA",
    sector: "Alimentos e Bebidas",
    revenue: 2500000,
    status: "rejected",
    message: "Gostaria de conhecer mais sobre a operação.",
    sentAt: "2024-11-25",
  },
];

export default function MyInterests() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Aguardando Resposta</Badge>;
      case "accepted":
        return <Badge className="bg-success text-success-foreground">Aceito pelo Vendedor</Badge>;
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
          <h1 className="text-3xl font-heading font-bold text-primary">Meus Interesses</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe o status dos seus interesses demonstrados
          </p>
        </div>

        <div className="space-y-4">
          {mockInterests.map((interest) => (
            <Card key={interest.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{interest.companyName}</CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="secondary">{interest.sector}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          R$ {(interest.revenue / 1000000).toFixed(1)}M/ano
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(interest.sentAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(interest.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Sua mensagem:</p>
                  <p className="text-sm text-foreground">{interest.message}</p>
                </div>

                <div className="flex gap-2">
                  <Link to={`/marketplace/companies/${interest.companyId}`}>
                    <Button variant="outline" size="sm">
                      <Building2 className="w-4 h-4 mr-2" />
                      Ver Empresa
                    </Button>
                  </Link>

                  {interest.status === "accepted" && (
                    <Link to="/messages">
                      <Button variant="default" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Abrir Conversa
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {mockInterests.length === 0 && (
            <Card className="border-2 border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Você ainda não demonstrou interesse em nenhuma empresa.
                </p>
                <Link to="/marketplace">
                  <Button>Explorar Marketplace</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
