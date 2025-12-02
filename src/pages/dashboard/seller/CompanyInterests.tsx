import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, X, MessageSquare, Mail, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockInterests = [
  {
    id: "1",
    buyerName: "João Silva",
    buyerEmail: "joao@email.com",
    message: "Tenho muito interesse nesta empresa. Gostaria de saber mais detalhes sobre o faturamento.",
    date: "2024-12-01",
    status: "pending",
  },
  {
    id: "2",
    buyerName: "Maria Santos",
    buyerEmail: "maria@email.com",
    message: "Empresa muito promissora! Podemos agendar uma conversa?",
    date: "2024-11-28",
    status: "pending",
  },
  {
    id: "3",
    buyerName: "Pedro Costa",
    buyerEmail: "pedro@email.com",
    message: "Interessado em conhecer mais sobre a operação e possibilidades de negócio.",
    date: "2024-11-25",
    status: "accepted",
  },
];

export default function CompanyInterests() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [interests, setInterests] = useState(mockInterests);

  const handleAccept = (interestId: string) => {
    setInterests(prev =>
      prev.map(interest =>
        interest.id === interestId ? { ...interest, status: "accepted" } : interest
      )
    );
    toast({
      title: "Interesse aceito!",
      description: "Você pode iniciar uma conversa com o comprador.",
    });
  };

  const handleReject = (interestId: string) => {
    setInterests(prev =>
      prev.map(interest =>
        interest.id === interestId ? { ...interest, status: "rejected" } : interest
      )
    );
    toast({
      title: "Interesse rejeitado",
      description: "O comprador foi notificado.",
      variant: "destructive",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
        <div className="max-w-5xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/seller")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary">Interessados</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie os compradores interessados na sua empresa
            </p>
          </div>

          <div className="space-y-4">
            {interests.map((interest) => (
              <Card key={interest.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-border">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(interest.buyerName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{interest.buyerName}</CardTitle>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {interest.buyerEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(interest.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(interest.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-foreground">{interest.message}</p>
                  </div>

                  {interest.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAccept(interest.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Aceitar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(interest.id)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Rejeitar
                      </Button>
                    </div>
                  )}

                  {interest.status === "accepted" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/messages")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Abrir Conversa
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}

            {interests.length === 0 && (
              <Card className="border-2 border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Ainda não há compradores interessados nesta empresa.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
