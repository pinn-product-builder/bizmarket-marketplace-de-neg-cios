import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { useSubscription, PLAN_PRICING } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Pricing() {
  const { subscription, upgradePlan } = useSubscription();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleSelectPlan = async (plan: "free" | "basic" | "premium") => {
    if (!isAuthenticated) {
      navigate("/auth/signup");
      return;
    }

    if (plan === "free") {
      toast({
        title: "Plano Gratuito",
        description: "Você já pode usar a plataforma gratuitamente!",
      });
      return;
    }

    setIsProcessing(plan);
    try {
      await upgradePlan(plan);
      toast({
        title: "Plano ativado!",
        description: `Você agora tem acesso ao plano ${PLAN_PRICING[plan].name}.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível processar. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const plans = [
    {
      id: "free",
      name: "Gratuito",
      price: 0,
      description: "Ideal para começar a explorar",
      icon: Zap,
      features: [
        "Visualizar empresas no marketplace",
        "Busca básica por empresas",
        "Criar 1 anúncio de empresa",
        "Acesso ao FAQ e suporte",
      ],
      limitations: [
        "Sem comparação de empresas",
        "Sem contato direto com vendedores",
        "Informações limitadas",
      ],
    },
    {
      id: "basic",
      name: "Básico",
      price: PLAN_PRICING.basic.monthly,
      description: "Para compradores e vendedores ativos",
      icon: Sparkles,
      popular: false,
      features: [
        "Tudo do plano Gratuito",
        "Comparar até 5 empresas",
        "Contato direto com vendedores",
        "Visualizar detalhes completos",
        "Até 3 anúncios ativos",
        "Suporte por email",
      ],
      limitations: [
        "Sem impulsionamento",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: PLAN_PRICING.premium.monthly,
      description: "Para profissionais e investidores sérios",
      icon: Crown,
      popular: true,
      features: [
        "Tudo do plano Básico",
        "Comparações ilimitadas",
        "Impulsionamento de anúncios",
        "Até 10 anúncios ativos",
        "Análises com IA avançada",
        "Suporte prioritário",
        "Badge de Destaque",
      ],
      limitations: [],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-primary mb-4">Planos e Preços</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades. Cancele quando quiser.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-secondary scale-105 shadow-lg"
                    : subscription?.plan === plan.id
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary px-4 py-1">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    plan.popular ? "bg-secondary/10" : "bg-muted"
                  }`}>
                    <plan.icon className={`w-7 h-7 ${
                      plan.popular ? "text-secondary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? "Grátis" : `R$ ${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/mês</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">✕</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-secondary hover:bg-secondary-hover"
                        : ""
                    }`}
                    variant={subscription?.plan === plan.id ? "secondary" : "default"}
                    disabled={subscription?.plan === plan.id || isProcessing === plan.id}
                    onClick={() => handleSelectPlan(plan.id as "free" | "basic" | "premium")}
                  >
                    {isProcessing === plan.id
                      ? "Processando..."
                      : subscription?.plan === plan.id
                      ? "Plano Atual"
                      : plan.price === 0
                      ? "Começar Grátis"
                      : "Assinar Agora"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Como funciona o pagamento?</h4>
                  <p className="text-sm text-muted-foreground">
                    Aceitamos cartões de crédito e PIX. A cobrança é mensal e você pode mudar de plano quando quiser.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">O que acontece se eu fizer downgrade?</h4>
                  <p className="text-sm text-muted-foreground">
                    Seus dados são mantidos, mas você perderá acesso às funcionalidades premium ao final do período pago.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground bg-muted/50 inline-block px-4 py-2 rounded-lg">
              🎭 Ambiente de demonstração - Nenhuma cobrança real será feita
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
