import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, Building2, DollarSign, FileText, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SECTORS = [
  "Tecnologia",
  "Varejo",
  "Serviços",
  "Indústria",
  "Alimentos e Bebidas",
  "Saúde",
  "Educação",
  "Construção",
  "Outro",
];

const STATES = [
  "SP", "RJ", "MG", "ES", "BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA",
  "PA", "AP", "RR", "AM", "AC", "RO", "TO", "GO", "DF", "MT", "MS", "PR", "SC", "RS"
];

export default function CompanyWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    tradingName: "",
    sector: "",
    foundationYear: "",
    employees: "",
    locationState: "",
    locationCity: "",
    annualRevenue: "",
    askingPrice: "",
    reasonForSale: "",
    description: "",
    mainProducts: "",
    competitiveDifferentials: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Empresa cadastrada com sucesso!",
      description: "Aguarde a aprovação do administrador para publicar no marketplace.",
    });
    navigate("/dashboard/seller");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold">Informações Básicas</h3>
                <p className="text-sm text-muted-foreground">Dados gerais sobre a empresa</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Razão Social *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Ex: Tech Solutions LTDA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tradingName">Nome Fantasia</Label>
                <Input
                  id="tradingName"
                  value={formData.tradingName}
                  onChange={(e) => handleInputChange("tradingName", e.target.value)}
                  placeholder="Ex: TechSol"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">Setor *</Label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="foundationYear">Ano de Fundação *</Label>
                <Input
                  id="foundationYear"
                  type="number"
                  value={formData.foundationYear}
                  onChange={(e) => handleInputChange("foundationYear", e.target.value)}
                  placeholder="Ex: 2015"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">Número de Funcionários *</Label>
                <Input
                  id="employees"
                  type="number"
                  value={formData.employees}
                  onChange={(e) => handleInputChange("employees", e.target.value)}
                  placeholder="Ex: 50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationState">Estado *</Label>
                <Select value={formData.locationState} onValueChange={(value) => handleInputChange("locationState", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="locationCity">Cidade *</Label>
                <Input
                  id="locationCity"
                  value={formData.locationCity}
                  onChange={(e) => handleInputChange("locationCity", e.target.value)}
                  placeholder="Ex: São Paulo"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold">Dados Financeiros</h3>
                <p className="text-sm text-muted-foreground">Informações sobre faturamento e preço</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annualRevenue">Faturamento Anual (R$) *</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  value={formData.annualRevenue}
                  onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                  placeholder="Ex: 5000000"
                />
                <p className="text-xs text-muted-foreground">Informe o faturamento anual da empresa</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="askingPrice">Preço Pedido (R$) *</Label>
                <Input
                  id="askingPrice"
                  type="number"
                  value={formData.askingPrice}
                  onChange={(e) => handleInputChange("askingPrice", e.target.value)}
                  placeholder="Ex: 15000000"
                />
                <p className="text-xs text-muted-foreground">Valor desejado para a venda da empresa</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reasonForSale">Motivo da Venda *</Label>
                <Textarea
                  id="reasonForSale"
                  value={formData.reasonForSale}
                  onChange={(e) => handleInputChange("reasonForSale", e.target.value)}
                  placeholder="Explique o motivo da venda..."
                  rows={5}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold">Descrição</h3>
                <p className="text-sm text-muted-foreground">Detalhes sobre produtos e diferenciais</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Descrição da Empresa *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descreva a empresa, sua história, clientes..."
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainProducts">Principais Produtos/Serviços *</Label>
                <Textarea
                  id="mainProducts"
                  value={formData.mainProducts}
                  onChange={(e) => handleInputChange("mainProducts", e.target.value)}
                  placeholder="Liste os principais produtos e serviços oferecidos..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitiveDifferentials">Diferenciais Competitivos *</Label>
                <Textarea
                  id="competitiveDifferentials"
                  value={formData.competitiveDifferentials}
                  onChange={(e) => handleInputChange("competitiveDifferentials", e.target.value)}
                  placeholder="O que torna sua empresa única no mercado..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold">Documentos</h3>
                <p className="text-sm text-muted-foreground">Anexe os documentos necessários</p>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="w-10 h-10 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Arraste arquivos ou clique para selecionar</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, DOCX até 10MB cada
                      </p>
                    </div>
                    <Button variant="secondary" size="sm" className="mt-2">
                      Selecionar Arquivos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Documentos Recomendados:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Balanço Patrimonial</li>
                  <li>• DRE (Demonstração de Resultado)</li>
                  <li>• Contrato Social</li>
                  <li>• Certidões Negativas</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard/seller")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-heading font-bold text-primary">Cadastrar Nova Empresa</h1>
            <p className="text-muted-foreground mt-2">Preencha as informações em 4 etapas simples</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step < currentStep
                      ? "bg-success text-success-foreground"
                      : step === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? "bg-success" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <Card className="border-2">
            <CardContent className="pt-6">{renderStep()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} variant="default">
                <Check className="w-4 h-4 mr-2" />
                Finalizar Cadastro
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
