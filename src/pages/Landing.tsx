import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "@/components/CompanyCard";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import {
  Building2,
  Search,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// Mock data
const stats = [
  { value: "500+", label: "Empresas Cadastradas" },
  { value: "R$ 2.5B", label: "Valor em Negociações" },
  { value: "1,200+", label: "Investidores Ativos" },
  { value: "95%", label: "Taxa de Satisfação" },
];

const howItWorks = [
  {
    icon: Building2,
    title: "Cadastre sua Empresa",
    description: "Vendedores criam perfis detalhados com informações financeiras e documentação completa.",
  },
  {
    icon: Search,
    title: "Explore Oportunidades",
    description: "Compradores filtram e encontram empresas que atendem seus critérios de investimento.",
  },
  {
    icon: MessageSquare,
    title: "Conecte-se e Negocie",
    description: "Demonstre interesse e negocie diretamente através de nossa plataforma segura.",
  },
];

const benefits = [
  { icon: Shield, title: "Segurança Total", description: "Verificação completa de documentos e identidade" },
  { icon: TrendingUp, title: "Análise de Mercado", description: "Insights e dados para decisões informadas" },
  { icon: Users, title: "Suporte Dedicado", description: "Equipe especializada disponível 24/7" },
];

const featuredCompanies = [
  {
    id: "1",
    companyName: "TechFlow Solutions",
    sector: "Tecnologia",
    location: "São Paulo, SP",
    revenue: "R$ 5M/ano",
    employees: 45,
    description: "Empresa de desenvolvimento de software B2B com base de clientes consolidada e crescimento sustentável.",
  },
  {
    id: "2",
    companyName: "EcoGreen Logistics",
    sector: "Logística",
    location: "Rio de Janeiro, RJ",
    revenue: "R$ 12M/ano",
    employees: 120,
    description: "Rede de logística sustentável com frota própria e contratos de longo prazo com grandes varejistas.",
  },
  {
    id: "3",
    companyName: "Bella Vita Café",
    sector: "Alimentação",
    location: "Belo Horizonte, MG",
    revenue: "R$ 3M/ano",
    employees: 35,
    description: "Rede de cafeterias premium com 5 unidades próprias e modelo de franquia em expansão.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DisclaimerBanner />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 hero-gradient overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-success/20 blur-[100px] rounded-full" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-white mb-6">
              Compre ou Venda Empresas com Segurança
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 font-body leading-relaxed">
              O marketplace mais confiável do Brasil para conectar vendedores de empresas com investidores qualificados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/auth/signup?type=seller">
                <Button variant="hero" size="lg" className="text-lg font-semibold">
                  Quero Vender
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth/signup?type=buyer">
                <Button variant="secondary" size="lg" className="text-lg font-semibold">
                  Quero Investir
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Como Funciona</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e transparente em 3 etapas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <Card key={index} className="relative border-2 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 mt-2">
                    <step.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Empresas em Destaque</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore algumas das melhores oportunidades disponíveis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {featuredCompanies.map((company) => (
              <CompanyCard key={company.id} {...company} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/marketplace">
              <Button variant="secondary" size="lg">
                Ver Todas as Empresas
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Por Que Escolher o BizMarket?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologia e expertise para negociações seguras
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-success/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white mb-6">
              Pronto Para Começar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empreendedores e investidores que confiam no BizMarket
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button variant="hero" size="lg" className="text-lg font-semibold">
                  Criar Conta Gratuita
                  <CheckCircle2 className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg" className="text-lg font-semibold bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Explorar Empresas
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}