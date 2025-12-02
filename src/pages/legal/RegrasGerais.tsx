import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export default function RegrasGerais() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 pt-28 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/legal/regras-gerais" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Regras Gerais</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-4">Regras Gerais de Uso</h1>
          <p className="text-muted-foreground mb-8">Última atualização: 01 de dezembro de 2024</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">1. Aceitação das Regras</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao utilizar a plataforma BizMarket, você concorda em cumprir estas regras gerais de uso. 
                Caso não concorde com qualquer disposição aqui presente, você não deve utilizar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">2. Regras de Conduta</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-xl font-semibold text-foreground">2.1 Para Vendedores</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer informações verdadeiras e precisas sobre suas empresas</li>
                  <li>Manter os documentos legais e financeiros atualizados</li>
                  <li>Responder prontamente às solicitações de due diligence</li>
                  <li>Não ocultar informações relevantes que possam afetar a decisão de compra</li>
                  <li>Respeitar os acordos de confidencialidade (NDAs) estabelecidos</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6">2.2 Para Compradores</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Conduzir negociações de boa-fé</li>
                  <li>Respeitar os acordos de confidencialidade assinados</li>
                  <li>Não utilizar informações confidenciais para fins não autorizados</li>
                  <li>Realizar due diligence adequada antes de fechar negócios</li>
                  <li>Cumprir com os prazos e compromissos assumidos</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">3. Responsabilidades das Partes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">3.1 Responsabilidade do BizMarket:</strong> 
                  O BizMarket atua como intermediário, fornecendo a plataforma tecnológica que conecta 
                  vendedores e compradores. Não somos responsáveis pela qualidade, legalidade ou 
                  veracidade das informações fornecidas pelos usuários.
                </p>
                <p>
                  <strong className="text-foreground">3.2 Responsabilidade dos Usuários:</strong> 
                  Cada usuário é responsável por suas próprias ações, informações fornecidas e 
                  decisões de negócio tomadas através da plataforma.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">4. Proibições</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>É expressamente proibido:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer informações falsas ou enganosas</li>
                  <li>Utilizar a plataforma para atividades ilegais ou fraudulentas</li>
                  <li>Violar acordos de confidencialidade estabelecidos</li>
                  <li>Fazer uso inadequado de informações confidenciais</li>
                  <li>Tentar acessar contas ou dados de outros usuários</li>
                  <li>Copiar, modificar ou distribuir conteúdo da plataforma sem autorização</li>
                  <li>Interferir no funcionamento adequado da plataforma</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">5. Penalidades</h2>
              <p className="text-muted-foreground leading-relaxed">
                O descumprimento destas regras pode resultar em: advertências, suspensão temporária 
                ou permanente da conta, remoção de anúncios, e em casos graves, ações legais cabíveis. 
                O BizMarket reserva-se o direito de tomar as medidas necessárias para proteger a 
                integridade da plataforma e seus usuários.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">6. Processo de Disputa</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Em caso de disputas entre usuários, recomendamos inicialmente buscar uma solução 
                  amigável através de comunicação direta. Caso não seja possível, o BizMarket pode 
                  atuar como mediador, mas não garante a resolução de conflitos.
                </p>
                <p>
                  Para disputas que não possam ser resolvidas através da plataforma, as partes 
                  devem buscar resolução através dos meios legais apropriados.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">7. Modificações</h2>
              <p className="text-muted-foreground leading-relaxed">
                O BizMarket reserva-se o direito de modificar estas regras a qualquer momento. 
                Usuários serão notificados sobre mudanças significativas e o uso continuado da 
                plataforma após tais mudanças constituirá aceitação das novas regras.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">8. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para dúvidas sobre estas regras ou para reportar violações, entre em contato através 
                de <a href="mailto:contato@bizmarket.com" className="text-primary hover:underline">contato@bizmarket.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
