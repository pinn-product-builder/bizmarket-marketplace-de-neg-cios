import { Card, CardContent } from "./card";
import { Button } from "./button";
import { AIBadge } from "./ai-badge";
import { Check, X } from "lucide-react";

interface AISuggestionCardProps {
  suggestion: string;
  onAccept: () => void;
  onReject: () => void;
  loading?: boolean;
}

export const AISuggestionCard = ({
  suggestion,
  onAccept,
  onReject,
  loading,
}: AISuggestionCardProps) => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <AIBadge className="mt-1" />
          <div className="flex-1">
            <p className="text-sm text-foreground whitespace-pre-wrap">{suggestion}</p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="default"
                onClick={onAccept}
                disabled={loading}
                className="gap-1"
              >
                <Check className="w-3 h-3" />
                Usar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onReject}
                disabled={loading}
                className="gap-1"
              >
                <X className="w-3 h-3" />
                Ignorar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
