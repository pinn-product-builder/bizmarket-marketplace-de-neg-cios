import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Calendar,
  Download,
  Eye,
  MessageSquare,
  Heart,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-primary">Relatórios</h1>
                <p className="text-muted-foreground mt-2">
                  Análise detalhada de métricas e desempenho da plataforma
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 90 dias</SelectItem>
                    <SelectItem value="365">Último ano</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">156</div>
                <p className="text-sm text-muted-foreground mb-2">Empresas Cadastradas</p>
                <p className="text-xs text-success">+12% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="text-3xl font-bold text-secondary mb-1">1,247</div>
                <p className="text-sm text-muted-foreground mb-2">Usuários Ativos</p>
                <p className="text-xs text-success">+8% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-success" />
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="text-3xl font-bold text-success mb-1">R$ 2.5B</div>
                <p className="text-sm text-muted-foreground mb-2">Volume de Negócios</p>
                <p className="text-xs text-success">+25% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-8 h-8 text-destructive" />
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">342</div>
                <p className="text-sm text-muted-foreground mb-2">Interesses Demonstrados</p>
                <p className="text-xs text-success">+18% vs mês anterior</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Engagement Metrics */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Métricas de Engajamento</CardTitle>
                <CardDescription>Atividade dos usuários na plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium">Visualizações de Empresas</span>
                    </div>
                    <span className="text-sm font-semibold">12,456</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">85% da meta mensal</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium">Mensagens Trocadas</span>
                    </div>
                    <span className="text-sm font-semibold">8,234</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">68% da meta mensal</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-medium">Taxa de Interesse</span>
                    </div>
                    <span className="text-sm font-semibold">2.7%</span>
                  </div>
                  <Progress value={54} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">54% da meta mensal</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Empresas Aprovadas</span>
                    </div>
                    <span className="text-sm font-semibold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">94% das empresas enviadas</p>
                </div>
              </CardContent>
            </Card>

            {/* Growth Metrics */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Crescimento por Setor</CardTitle>
                <CardDescription>Empresas cadastradas por categoria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Tecnologia</span>
                    <span className="text-sm font-semibold">45 empresas</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Logística</span>
                    <span className="text-sm font-semibold">32 empresas</span>
                  </div>
                  <Progress value={53} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Saúde</span>
                    <span className="text-sm font-semibold">28 empresas</span>
                  </div>
                  <Progress value={47} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Varejo</span>
                    <span className="text-sm font-semibold">25 empresas</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Indústria</span>
                    <span className="text-sm font-semibold">26 empresas</span>
                  </div>
                  <Progress value={43} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time-based Analysis */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Análise Temporal</CardTitle>
              <CardDescription>Atividade ao longo do período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day}</div>
                    <div
                      className="h-24 bg-primary/10 rounded-lg flex items-end justify-center overflow-hidden"
                      style={{ height: "96px" }}
                    >
                      <div
                        className="w-full bg-primary transition-all"
                        style={{
                          height: `${Math.random() * 70 + 30}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs font-semibold mt-2">
                      {Math.floor(Math.random() * 50 + 10)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
