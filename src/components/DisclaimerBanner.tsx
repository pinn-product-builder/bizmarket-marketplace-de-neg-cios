import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DisclaimerBannerProps {
  variant?: "warning" | "info";
  dismissible?: boolean;
}

export function DisclaimerBanner({ 
  variant = "warning", 
  dismissible = true,
}: DisclaimerBannerProps) {
  const [isDismissed, setIsDismissed] = useState(() => {
    if (!dismissible) return false;
    return sessionStorage.getItem("disclaimer_dismissed") === "true";
  });

  if (isDismissed) return null;

  const handleDismiss = () => {
    if (!dismissible) return;
    setIsDismissed(true);
    sessionStorage.setItem("disclaimer_dismissed", "true");
  };

  return (
    <div className={`relative py-4 px-4 ${
      variant === "warning" 
        ? "bg-warning/15 border-b-2 border-warning/40" 
        : "bg-secondary/10 border-b border-secondary/30"
    }`}>
      <div className="container mx-auto flex items-center justify-center gap-3 text-sm">
        <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
          variant === "warning" ? "text-warning" : "text-secondary"
        }`} />
        <p className="text-center text-foreground">
          <strong className="text-warning">Importante:</strong> O BizMarket é uma plataforma de exposição de anúncios. 
          A veracidade das informações é responsabilidade dos anunciantes. 
          Não nos responsabilizamos pelas negociações realizadas.{" "}
          <Link to="/legal/termos" className="underline hover:text-primary font-semibold">
            Leia os Termos
          </Link>
        </p>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 flex-shrink-0 hover:bg-warning/20"
            onClick={handleDismiss}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
