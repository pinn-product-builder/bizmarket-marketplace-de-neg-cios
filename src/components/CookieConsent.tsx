import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay to not show immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto border-2 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Utilizamos cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                  Ao continuar navegando, você concorda com nossa{" "}
                  <Link to="/legal/privacidade" className="text-primary underline">
                    Política de Privacidade
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptEssential}
                className="flex-1 md:flex-initial"
              >
                <Settings className="w-4 h-4 mr-2" />
                Apenas Essenciais
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 md:flex-initial bg-secondary hover:bg-secondary-hover"
              >
                Aceitar Todos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
