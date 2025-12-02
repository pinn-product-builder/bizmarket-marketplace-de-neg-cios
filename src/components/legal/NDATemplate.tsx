import { Card, CardContent } from "@/components/ui/card";
import { NDA_TEMPLATE } from "@/lib/legal-documents";

export function NDATemplate() {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed text-foreground">
            {NDA_TEMPLATE}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
