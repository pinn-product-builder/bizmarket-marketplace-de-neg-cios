import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Rocket, Zap, Crown, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { PaywallDialog } from "@/components/PaywallDialog";

interface BoostListingDialogProps {
  companyId: string;
  companyName: string;
  trigger?: React.ReactNode;
}

const BOOST_OPTIONS = [
  {
    id: "7days",
    name: "Destaque 7 dias",
    price: 49,
    description: "Apareça no topo por 1 semana",
    icon: Zap,
  },
  {
    id: "15days",
    name: "Destaque 15 dias",
    price: 89,
    description: "Apareça no topo por 2 semanas",
    popular: true,
    icon: Rocket,
  },
  {
    id: "30days",
    name: "Destaque 30 dias",
    price: 149,
    description: "Apareça no topo por 1 mês",
    icon: Crown,
  },
];

export function BoostListingDialog({ companyId, companyName, trigger }: BoostListingDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("15days");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { toast } = useToast();
  const { canAccessFeature } = useSubscription();

  const handleBoost = async () => {
    if (!canAccessFeature("canBoostListing")) {
      setShowPaywall(true);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Anúncio impulsionado!",
      description: `${companyName} agora aparecerá em destaque no marketplace.`,
    });
    
    setIsProcessing(false);
    setOpen(false);
  };

  const selectedBoost = BOOST_OPTIONS.find(opt => opt.id === selectedOption);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" size="sm" className="gap-2">
              <Rocket className="w-4 h-4" />
              Impulsionar
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-secondary" />
              Impulsionar Anúncio
            </DialogTitle>
            <DialogDescription>
              Destaque "{companyName}" no topo do marketplace para atrair mais investidores.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {BOOST_OPTIONS.map((option) => (
                <div key={option.id} className="relative">
                  <Label
                    htmlFor={option.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === option.id
                        ? "border-secondary bg-secondary/5"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOption === option.id ? "bg-secondary text-white" : "bg-muted"
                    }`}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{option.name}</span>
                        {option.popular && (
                          <Badge className="bg-secondary text-xs">Mais Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">R$ {option.price}</span>
                    </div>
                  </Label>
                  {selectedOption === option.id && (
                    <Check className="absolute top-4 right-4 w-5 h-5 text-secondary" />
                  )}
                </div>
              ))}
            </RadioGroup>

            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Benefícios do destaque:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Posição prioritária no marketplace</li>
                  <li>• Badge "Em Destaque" no anúncio</li>
                  <li>• Até 5x mais visualizações</li>
                  <li>• Aparecer nas recomendações</li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              onClick={handleBoost}
              disabled={isProcessing}
              className="w-full bg-secondary hover:bg-secondary-hover"
            >
              {isProcessing ? "Processando..." : `Impulsionar por R$ ${selectedBoost?.price}`}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Pagamento simulado para demonstração.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <PaywallDialog
        open={showPaywall}
        onOpenChange={setShowPaywall}
        feature="Impulsionamento de Anúncios"
        description="O impulsionamento está disponível apenas para assinantes Premium."
      />
    </>
  );
}
