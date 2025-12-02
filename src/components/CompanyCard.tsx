import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, TrendingUp, ArrowRight, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import { useComparison } from "@/contexts/ComparisonContext";

interface CompanyCardProps {
  id: string;
  companyName: string;
  sector: string;
  location: string;
  revenue: string;
  employees: number;
  description: string;
}

export const CompanyCard = ({
  id,
  companyName,
  sector,
  location,
  revenue,
  employees,
  description,
}: CompanyCardProps) => {
  const { addCompany, isInComparison } = useComparison();

  const handleAddToComparison = () => {
    addCompany({
      id,
      companyName,
      sector,
      location,
      revenue,
      employees,
      description,
    });
  };

  const inComparison = isInComparison(id);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-secondary/50">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="text-xs font-medium">
            {sector}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-secondary transition-colors">
          {companyName}
        </CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Faturamento</p>
              <p className="text-sm font-semibold">{revenue}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Users className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Funcionários</p>
              <p className="text-sm font-semibold">{employees}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`/marketplace/companies/${id}`} className="flex-1">
            <Button variant="secondary" className="w-full group/btn">
              Ver Detalhes
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            variant={inComparison ? "default" : "outline"}
            size="icon"
            onClick={handleAddToComparison}
            disabled={inComparison}
            title={inComparison ? "Já está na comparação" : "Adicionar à comparação"}
          >
            <GitCompare className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};