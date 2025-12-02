import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockPendingCompanies = [
  {
    id: "2",
    name: "EcoGreen Logistics",
    sector: "Logística",
    sellerName: "João Silva",
    revenue: "R$ 12M/ano",
    submittedAt: "2024-11-29",
    daysAgo: 2,
  },
  {
    id: "4",
    name: "HealthPlus Clínicas",
    sector: "Saúde",
    sellerName: "Maria Santos",
    revenue: "R$ 8M/ano",
    submittedAt: "2024-11-26",
    daysAgo: 5,
  },
  {
    id: "7",
    name: "AutoParts Express",
    sector: "Automotivo",
    sellerName: "Carlos Souza",
    revenue: "R$ 15M/ano",
    submittedAt: "2024-11-28",
    daysAgo: 3,
  },
  {
    id: "9",
    name: "FoodChain Brasil",
    sector: "Alimentos",
    sellerName: "Ana Lima",
    revenue: "R$ 22M/ano",
    submittedAt: "2024-11-25",
    daysAgo: 6,
  },
];

export default function PendingCompanies() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const filteredCompanies = mockPendingCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === "all" || company.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCompanies(filteredCompanies.map((c) => c.id));
    } else {
      setSelectedCompanies([]);
    }
  };

  const handleSelectCompany = (companyId: string, checked: boolean) => {
    if (checked) {
      setSelectedCompanies([...selectedCompanies, companyId]);
    } else {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId));
    }
  };

  const handleApprove = (companyName: string) => {
    toast({
      title: "Empresa aprovada!",
      description: `${companyName} foi aprovada e está agora no marketplace.`,
    });
  };

  const handleReject = (companyName: string) => {
    toast({
      title: "Empresa rejeitada",
      description: `${companyName} foi rejeitada. O vendedor será notificado.`,
      variant: "destructive",
    });
  };

  const handleBulkApprove = () => {
    toast({
      title: "Empresas aprovadas!",
      description: `${selectedCompanies.length} empresas foram aprovadas.`,
    });
    setSelectedCompanies([]);
  };

  const handleBulkReject = () => {
    toast({
      title: "Empresas rejeitadas",
      description: `${selectedCompanies.length} empresas foram rejeitadas.`,
      variant: "destructive",
    });
    setSelectedCompanies([]);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              Empresas Pendentes de Aprovação
            </h1>
            <p className="text-lg text-muted-foreground">
              Analise e aprove empresas cadastradas por vendedores
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6 border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por empresa ou vendedor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os setores</SelectItem>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Logística">Logística</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Automotivo">Automotivo</SelectItem>
                    <SelectItem value="Alimentos">Alimentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedCompanies.length > 0 && (
            <Card className="mb-6 border-2 border-secondary/50 bg-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedCompanies.length} empresa(s) selecionada(s)
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleBulkApprove}
                      className="bg-success hover:bg-success/90"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprovar Selecionadas
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleBulkReject}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar Selecionadas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Companies Table */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedCompanies.length === filteredCompanies.length &&
                          filteredCompanies.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Enviado</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCompanies.includes(company.id)}
                          onCheckedChange={(checked) =>
                            handleSelectCompany(company.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{company.sector}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="w-4 h-4 text-success" />
                          {company.revenue}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {company.sellerName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Há {company.daysAgo} dias
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(company.name)}
                            className="bg-success hover:bg-success/90"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(company.name)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredCompanies.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Nenhuma empresa encontrada
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm || sectorFilter !== "all"
                      ? "Tente ajustar os filtros"
                      : "Não há empresas aguardando aprovação no momento."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
