import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DisclaimerBannerProps {
  variant?: "warning" | "info";
  dismissible?: boolean;
  showOnPages?: string[];
}

export function DisclaimerBanner({ 
  variant = "warning", 
  dismissible = true,
}: DisclaimerBannerProps) {
  const [isDismissed, setIsDismissed] = useState(() => {
    return sessionStorage.getItem("disclaimer_dismissed") === "true";
  });

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("disclaimer_dismissed", "true");
  };

  return (
    <div className={`relative py-3 px-4 ${
      variant === "warning" 
        ? "bg-warning/10 border-b border-warning/30" 
        : "bg-secondary/10 border-b border-secondary/30"
    }`}>
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm">
        <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
          variant === "warning" ? "text-warning" : "text-secondary"
        }`} />
        <p className="text-center">
          <strong>Aviso:</strong> O BizMarket é uma plataforma de exposição de anúncios. 
          Não nos responsabilizamos pelas negociações ou informações fornecidas pelos anunciantes.{" "}
          <Link to="/legal/termos" className="underline hover:text-primary font-medium">
            Leia os Termos
          </Link>
        </p>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 flex-shrink-0"
            onClick={handleDismiss}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
