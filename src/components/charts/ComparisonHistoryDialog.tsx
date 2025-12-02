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
  updateComparisonNotes,
  updateComparisonTags,
  formatTimestamp,
  ComparisonHistoryItem,
} from "@/lib/comparison-history";
import { WEIGHT_PRESETS } from "@/lib/company-scoring";
import { History, Trash2, Clock, Building2, Scale, AlertCircle, Search, Filter, X, FileText, Edit2, Check, Tag, Plus } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface ComparisonHistoryDialogProps {
  onLoadComparison: (item: ComparisonHistoryItem) => void;
}

export const ComparisonHistoryDialog = ({ onLoadComparison }: ComparisonHistoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ComparisonHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [presetFilter, setPresetFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "oldest">("recent");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [editingNotesText, setEditingNotesText] = useState("");
  const [editingTagsId, setEditingTagsId] = useState<string | null>(null);
  const [editingTagsText, setEditingTagsText] = useState("");
  const [newTagInput, setNewTagInput] = useState<string>("");

  useEffect(() => {
    if (open) {
      loadHistory();
    }
  }, [open]);

  const loadHistory = () => {
    const items = getComparisonHistory();
    setHistory(items);
  };

  // Get all unique tags from history
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    history.forEach((item) => {
      item.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [history]);

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

    // Filter by tag
    if (tagFilter !== "all") {
      filtered = filtered.filter((item) => 
        item.tags?.includes(tagFilter)
      );
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
  }, [history, searchQuery, presetFilter, tagFilter, periodFilter, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPresetFilter("all");
    setPeriodFilter("all");
    setTagFilter("all");
    setSortBy("recent");
  };

  const hasActiveFilters = searchQuery || presetFilter !== "all" || periodFilter !== "all" || tagFilter !== "all";

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

  const handleStartEditingNotes = (item: ComparisonHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNotesId(item.id);
    setEditingNotesText(item.notes || "");
  };

  const handleSaveNotes = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateComparisonNotes(id, editingNotesText.trim());
    loadHistory();
    setEditingNotesId(null);
    setEditingNotesText("");
    toast.success("Nota salva com sucesso");
  };

  const handleCancelEditingNotes = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNotesId(null);
    setEditingNotesText("");
  };

  const handleStartEditingTags = (item: ComparisonHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTagsId(item.id);
    setNewTagInput("");
  };

  const handleAddTag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newTagInput.trim()) return;

    const item = history.find((h) => h.id === id);
    if (!item) return;

    const currentTags = item.tags || [];
    const trimmedTag = newTagInput.trim().toLowerCase();
    
    if (!currentTags.includes(trimmedTag)) {
      const updatedTags = [...currentTags, trimmedTag];
      updateComparisonTags(id, updatedTags);
      loadHistory();
      setNewTagInput("");
      toast.success("Tag adicionada");
    } else {
      toast.info("Tag já existe");
    }
  };

  const handleRemoveTag = (id: string, tagToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const item = history.find((h) => h.id === id);
    if (!item) return;

    const updatedTags = (item.tags || []).filter((tag) => tag !== tagToRemove);
    updateComparisonTags(id, updatedTags);
    loadHistory();
    toast.success("Tag removida");
  };

  const handleCancelEditingTags = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTagsId(null);
    setNewTagInput("");
  };

  const handleTagFilterClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTagFilter(tag);
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

              {/* Tag Filter */}
              {allTags.length > 0 && (
                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger className="w-[160px] h-9">
                    <Tag className="w-3.5 h-3.5 mr-2" />
                    <SelectValue placeholder="Tag" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="all">Todas as tags</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

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

                          {/* Tags section */}
                          {editingTagsId === item.id ? (
                            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                <Tag className="w-3.5 h-3.5" />
                                Tags:
                              </div>
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {(item.tags || []).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs gap-1 cursor-pointer hover:bg-destructive/10"
                                  >
                                    {tag}
                                    <X
                                      className="w-3 h-3"
                                      onClick={(e) => handleRemoveTag(item.id, tag, e)}
                                    />
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={newTagInput}
                                  onChange={(e) => setNewTagInput(e.target.value)}
                                  placeholder="Nova tag..."
                                  className="h-8 text-xs"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddTag(item.id, e as any);
                                    }
                                  }}
                                  autoFocus
                                />
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={(e) => handleAddTag(item.id, e)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleCancelEditingTags}
                                  className="h-8 text-xs"
                                >
                                  Fechar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {item.tags && item.tags.length > 0 && (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <Tag className="w-3.5 h-3.5" />
                                    Tags:
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {item.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                        onClick={(e) => handleTagFilterClick(tag, e)}
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          {/* Notes section */}
                          {editingNotesId === item.id ? (
                            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                <FileText className="w-3.5 h-3.5" />
                                Nota:
                              </div>
                              <Textarea
                                value={editingNotesText}
                                onChange={(e) => setEditingNotesText(e.target.value)}
                                placeholder="Adicione observações importantes..."
                                className="min-h-[80px] text-xs"
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={(e) => handleSaveNotes(item.id, e)}
                                  className="h-7 text-xs"
                                >
                                  <Check className="w-3 h-3 mr-1" />
                                  Salvar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleCancelEditingNotes}
                                  className="h-7 text-xs"
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {item.notes && (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <FileText className="w-3.5 h-3.5" />
                                    Nota:
                                  </div>
                                  <p className="text-xs text-foreground/80 bg-muted/50 p-2 rounded">
                                    {item.notes}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => handleStartEditingTags(item, e)}
                            title={item.tags && item.tags.length > 0 ? "Editar tags" : "Adicionar tags"}
                          >
                            <Tag className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => handleStartEditingNotes(item, e)}
                            title={item.notes ? "Editar nota" : "Adicionar nota"}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => handleDelete(item.id, e)}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </Button>
                        </div>
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
