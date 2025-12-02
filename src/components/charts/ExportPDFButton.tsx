import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ExportPDFButtonProps {
  companies: any[];
  companyScores: any[];
  customWeights: any;
  selectedPreset: string;
  notes?: string;
}

export const ExportPDFButton = ({
  companies,
  companyScores,
  customWeights,
  selectedPreset,
  notes,
}: ExportPDFButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const captureElement = async (elementId: string): Promise<string | null> => {
    const element = document.getElementById(elementId);
    if (!element) return null;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error(`Error capturing ${elementId}:`, error);
      return null;
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    toast.info("Gerando PDF... Isso pode levar alguns segundos.");

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246); // primary color
      pdf.text("Comparação de Empresas", margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, margin, yPosition);
      yPosition += 5;
      pdf.text(`Preset utilizado: ${selectedPreset}`, margin, yPosition);
      yPosition += 10;

      // Companies info
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Empresas Comparadas:", margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(10);
      companies.forEach((company, index) => {
        pdf.text(`${index + 1}. ${company.companyName} - ${company.sector}`, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Scores
      pdf.setFontSize(14);
      pdf.text("Pontuações:", margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(10);
      companyScores.forEach((score, index) => {
        const text = `${index + 1}. ${score.companyName}: ${score.totalScore.toFixed(1)} pontos`;
        pdf.text(text, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Weights
      pdf.setFontSize(14);
      pdf.text("Pesos Customizados:", margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(10);
      const weightLabels: Record<string, string> = {
        financial: "Financeiro",
        operational: "Operacional",
        legal: "Jurídico",
      };
      Object.entries(customWeights).forEach(([key, value]) => {
        const label = weightLabels[key] || key;
        const percentage = ((value as number) * 100).toFixed(0);
        pdf.text(`${label}: ${percentage}%`, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Notes
      if (notes) {
        pdf.setFontSize(14);
        pdf.text("Notas:", margin, yPosition);
        yPosition += 7;

        pdf.setFontSize(10);
        const splitNotes = pdf.splitTextToSize(notes, contentWidth - 5);
        splitNotes.forEach((line: string) => {
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin + 5, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      }

      // Capture and add charts
      const chartsToCapture = [
        { id: "scores-section", title: "Pontuação por Categoria" },
        { id: "radar-chart", title: "Comparação Multidimensional" },
        { id: "revenue-chart", title: "Histórico de Faturamento" },
        { id: "employees-chart", title: "Histórico de Funcionários" },
      ];

      for (const chart of chartsToCapture) {
        const imageData = await captureElement(chart.id);
        if (imageData) {
          // Add new page for each chart
          pdf.addPage();
          yPosition = margin;

          pdf.setFontSize(14);
          pdf.setTextColor(0, 0, 0);
          pdf.text(chart.title, margin, yPosition);
          yPosition += 10;

          // Calculate dimensions to fit the page
          const imgWidth = contentWidth;
          const imgHeight = (contentWidth * 9) / 16; // 16:9 aspect ratio

          pdf.addImage(imageData, "PNG", margin, yPosition, imgWidth, imgHeight);
        }
      }

      // Capture and add comparison tables
      const tables = document.querySelectorAll('[data-export-table]');
      for (let i = 0; i < tables.length; i++) {
        const tableElement = tables[i] as HTMLElement;
        const imageData = await html2canvas(tableElement, {
          scale: 2,
          backgroundColor: "#ffffff",
        }).then((canvas) => canvas.toDataURL("image/png"));

        if (imageData) {
          pdf.addPage();
          yPosition = margin;

          const title = tableElement.getAttribute('data-table-title') || `Tabela ${i + 1}`;
          pdf.setFontSize(14);
          pdf.text(title, margin, yPosition);
          yPosition += 10;

          const imgWidth = contentWidth;
          const imgHeight = (contentWidth * 9) / 16;

          pdf.addImage(imageData, "PNG", margin, yPosition, imgWidth, imgHeight);
        }
      }

      // Save PDF
      const filename = `comparacao-empresas-${new Date().getTime()}.pdf`;
      pdf.save(filename);

      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="default"
      onClick={handleExport}
      disabled={isExporting || companies.length === 0}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4 mr-2" />
          Exportar PDF
        </>
      )}
    </Button>
  );
};
