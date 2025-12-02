import { Link } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiskLevelBadge } from "@/components/legal/RiskLevelBadge";
import { Progress } from "@/components/ui/progress";
import { mockDDChecklists } from "@/lib/mock-legal-data";
import { Eye, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function LegalDashboard() {
  // Mock companies data
  const companies = [
    {
      id: "1",
      name: "TechFlow Solutions",
      sector: "Tecnologia",
      checklist: mockDDChecklists[0],
    },
    {
      id: "2",
      name: "DataCorp Analytics",
      sector: "Tecnologia",
      checklist: mockDDChecklists[1],
    },
  ];

  const totalCompanies = companies.length;
  const avgCompletion =
    companies.reduce((acc, c) => acc + (c.checklist?.completionPercentage || 0), 0) /
    totalCompanies;
  const companiesWithRisk = companies.filter(
    (c) => c.checklist?.riskLevel === "medium" || c.checklist?.riskLevel === "high"
  ).length;
  const companiesComplete = companies.filter(
    (c) => (c.checklist?.completionPercentage || 0) >= 80
  ).length;

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Revisão Legal</h1>
          <p className="text-muted-foreground">
            Gerencie a due diligence jurídica das empresas cadastradas
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de Empresas</p>
                  <p className="text-3xl font-bold">{totalCompanies}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Média de Completude</p>
                  <p className="text-3xl font-bold">{Math.round(avgCompletion)}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Com Risco</p>
                  <p className="text-3xl font-bold">{companiesWithRisk}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completas (≥80%)</p>
                  <p className="text-3xl font-bold">{companiesComplete}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Table */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Empresas Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Completude</TableHead>
                  <TableHead>Nível de Risco</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="font-medium">{company.name}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {company.sector}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress
                          value={company.checklist?.completionPercentage || 0}
                          className="w-24 h-2"
                        />
                        <span className="text-sm font-medium">
                          {company.checklist?.completionPercentage || 0}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RiskLevelBadge level={company.checklist?.riskLevel || "unknown"} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/dashboard/admin/companies/${company.id}/legal`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Revisar
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
