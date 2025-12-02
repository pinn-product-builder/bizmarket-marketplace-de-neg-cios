import { useState, useEffect, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getComparisonHistory,
  deleteComparisonFromHistory,
  clearComparisonHistory,
  formatTimestamp,
  ComparisonHistoryItem,
} from "@/lib/comparison-history";
import { WEIGHT_PRESETS } from "@/lib/company-scoring";
import { History, Trash2, Clock, Building2, Scale, AlertCircle, Search, Filter, X } from "lucide-react";
import { toast } from "sonner";

interface ComparisonHistoryDialogProps {
  onLoadComparison: (item: ComparisonHistoryItem) => void;
}

export const ComparisonHistoryDialog = ({ onLoadComparison }: ComparisonHistoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ComparisonHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [presetFilter, setPresetFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "oldest">("recent");

  useEffect(() => {
    if (open) {
      loadHistory();
    }
  }, [open]);

  const loadHistory = () => {
    const items = getComparisonHistory();
    setHistory(items);
  };

  // Filter and sort history
  const filteredHistory = useMemo(() => {
    let filtered = [...history];

    // Search by company name
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.companyNames.some((name) => name.toLowerCase().includes(query))
      );
    }

    // Filter by preset
    if (presetFilter !== "all") {
      filtered = filtered.filter((item) => item.presetUsed === presetFilter);
    }

    // Filter by period
    if (periodFilter !== "all") {
      const now = Date.now();
      const dayMs = 24 * 60 * 60 * 1000;
      
      filtered = filtered.filter((item) => {
        const diff = now - item.timestamp;
        
        switch (periodFilter) {
          case "today":
            return diff < dayMs;
          case "week":
            return diff < 7 * dayMs;
          case "month":
            return diff < 30 * dayMs;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return b.timestamp - a.timestamp;
      } else {
        return a.timestamp - b.timestamp;
      }
    });

    return filtered;
  }, [history, searchQuery, presetFilter, periodFilter, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPresetFilter("all");
    setPeriodFilter("all");
    setSortBy("recent");
  };

  const hasActiveFilters = searchQuery || presetFilter !== "all" || periodFilter !== "all";

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

        {/* Search and Filters */}
        {history.length > 0 && (
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por empresa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-2">
              {/* Preset Filter */}
              <Select value={presetFilter} onValueChange={setPresetFilter}>
                <SelectTrigger className="w-[180px] h-9">
                  <Filter className="w-3.5 h-3.5 mr-2" />
                  <SelectValue placeholder="Preset" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">Todos os presets</SelectItem>
                  <SelectItem value="balanced">Balanceado</SelectItem>
                  <SelectItem value="financialFocus">Foco Financeiro</SelectItem>
                  <SelectItem value="operationalFocus">Foco Operacional</SelectItem>
                  <SelectItem value="legalFocus">Foco Jurídico</SelectItem>
                  <SelectItem value="growth">Crescimento</SelectItem>
                </SelectContent>
              </Select>

              {/* Period Filter */}
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[160px] h-9">
                  <Clock className="w-3.5 h-3.5 mr-2" />
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as "recent" | "oldest")}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9"
                >
                  <X className="w-3.5 h-3.5 mr-1.5" />
                  Limpar Filtros
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {filteredHistory.length} de {history.length} {history.length === 1 ? "comparação" : "comparações"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-7 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Limpar Tudo
              </Button>
            </div>
          </div>
        )}

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
        ) : filteredHistory.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhuma comparação encontrada</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tente ajustar seus filtros de busca
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[50vh] pr-4">
              <div className="space-y-3">
                {filteredHistory.map((item) => (
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
