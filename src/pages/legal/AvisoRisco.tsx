import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AvisoRisco() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 pt-28 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/legal/aviso-risco" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Aviso de Risco</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10 text-destructive" />
            <h1 className="text-4xl font-heading font-bold">Aviso de Risco</h1>
          </div>
          <p className="text-muted-foreground mb-8">Última atualização: 01 de dezembro de 2024</p>

          <Alert className="mb-8 border-destructive">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-base">
              <strong>ATENÇÃO:</strong> A compra e venda de empresas envolve riscos significativos. 
              Leia atentamente este aviso antes de realizar qualquer transação através da plataforma BizMarket.
            </AlertDescription>
          </Alert>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">1. Natureza do Investimento</h2>
              <p className="text-muted-foreground leading-relaxed">
                A aquisição de empresas constitui um investimento de alto risco. O valor investido pode 
                variar significativamente, incluindo a possibilidade de perda total do capital investido. 
                Investimentos em empresas não são adequados para todos os perfis de investidores.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">2. Principais Riscos Envolvidos</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Risco de Mercado</h3>
                  <p>
                    As condições de mercado podem afetar significativamente o desempenho e o valor da 
                    empresa adquirida. Mudanças econômicas, concorrência e tendências de setor podem 
                    impactar negativamente os resultados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Risco Operacional</h3>
                  <p>
                    Desafios na gestão, operação e integração da empresa adquirida podem resultar em 
                    perdas financeiras. A continuidade dos negócios não é garantida após a aquisição.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Risco Financeiro</h3>
                  <p>
                    As informações financeiras fornecidas pelos vendedores podem não refletir completamente 
                    a realidade econômica da empresa. Passivos ocultos, contingências e obrigações não 
                    divulgadas podem existir.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.4 Risco Jurídico</h3>
                  <p>
                    Questões legais, regulatórias, trabalhistas, tributárias ou contratuais podem surgir 
                    após a aquisição, resultando em custos inesperados ou impedimentos operacionais.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.5 Risco de Liquidez</h3>
                  <p>
                    A revenda de uma empresa pode ser difícil ou impossível. Não há garantia de que você 
                    conseguirá vender a empresa quando desejar ou pelo preço esperado.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.6 Risco de Informação</h3>
                  <p>
                    Apesar dos esforços de due diligence, informações incompletas, imprecisas ou 
                    fraudulentas podem ser fornecidas pelos vendedores.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">3. Ausência de Garantias</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>O BizMarket não garante:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A veracidade, precisão ou completude das informações fornecidas pelos vendedores</li>
                  <li>O desempenho futuro de qualquer empresa listada na plataforma</li>
                  <li>O retorno sobre o investimento realizado</li>
                  <li>A ausência de passivos ocultos ou contingências</li>
                  <li>A adequação de qualquer empresa específica aos seus objetivos de investimento</li>
                  <li>O sucesso de qualquer transação ou aquisição</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">4. Due Diligence Obrigatória</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">É fundamental e de sua responsabilidade realizar 
                  uma due diligence completa e profissional antes de qualquer aquisição.</strong>
                </p>
                <p>Recomendamos fortemente:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contratar assessoria jurídica especializada</li>
                  <li>Contratar assessoria contábil e financeira</li>
                  <li>Realizar auditoria completa da empresa</li>
                  <li>Verificar todos os aspectos legais, tributários e trabalhistas</li>
                  <li>Analisar contratos, ativos e passivos</li>
                  <li>Verificar a situação fiscal e tributária</li>
                  <li>Analisar o mercado e a concorrência</li>
                  <li>Avaliar a capacidade de gestão e continuidade do negócio</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">5. Responsabilidade do Investidor</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Ao utilizar a plataforma BizMarket, você reconhece e concorda que:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>É o único responsável por suas decisões de investimento</li>
                  <li>Possui conhecimento e experiência suficientes para avaliar os riscos envolvidos</li>
                  <li>Consultou profissionais qualificados conforme necessário</li>
                  <li>Tem capacidade financeira para suportar eventuais perdas</li>
                  <li>Compreende completamente os riscos descritos neste aviso</li>
                  <li>Não depende exclusivamente das informações da plataforma para suas decisões</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">6. Papel do BizMarket</h2>
              <p className="text-muted-foreground leading-relaxed">
                O BizMarket atua exclusivamente como intermediário, fornecendo uma plataforma tecnológica 
                que conecta vendedores e compradores de empresas. Não somos consultores de investimento, 
                advogados, contadores ou auditores. Não prestamos assessoria jurídica, financeira ou 
                fiscal. Não recomendamos, endossamos ou garantimos nenhuma empresa ou transação.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">7. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed">
                Em nenhuma circunstância o BizMarket, seus sócios, diretores, funcionários ou parceiros 
                serão responsáveis por quaisquer perdas, danos ou prejuízos (diretos, indiretos, 
                incidentais, especiais ou consequenciais) decorrentes de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-muted-foreground">
                <li>Decisões de investimento tomadas através da plataforma</li>
                <li>Informações fornecidas por vendedores ou outros usuários</li>
                <li>Falha em realizar due diligence adequada</li>
                <li>Passivos ocultos ou contingências não divulgadas</li>
                <li>Desempenho de empresas adquiridas</li>
                <li>Disputas entre compradores e vendedores</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">8. Considerações sobre Perfil de Investidor</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  A aquisição de empresas é adequada apenas para investidores que:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Possuem experiência em gestão de negócios</li>
                  <li>Têm capacidade financeira para absorver perdas totais</li>
                  <li>Compreendem os riscos associados a investimentos empresariais</li>
                  <li>Podem dedicar tempo e recursos à gestão do negócio adquirido</li>
                  <li>Têm horizonte de investimento de longo prazo</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">9. Consultoria Profissional</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Recomendamos enfaticamente que você consulte:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-muted-foreground">
                <li>Advogados especializados em direito empresarial e M&A</li>
                <li>Contadores e auditores independentes</li>
                <li>Consultores financeiros</li>
                <li>Especialistas no setor da empresa-alvo</li>
                <li>Consultores tributários</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">10. Reconhecimento e Aceitação</h2>
              <div className="bg-muted border-l-4 border-destructive p-6 rounded">
                <p className="text-foreground font-semibold mb-3">
                  Ao utilizar a plataforma BizMarket para comprar ou vender empresas, você declara que:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Leu e compreendeu integralmente este Aviso de Risco</li>
                  <li>Reconhece e aceita todos os riscos descritos</li>
                  <li>Tem capacidade financeira para assumir perdas potenciais</li>
                  <li>Não se baseia exclusivamente nas informações da plataforma</li>
                  <li>Realizará ou realizou due diligence adequada</li>
                  <li>Consultou ou consultará profissionais qualificados</li>
                  <li>Isenta o BizMarket de qualquer responsabilidade por suas decisões de investimento</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">11. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para dúvidas sobre este Aviso de Risco, entre em contato através de{" "}
                <a href="mailto:legal@bizmarket.com" className="text-primary hover:underline">legal@bizmarket.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
