import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Lock, Sparkles, Crown } from "lucide-react";
import { useSubscription, PLAN_PRICING } from "@/contexts/SubscriptionContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PaywallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
  description?: string;
}

export function PaywallDialog({ open, onOpenChange, feature, description }: PaywallDialogProps) {
  const { upgradePlan, subscription } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = async (plan: "basic" | "premium") => {
    setIsProcessing(true);
    try {
      await upgradePlan(plan);
      toast({
        title: "Plano ativado com sucesso!",
        description: `Você agora tem acesso ao plano ${PLAN_PRICING[plan].name}.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-warning" />
            <Badge variant="secondary">Recurso Premium</Badge>
          </div>
          <DialogTitle className="text-2xl">Desbloqueie {feature}</DialogTitle>
          <DialogDescription>
            {description || "Este recurso está disponível apenas para assinantes. Escolha um plano para continuar."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Basic Plan */}
          <Card className={`border-2 ${subscription?.plan === "basic" ? "border-primary" : "border-border"}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Básico</CardTitle>
                {subscription?.plan === "basic" && (
                  <Badge>Plano Atual</Badge>
                )}
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">R$ {PLAN_PRICING.basic.monthly}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  Comparar até 5 empresas
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  Contato direto com vendedores
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  Visualizar detalhes completos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  Até 3 anúncios ativos
                </li>
              </ul>
              <Button
                className="w-full"
                variant={subscription?.plan === "basic" ? "secondary" : "default"}
                disabled={subscription?.plan === "basic" || isProcessing}
                onClick={() => handleUpgrade("basic")}
              >
                {subscription?.plan === "basic" ? "Plano Atual" : "Assinar Básico"}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-secondary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
              Mais Popular
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="w-5 h-5 text-secondary" />
                  Premium
                </CardTitle>
                {subscription?.plan === "premium" && (
                  <Badge className="bg-secondary">Plano Atual</Badge>
                )}
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">R$ {PLAN_PRICING.premium.monthly}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Comparações ilimitadas
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Tudo do plano Básico
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Impulsionamento de anúncios
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Até 10 anúncios ativos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Suporte prioritário
                </li>
              </ul>
              <Button
                className="w-full bg-secondary hover:bg-secondary-hover"
                disabled={subscription?.plan === "premium" || isProcessing}
                onClick={() => handleUpgrade("premium")}
              >
                {subscription?.plan === "premium" ? "Plano Atual" : "Assinar Premium"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Pagamento simulado para demonstração. Nenhuma cobrança real será feita.
        </p>
      </DialogContent>
    </Dialog>
  );
}
