import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploaderProps {
  documentType: string;
  documentName: string;
  onUploadComplete?: (file: File) => void;
}

export function DocumentUploader({
  documentType,
  documentName,
  onUploadComplete,
}: DocumentUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF only for legal documents)
      if (file.type !== "application/pdf") {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas arquivos PDF.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Mock upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Upload realizado!",
      description: `${documentName} foi enviado com sucesso.`,
    });

    onUploadComplete?.(selectedFile);
    setSelectedFile(null);
    setIsUploading(false);
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor={`upload-${documentType}`} className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-colors">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {selectedFile ? selectedFile.name : "Selecionar arquivo PDF"}
              </span>
            </div>
            <Input
              id={`upload-${documentType}`}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </Label>
        </div>

        {selectedFile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {selectedFile && (
        <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
          <File className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <Button onClick={handleUpload} disabled={isUploading} size="sm">
            {isUploading ? "Enviando..." : "Upload"}
          </Button>
        </div>
      )}
    </div>
  );
}
