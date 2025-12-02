import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { RiskLevelBadge } from "@/components/legal/RiskLevelBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Building2,
  MapPin,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  MessageSquare,
  ArrowLeft,
  Shield,
  Lock,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  getNDAByCompanyAndBuyer,
  createMockNDA,
  getDDChecklistByCompany,
} from "@/lib/mock-legal-data";

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isInterestDialogOpen, setIsInterestDialogOpen] = useState(false);
  const [interestMessage, setInterestMessage] = useState("");

  // Legal module data
  const companyId = id || "1";
  const existingNDA = getNDAByCompanyAndBuyer(companyId, user?.id || "");
  const ddChecklist = getDDChecklistByCompany(companyId);
  const hasSignedNDA = existingNDA?.status === "signed";

  // Mock data - will be replaced with real data from Supabase
  const company = {
    companyName: "TechFlow Solutions",
    tradingName: "TechFlow",
    sector: "Tecnologia",
    description:
      "A TechFlow Solutions é uma empresa consolidada no mercado de desenvolvimento de software B2B, com uma base sólida de clientes corporativos e um histórico de crescimento consistente. Nossa expertise inclui desenvolvimento de sistemas web, aplicativos móveis e soluções de integração empresarial.",
    annualRevenue: 5000000,
    foundationYear: 2015,
    employees: 45,
    locationState: "São Paulo",
    locationCity: "São Paulo",
    reasonForSale:
      "Os sócios fundadores estão buscando novos desafios e desejam passar o negócio para empreendedores que possam levar a empresa ao próximo nível de crescimento.",
    askingPrice: 15000000,
    viewsCount: 342,
    mainProducts: "Sistemas web, aplicativos móveis, APIs e integrações",
    competitiveDifferentials:
      "Time altamente qualificado, metodologia ágil comprovada, clientes recorrentes com contratos de longo prazo",
  };

  const handleInterestClick = () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    if (user?.userType !== "buyer") {
      toast({
        title: "Acesso restrito",
        description: "Apenas compradores podem demonstrar interesse.",
        variant: "destructive",
      });
      return;
    }
    setIsInterestDialogOpen(true);
  };

  const handleSendInterest = () => {
    toast({
      title: "Interesse demonstrado!",
      description: "O vendedor foi notificado e responderá em breve.",
    });
    setIsInterestDialogOpen(false);
    setInterestMessage("");
  };

  const handleRequestNDA = () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    if (user?.userType !== "buyer") {
      toast({
        title: "Acesso restrito",
        description: "Apenas compradores podem solicitar acesso aos documentos.",
        variant: "destructive",
      });
      return;
    }

    // Create NDA if doesn't exist
    let nda = existingNDA;
    if (!nda) {
      nda = createMockNDA(companyId, user.id, "seller-1");
      toast({
        title: "NDA criado",
        description: "Você será redirecionado para assinar o acordo.",
      });
    }

    // Navigate to NDA page
    navigate(`/legal/nda/${nda.id}`);
  };

  const handleViewLegalDocs = () => {
    toast({
      title: "Documentos jurídicos",
      description: "Visualizando documentos disponíveis...",
    });
  };

  const content = (
    <div className={isAuthenticated ? "p-8" : ""}>
      <div className={isAuthenticated ? "max-w-6xl mx-auto" : "container mx-auto px-4 lg:px-8 max-w-6xl"}>
        {/* Back Button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Marketplace
        </Link>

        {/* Header */}
        <div className="bg-white border-2 border-border rounded-xl p-8 mb-6 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {company.sector}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {company.locationCity}, {company.locationState}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
                {company.companyName}
              </h1>
              {company.tradingName && (
                <p className="text-lg text-muted-foreground">
                  Nome Fantasia: {company.tradingName}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Preço Pedido</p>
              <p className="text-3xl font-heading font-bold text-success">
                R$ {(company.askingPrice / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Faturamento Anual</p>
                <p className="font-semibold">
                  R$ {(company.annualRevenue / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Users className="w-6 h-6 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Funcionários</p>
                <p className="font-semibold">{company.employees}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Calendar className="w-6 h-6 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Fundação</p>
                <p className="font-semibold">{company.foundationYear}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Building2 className="w-6 h-6 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Visualizações</p>
                <p className="font-semibold">{company.viewsCount}</p>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full" variant="default" onClick={handleInterestClick}>
            <MessageSquare className="w-5 h-5" />
            Demonstrar Interesse
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Sobre a Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{company.description}</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Detalhes Operacionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Principais Produtos/Serviços</h4>
                  <p className="text-muted-foreground">{company.mainProducts}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Diferenciais Competitivos</h4>
                  <p className="text-muted-foreground">{company.competitiveDifferentials}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Motivo da Venda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{company.reasonForSale}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Legal Status Card */}
            {isAuthenticated && user?.userType === "buyer" && ddChecklist && (
              <Card className="border-2 border-secondary/50 bg-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-secondary">
                    <Shield className="w-5 h-5" />
                    Status Jurídico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Due Diligence</p>
                    <div className="flex items-center gap-3 mb-1">
                      <Progress
                        value={ddChecklist.completionPercentage}
                        className="flex-1 h-2"
                      />
                      <span className="text-sm font-bold">
                        {ddChecklist.completionPercentage}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Documentação completa</p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Nível de Risco</p>
                    <RiskLevelBadge level={ddChecklist.riskLevel} />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {!hasSignedNDA ? (
                      <>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground mb-2">
                          <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <p>
                            Para acessar os documentos jurídicos completos, é necessário
                            assinar um NDA.
                          </p>
                        </div>
                        <Button
                          className="w-full"
                          variant="secondary"
                          onClick={handleRequestNDA}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Solicitar Acesso (NDA)
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-full"
                        variant="secondary"
                        onClick={handleViewLegalDocs}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Documentos Jurídicos
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-2 border-success/50 bg-success/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <FileText className="w-5 h-5" />
                  Documentação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Documentos disponíveis mediante interesse demonstrado e aprovação do vendedor.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    Balanço Patrimonial
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    DRE (Demonstração de Resultado)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    Contrato Social
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    Certidões Negativas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{company.locationCity}</p>
                    <p className="text-sm text-muted-foreground">{company.locationState}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  if (isAuthenticated) {
    return (
      <>
        <DashboardLayout>{content}</DashboardLayout>
        {/* Interest Dialog */}
        <Dialog open={isInterestDialogOpen} onOpenChange={setIsInterestDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Demonstrar Interesse</DialogTitle>
              <DialogDescription>
                Envie uma mensagem para o vendedor demonstrando seu interesse nesta empresa.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem (opcional)</Label>
                <Textarea
                  id="message"
                  placeholder="Conte um pouco sobre seu interesse e objetivos..."
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInterestDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSendInterest}>
                Enviar Interesse
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">{content}</main>
      <Footer />
      
      {/* Interest Dialog */}
      <Dialog open={isInterestDialogOpen} onOpenChange={setIsInterestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demonstrar Interesse</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para o vendedor demonstrando seu interesse nesta empresa.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea
                id="message"
                placeholder="Conte um pouco sobre seu interesse e objetivos..."
                value={interestMessage}
                onChange={(e) => setInterestMessage(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInterestDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSendInterest}>
              Enviar Interesse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}