import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useComparison } from "@/contexts/ComparisonContext";
import { GitCompare, X, Building2 } from "lucide-react";

export const ComparisonFloatingBar = () => {
  const { companies, removeCompany } = useComparison();

  if (companies.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
      <Card className="border-2 shadow-2xl max-w-md">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Comparação</h3>
              <Badge variant="secondary">{companies.length}/3</Badge>
            </div>
          </div>

          <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
            {companies.map((company) => (
              <div
                key={company.id}
                className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    <Building2 className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{company.companyName}</p>
                  <p className="text-xs text-muted-foreground">{company.sector}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 flex-shrink-0"
                  onClick={() => removeCompany(company.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Link to="/marketplace/compare">
            <Button className="w-full" size="sm">
              <GitCompare className="w-4 h-4 mr-2" />
              Comparar Empresas
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
