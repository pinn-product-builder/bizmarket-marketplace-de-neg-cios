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
  Eye,
  BadgeCheck,
  Megaphone,
  Rocket,
  CreditCard,
  Star,
  Quote,
} from "lucide-react";

// Stats atualizados para refletir exposição, não transações
const stats = [
  { value: "500+", label: "Anúncios Ativos" },
  { value: "50k+", label: "Visualizações/mês" },
  { value: "1,200+", label: "Compradores Cadastrados" },
  { value: "98%", label: "Anúncios Aprovados" },
];

// Como funciona para Vendedores
const howItWorksSellers = [
  {
    icon: Building2,
    title: "Cadastre seu Negócio",
    description: "Informe o CNPJ e dados básicos. Validamos automaticamente a regularidade fiscal.",
  },
  {
    icon: CreditCard,
    title: "Assine e Seja Aprovado",
    description: "Escolha seu plano mensal. Nossa equipe revisa e aprova seu anúncio.",
  },
  {
    icon: MessageSquare,
    title: "Receba Interessados",
    description: "Compradores entram em contato diretamente. Você negocia com autonomia.",
  },
];

// Como funciona para Compradores
const howItWorksBuyers = [
  {
    icon: Search,
    title: "Explore Gratuitamente",
    description: "Navegue por centenas de negócios à venda. Filtre por setor, região e faturamento.",
  },
  {
    icon: Star,
    title: "Assine para Mais Acesso",
    description: "Desbloqueie dados detalhados, comparações e contato direto com vendedores.",
  },
  {
    icon: CheckCircle2,
    title: "Entre em Contato",
    description: "Converse diretamente com o vendedor e conduza sua negociação.",
  },
];

// Benefícios atualizados e alinhados ao escopo
const benefits = [
  { 
    icon: Eye, 
    title: "Visibilidade Garantida", 
    description: "Seu negócio visto por milhares de investidores e compradores ativos" 
  },
  { 
    icon: BadgeCheck, 
    title: "CNPJ Validado", 
    description: "Apenas empresas com situação fiscal regular são anunciadas" 
  },
  { 
    icon: Shield, 
    title: "Curadoria de Qualidade", 
    description: "Todos os anúncios são revisados pela nossa equipe antes da publicação" 
  },
  { 
    icon: Megaphone, 
    title: "Impulsionamento", 
    description: "Destaque seu anúncio para aparecer no topo e receber mais contatos" 
  },
];

