import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  getComparisonHistory,
  deleteComparisonFromHistory,
  clearComparisonHistory,
  formatTimestamp,
  ComparisonHistoryItem,
} from "@/lib/comparison-history";
import { History, Trash2, Clock, Building2, Scale, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ComparisonHistoryDialogProps {
  onLoadComparison: (item: ComparisonHistoryItem) => void;
}

export const ComparisonHistoryDialog = ({ onLoadComparison }: ComparisonHistoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ComparisonHistoryItem[]>([]);

  useEffect(() => {
    if (open) {
      loadHistory();
    }
  }, [open]);

  const loadHistory = () => {
    const items = getComparisonHistory();
    setHistory(items);
  };

  const handleLoadComparison = (item: ComparisonHistoryItem) => {
    onLoadComparison(item);
    setOpen(false);
    toast.success("Comparação carregada com sucesso!");
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteComparisonFromHistory(id);
    loadHistory();
    toast.success("Comparação removida do histórico");
  };

  const handleClearAll = () => {
    if (window.confirm("Tem certeza que deseja limpar todo o histórico?")) {
      clearComparisonHistory();
      loadHistory();
      toast.success("Histórico limpo com sucesso");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="w-4 h-4 mr-2" />
          Histórico
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Histórico de Comparações
          </DialogTitle>
          <DialogDescription>
            Revisitar análises anteriores com as mesmas configurações
          </DialogDescription>
        </DialogHeader>

        {history.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <History className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhuma comparação salva</h3>
            <p className="text-sm text-muted-foreground">
              Suas comparações futuras aparecerão aqui automaticamente
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Limpar Tudo
              </Button>
            </div>

            <ScrollArea className="h-[50vh] pr-4">
              <div className="space-y-3">
                {history.map((item) => (
                  <Card
                    key={item.id}
                    className="cursor-pointer hover:border-primary transition-all hover:shadow-md"
                    onClick={() => handleLoadComparison(item)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          {/* Timestamp */}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            {formatTimestamp(item.timestamp)}
                          </div>

                          {/* Companies */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <Building2 className="w-3.5 h-3.5" />
                              Empresas ({item.companyNames.length}):
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.companyNames.map((name, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {name}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Weights */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                              <Scale className="w-3.5 h-3.5" />
                              Pesos:
                            </div>
                            <div className="flex gap-3 text-xs">
                              <span>
                                Fin: <strong>{Math.round(item.weights.financial * 100)}%</strong>
                              </span>
                              <span>
                                Op: <strong>{Math.round(item.weights.operational * 100)}%</strong>
                              </span>
                              <span>
                                Jur: <strong>{Math.round(item.weights.legal * 100)}%</strong>
                              </span>
                            </div>
                          </div>

                          {/* Preset badge if used */}
                          {item.presetUsed && (
                            <Badge variant="outline" className="text-xs">
                              Preset: {item.presetUsed}
                            </Badge>
                          )}
                        </div>

                        {/* Delete button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={(e) => handleDelete(item.id, e)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-2" />
            
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <p>
                Clique em uma comparação para carregar as empresas e pesos utilizados.
                O histórico é salvo localmente no seu navegador.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
