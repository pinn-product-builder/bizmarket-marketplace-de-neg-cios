import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { DDItemStatusBadge } from "@/components/legal/DDItemStatusBadge";
import { LegalCompletionCard } from "@/components/legal/LegalCompletionCard";
import { DocumentUploader } from "@/components/legal/DocumentUploader";
import { useToast } from "@/hooks/use-toast";
import {
  getDDChecklistByCompany,
  getDDItemsByCompany,
  getLegalDocumentsByCompany,
} from "@/lib/mock-legal-data";
import { LEGAL_DOCUMENT_TYPES, getDocumentTypeByCode } from "@/lib/legal-documents";
import { ArrowLeft, Eye, Upload as UploadIcon, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LegalDueDiligence() {
  const { id } = useParams();
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>("");

  // Mock data
  const companyId = id || "1";
  const checklist = getDDChecklistByCompany(companyId);
  const ddItems = getDDItemsByCompany(companyId);
  const documents = getLegalDocumentsByCompany(companyId);

  if (!checklist) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-6xl mx-auto">
          <Card className="border-2 border-destructive/50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Checklist não encontrado</h2>
              <p className="text-muted-foreground mb-4">
                Esta empresa ainda não possui checklist de due diligence.
              </p>
              <Button asChild>
                <Link to="/dashboard/seller/companies">Voltar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const handleUploadClick = (documentType: string) => {
    setSelectedDocType(documentType);
    setUploadDialogOpen(true);
  };

  const handleUploadComplete = () => {
    setUploadDialogOpen(false);
    toast({
      title: "Documento enviado!",
      description: "O documento será revisado pela equipe administrativa.",
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

  const selectedDocInfo = getDocumentTypeByCode(selectedDocType);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <Link
          to="/dashboard/seller/companies"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Minhas Empresas
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Due Diligence Jurídica
          </h1>
          <p className="text-muted-foreground">TechFlow Solutions</p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6 border-secondary/50 bg-secondary/5">
          <AlertCircle className="h-4 w-4 text-secondary" />
          <AlertDescription>
            Documentos aprovados aumentam a confiança de compradores e aceleram o
            processo de negociação. Complete todos os itens obrigatórios.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Status Card */}
          <div className="lg:col-span-1">
            <LegalCompletionCard checklist={checklist} />
          </div>

          {/* Documents Table */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Checklist de Documentos</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Documento</TableHead>
                      <TableHead>Obrigatório</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ddItems.map((item) => {
                      const docType = getDocumentTypeByCode(item.documentType);
                      const hasDocument = documents.some(
                        (d) => d.documentType === item.documentType
                      );

                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{docType?.name}</div>
                              {item.comment && (
                                <div className="text-xs text-destructive mt-1">
                                  └─ {item.comment}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.required ? (
                              <span className="text-xs text-destructive font-semibold">
                                Sim
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Não
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <DDItemStatusBadge status={item.status} showIcon />
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
                              {(item.status === "missing" ||
                                item.status === "rejected") && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUploadClick(item.documentType)}
                                >
                                  <UploadIcon className="w-4 h-4 mr-1" />
                                  {item.status === "rejected" ? "Re-enviar" : "Upload"}
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
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload de Documento</DialogTitle>
            <DialogDescription>
              {selectedDocInfo?.name} - {selectedDocInfo?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <DocumentUploader
              documentType={selectedDocType}
              documentName={selectedDocInfo?.name || ""}
              onUploadComplete={handleUploadComplete}
            />
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