// Depoimentos mock
const testimonials = [
  {
    quote: "Recebi 15 contatos qualificados no primeiro mês. A plataforma realmente entrega visibilidade.",
    author: "Carlos M.",
    role: "Vendedor - Restaurante em SP",
  },
  {
    quote: "Encontrei a empresa perfeita para expandir meu grupo. A ferramenta de comparação foi decisiva.",
    author: "Ana Paula R.",
    role: "Investidora",
  },
  {
    quote: "Processo simples e transparente. Em uma semana meu anúncio já estava no ar.",
    author: "Roberto S.",
    role: "Vendedor - E-commerce",
  },
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
      <DisclaimerBanner dismissible={false} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 hero-gradient overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-success/20 blur-[100px] rounded-full" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-white mb-6">
              Anuncie ou Encontre Negócios à Venda
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-4 font-body leading-relaxed">
              A maior vitrine de empresas à venda do Brasil. Conectamos vendedores a compradores interessados através de anúncios qualificados.
            </p>
            <p className="text-lg text-white/70 mb-8">
              Mais de 1.200 compradores buscando oportunidades todos os meses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/auth/signup?type=seller">
                <Button variant="hero" size="lg" className="text-lg font-semibold">
                  Quero Anunciar
                  <Megaphone className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="secondary" size="lg" className="text-lg font-semibold">
                  Explorar Negócios
                  <Search className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
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

      {/* Para Quem É - Two Column Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Para Quem É o BizMarket?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma pensada tanto para quem quer vender quanto para quem busca investir
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card Vendedores */}
            <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">Para Vendedores</h3>
                <p className="text-muted-foreground mb-6">
                  Quer vender seu negócio? Anuncie na maior vitrine de empresas do Brasil.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Anuncie a partir de R$ 99/mês</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>CNPJ validado automaticamente</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Receba contatos de interessados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Impulsione para mais visibilidade</span>
                  </li>
                </ul>
                <Link to="/auth/signup?type=seller">
                  <Button variant="default" size="lg" className="w-full">
                    Anunciar Minha Empresa
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Card Compradores */}
            <Card className="border-2 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-secondary">Para Compradores</h3>
                <p className="text-muted-foreground mb-6">
                  Buscando oportunidades de aquisição? Explore centenas de negócios.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Explore anúncios gratuitamente</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Assine para contato direto</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Compare empresas lado a lado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span>Análises com IA para decisões</span>
                  </li>
                </ul>
                <Link to="/marketplace">
                  <Button variant="secondary" size="lg" className="w-full">
                    Explorar Negócios
                    <Search className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Vendedores */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Como Funciona</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Processos simples e transparentes para vendedores e compradores
            </p>
          </div>

          {/* Para Vendedores */}
          <div className="mb-16">
            <h3 className="text-xl font-heading font-semibold text-center mb-8 text-primary">
              <Building2 className="w-5 h-5 inline mr-2" />
              Para Vendedores
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {howItWorksSellers.map((step, index) => (
                <Card key={index} className="relative border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-2">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-heading font-semibold mb-3">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Para Compradores */}
          <div>
            <h3 className="text-xl font-heading font-semibold text-center mb-8 text-secondary">
              <Users className="w-5 h-5 inline mr-2" />
              Para Compradores
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {howItWorksBuyers.map((step, index) => (
                <Card key={index} className="relative border-2 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 mt-2">
                      <step.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h4 className="text-xl font-heading font-semibold mb-3">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Anúncios em Destaque</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Confira algumas das oportunidades disponíveis na plataforma
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
                Ver Todos os Anúncios
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">Por Que Anunciar no BizMarket?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Credibilidade e visibilidade para seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-success/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-success" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary mb-4">O Que Dizem Nossos Usuários</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias de quem já utilizou a plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-secondary/30 mb-4" />
                  <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-secondary font-semibold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-primary mb-4">Planos Acessíveis</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Comece a anunciar ou tenha acesso premium com planos que cabem no seu bolso
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-primary/30">
                <CardContent className="p-6 text-center">
                  <Building2 className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-heading font-bold text-lg mb-2">Vendedores</h3>
                  <p className="text-3xl font-bold text-primary mb-2">R$ 99<span className="text-base font-normal">/mês</span></p>
                  <p className="text-sm text-muted-foreground">Anuncie sua empresa e receba interessados</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-secondary/30">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-10 h-10 text-secondary mx-auto mb-3" />
                  <h3 className="font-heading font-bold text-lg mb-2">Compradores</h3>
                  <p className="text-3xl font-bold text-secondary mb-2">R$ 49<span className="text-base font-normal">/mês</span></p>
                  <p className="text-sm text-muted-foreground">Acesso a dados completos e contato direto</p>
                </CardContent>
              </Card>
            </div>

            <Link to="/pricing">
              <Button variant="outline" size="lg">
                Ver Todos os Planos
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Rocket className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-white mb-6">
              Comece Hoje Mesmo
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Vendedores: anuncie sua empresa e alcance milhares de interessados.<br />
              Compradores: explore oportunidades e encontre o negócio ideal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup?type=seller">
                <Button variant="hero" size="lg" className="text-lg font-semibold">
                  Anunciar Minha Empresa
                  <Megaphone className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg" className="text-lg font-semibold bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Explorar Negócios
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
