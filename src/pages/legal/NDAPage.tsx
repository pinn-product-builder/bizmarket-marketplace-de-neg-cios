import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LegalStatusBadge } from "@/components/legal/LegalStatusBadge";
import { NDATemplate } from "@/components/legal/NDATemplate";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getNDAById, signMockNDA } from "@/lib/mock-legal-data";
import { ArrowLeft, Building2, User, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

export default function NDAPage() {
  const { ndaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [accepted, setAccepted] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const nda = getNDAById(ndaId || "");

  if (!nda) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-4xl mx-auto">
          <Card className="border-2 border-destructive/50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">NDA não encontrado</h2>
              <p className="text-muted-foreground mb-4">
                O acordo de confidencialidade solicitado não existe ou foi removido.
              </p>
              <Button onClick={() => navigate("/marketplace")}>
                Voltar ao Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const isSigned = nda.status === "signed";
  const canSign = user?.id === nda.buyerId && !isSigned;

  const handleSign = async () => {
    if (!accepted) {
      toast({
        title: "Aceite necessário",
        description: "Você precisa aceitar os termos antes de assinar.",
        variant: "destructive",
      });
      return;
    }

    setIsSigning(true);

    // Mock signing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    signMockNDA(nda.id);

    toast({
      title: "NDA assinado com sucesso!",
      description: "Você agora tem acesso aos documentos jurídicos desta empresa.",
    });

    setIsSigning(false);

    // Navigate to company details
    setTimeout(() => {
      navigate(`/marketplace/companies/${nda.companyId}`);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <Link
          to={`/marketplace/companies/${nda.companyId}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a Empresa
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-heading font-bold">
              Acordo de Confidencialidade (NDA)
            </h1>
            <LegalStatusBadge status={nda.status} />
          </div>
          <p className="text-muted-foreground">
            Non-Disclosure Agreement - Termo de Confidencialidade
          </p>
        </div>

        {/* NDA Details Card */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Detalhes do Acordo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Empresa</p>
                  <p className="font-semibold">TechFlow Solutions</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <User className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Vendedor</p>
                  <p className="font-semibold">João Silva</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <User className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Comprador</p>
                  <p className="font-semibold">
                    {user?.id === nda.buyerId ? "Você" : "Maria Santos"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <LegalStatusBadge status={nda.status} />
                </div>
              </div>
            </div>

            {isSigned && nda.signedAt && (
              <div className="p-4 bg-success/10 border-2 border-success/20 rounded-lg">
                <div className="flex items-center gap-2 text-success font-semibold mb-1">
                  <CheckCircle className="w-5 h-5" />
                  Acordo Assinado
                </div>
                <p className="text-sm text-muted-foreground">
                  Assinado em{" "}
                  {format(new Date(nda.signedAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* NDA Template */}
        <div className="mb-6">
          <h2 className="text-xl font-heading font-semibold mb-4">
            Termo de Confidencialidade
          </h2>
          <NDATemplate />
        </div>

        {/* Actions */}
        {!isSigned && canSign && (
          <Card className="border-2 border-warning/50 bg-warning/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg border-2 border-warning/20">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong>Importante:</strong> Ao aceitar este acordo, você se compromete
                  legalmente a manter sigilo absoluto sobre todas as informações
                  confidenciais desta empresa. O descumprimento pode resultar em
                  penalidades legais.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="accept-terms"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked === true)}
                />
                <Label
                  htmlFor="accept-terms"
                  className="text-sm font-medium cursor-pointer"
                >
                  Li e aceito os termos de confidencialidade deste acordo
                </Label>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleSign}
                  disabled={!accepted || isSigning}
                  className="flex-1"
                >
                  {isSigning ? "Assinando..." : "Assinar NDA Digitalmente"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate(`/marketplace/companies/${nda.companyId}`)}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isSigned && (
          <Card className="border-2 border-success/50 bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Acesso Liberado</h3>
                  <p className="text-sm text-muted-foreground">
                    Você pode agora visualizar os documentos jurídicos desta empresa.
                  </p>
                </div>
                <Button asChild>
                  <Link to={`/marketplace/companies/${nda.companyId}`}>
                    Ver Documentos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
