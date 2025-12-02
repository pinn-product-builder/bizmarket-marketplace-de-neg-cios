import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { DDItemStatusBadge } from "@/components/legal/DDItemStatusBadge";
import { RiskLevelBadge } from "@/components/legal/RiskLevelBadge";
import { useToast } from "@/hooks/use-toast";
import {
  getDDChecklistByCompany,
  getDDItemsByCompany,
  getLegalDocumentsByCompany,
} from "@/lib/mock-legal-data";
import { getDocumentTypeByCode } from "@/lib/legal-documents";
import { RiskLevel } from "@/types/legal";
import { ArrowLeft, Eye, CheckCircle, XCircle, AlertCircle, Building2, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function LegalReview() {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock data
  const companyId = id || "1";
  const checklist = getDDChecklistByCompany(companyId);
  const ddItems = getDDItemsByCompany(companyId);
  const documents = getLegalDocumentsByCompany(companyId);

  const [riskLevel, setRiskLevel] = useState<RiskLevel>(checklist?.riskLevel || "unknown");
  const [notes, setNotes] = useState(checklist?.notes || "");
  const [itemComments, setItemComments] = useState<Record<string, string>>({});
  const [itemStatuses, setItemStatuses] = useState<Record<string, string>>({});

  if (!checklist) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-6xl mx-auto">
          <Card className="border-2 border-destructive/50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Empresa não encontrada</h2>
              <Button asChild>
                <Link to="/dashboard/admin/legal">Voltar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const handleApprove = (itemId: string) => {
    setItemStatuses((prev) => ({ ...prev, [itemId]: "approved" }));
    toast({
      title: "Documento aprovado",
      description: "O status foi atualizado.",
    });
  };

  const handleReject = (itemId: string) => {
    if (!itemComments[itemId]?.trim()) {
      toast({
        title: "Comentário obrigatório",
        description: "Por favor, adicione um comentário explicando a rejeição.",
        variant: "destructive",
      });
      return;
    }
    setItemStatuses((prev) => ({ ...prev, [itemId]: "rejected" }));
    toast({
      title: "Documento rejeitado",
      description: "O vendedor será notificado.",
      variant: "destructive",
    });
  };

  const handleSave = () => {
    toast({
      title: "Alterações salvas!",
      description: "A revisão legal foi atualizada com sucesso.",
    });
  };

  const handleViewDocument = (documentType: string) => {
    const doc = documents.find((d) => d.documentType === documentType);
    if (doc) {
      toast({
        title: "Visualizar documento",
        description: `Abrindo ${doc.fileName}...`,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <Link
          to="/dashboard/admin/legal"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">Revisão Legal</h1>
          <p className="text-muted-foreground">TechFlow Solutions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Completude
                </span>
              </div>
              <div className="space-y-2">
                <Progress value={checklist.completionPercentage} className="h-2" />
                <p className="text-2xl font-bold">{checklist.completionPercentage}%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <Label className="text-sm font-medium mb-2 block">Nível de Risco</Label>
              <Select value={riskLevel} onValueChange={(value) => setRiskLevel(value as RiskLevel)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unknown">Não Avaliado</SelectItem>
                  <SelectItem value="low">Baixo Risco</SelectItem>
                  <SelectItem value="medium">Risco Médio</SelectItem>
                  <SelectItem value="high">Alto Risco</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-secondary" />
                <div>
                  <span className="text-sm font-medium text-muted-foreground block">
                    Vendedor
                  </span>
                  <p className="font-semibold">João Silva</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Review */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle>Documentos para Revisão</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comentário</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ddItems.map((item) => {
                  const docType = getDocumentTypeByCode(item.documentType);
                  const hasDocument = documents.some(
                    (d) => d.documentType === item.documentType
                  );
                  const currentStatus = itemStatuses[item.id] || item.status;

                  if (currentStatus === "missing") return null;

                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{docType?.name}</div>
                      </TableCell>
                      <TableCell>
                        <DDItemStatusBadge status={currentStatus as any} showIcon />
                      </TableCell>
                      <TableCell>
                        <Textarea
                          placeholder="Adicionar comentário..."
                          value={itemComments[item.id] || item.comment || ""}
                          onChange={(e) =>
                            setItemComments((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          rows={2}
                          className="text-sm"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {hasDocument && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDocument(item.documentType)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          {currentStatus !== "approved" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(item.id)}
                              className="text-success hover:text-success"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Aprovar
                            </Button>
                          )}
                          {currentStatus !== "rejected" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Rejeitar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Internal Notes */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle>Notas Internas</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Adicione observações sobre a due diligence desta empresa..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave}>
            Salvar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
