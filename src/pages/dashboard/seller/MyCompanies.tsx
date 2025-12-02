import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
  Search,
  MoreVertical,
  Edit,
  Pause,
  Play,
  Trash2,
  Scale,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getDDChecklistByCompany } from "@/lib/mock-legal-data";

const mockCompanies = [
  {
    id: "1",
    name: "TechFlow Solutions",
    sector: "Tecnologia",
    status: "active",
    views: 342,
    interests: 8,
    revenue: "R$ 5M/ano",
    createdAt: "2024-10-15",
  },
  {
    id: "2",
    name: "EcoGreen Logistics",
    sector: "Logística",
    status: "pending",
    views: 0,
    interests: 0,
    revenue: "R$ 12M/ano",
    createdAt: "2024-11-29",
  },
  {
    id: "3",
    name: "DataCore Analytics",
    sector: "Tecnologia",
    status: "active",
    views: 189,
    interests: 3,
    revenue: "R$ 3.5M/ano",
    createdAt: "2024-09-20",
  },
  {
    id: "5",
    name: "CloudSys Infrastructure",
    sector: "Tecnologia",
    status: "paused",
    views: 127,
    interests: 1,
    revenue: "R$ 8M/ano",
    createdAt: "2024-08-10",
  },
];

export default function MyCompanies() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = mockCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "active")
      return (
        <Badge variant="default" className="bg-success hover:bg-success">
          Ativa
        </Badge>
      );
    if (status === "pending")
      return (
        <Badge variant="secondary" className="bg-warning hover:bg-warning">
          Pendente
        </Badge>
      );
    return (
      <Badge variant="outline" className="bg-muted">
        Pausada
      </Badge>
    );
  };

  const handlePause = (companyName: string) => {
    toast({
      title: "Empresa pausada",
      description: `${companyName} foi pausada e não aparecerá no marketplace.`,
    });
  };

  const handleActivate = (companyName: string) => {
    toast({
      title: "Empresa ativada",
      description: `${companyName} foi ativada e está visível no marketplace.`,
    });
  };

  const handleDelete = (companyName: string) => {
    toast({
      title: "Empresa removida",
      description: `${companyName} foi removida do sistema.`,
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
                Minhas Empresas
              </h1>
              <p className="text-lg text-muted-foreground">
                Gerencie todas as suas empresas cadastradas
              </p>
            </div>
            <Link to="/dashboard/seller/companies/new">
              <Button variant="default" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Nova Empresa
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {mockCompanies.length}
                    </div>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Play className="w-8 h-8 text-success" />
                  <div>
                    <div className="text-2xl font-bold text-success">
                      {mockCompanies.filter((c) => c.status === "active").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Ativas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-8 h-8 text-secondary" />
                  <div>
                    <div className="text-2xl font-bold text-secondary">
                      {mockCompanies.reduce((sum, c) => sum + c.views, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Visualizações</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-accent" />
                  <div>
                    <div className="text-2xl font-bold text-accent">
                      {mockCompanies.reduce((sum, c) => sum + c.interests, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Interessados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-6 border-2">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Companies Table */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visualizações</TableHead>
                    <TableHead>Interessados</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{company.sector}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(company.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          {company.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          {company.interests}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="w-4 h-4 text-success" />
                          {company.revenue}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/dashboard/seller/companies/${company.id}/legal`}>
                                <Scale className="w-4 h-4 mr-2" />
                                Due Diligence
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            {company.interests > 0 && (
                              <DropdownMenuItem>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ver Interessados ({company.interests})
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {company.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() => handlePause(company.name)}
                              >
                                <Pause className="w-4 h-4 mr-2" />
                                Pausar
                              </DropdownMenuItem>
                            ) : company.status === "paused" ? (
                              <DropdownMenuItem
                                onClick={() => handleActivate(company.name)}
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Ativar
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(company.name)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredCompanies.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Nenhuma empresa encontrada
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm
                      ? "Tente ajustar sua busca"
                      : "Você ainda não cadastrou nenhuma empresa"}
                  </p>
                  {!searchTerm && (
                    <Link to="/dashboard/seller/companies/new">
                      <Button variant="default">
                        <Plus className="w-4 h-4 mr-2" />
                        Cadastrar Primeira Empresa
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
