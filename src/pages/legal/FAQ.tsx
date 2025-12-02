import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 pt-28 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/legal/faq" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">FAQ</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-heading font-bold">Perguntas Frequentes</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Tire suas dúvidas sobre a plataforma BizMarket
          </p>

          <div className="space-y-8">
            {/* Seção: Geral */}
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">Sobre a Plataforma</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>O que é o BizMarket?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      O BizMarket é uma plataforma digital que conecta vendedores de empresas com 
                      potenciais compradores, facilitando todo o processo de compra e venda de 
                      negócios. Oferecemos ferramentas para gestão de documentos, due diligence, 
                      NDAs digitais e comunicação segura entre as partes.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Como funciona a plataforma?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-3">
                      <p><strong className="text-foreground">Para Vendedores:</strong></p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Cadastre-se na plataforma</li>
                        <li>Adicione sua empresa com informações detalhadas</li>
                        <li>Faça upload dos documentos de due diligence</li>
                        <li>Aguarde interessados entrarem em contato</li>
                        <li>Negocie diretamente com compradores qualificados</li>
                      </ol>
                      <p className="mt-3"><strong className="text-foreground">Para Compradores:</strong></p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Cadastre-se e explore o marketplace</li>
                        <li>Filtre empresas por setor, faturamento, região, etc.</li>
                        <li>Solicite acesso completo através de NDA digital</li>
                        <li>Analise documentos e informações detalhadas</li>
                        <li>Entre em contato e negocie com o vendedor</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>A plataforma é segura?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Sim. Utilizamos criptografia de ponta a ponta, NDAs digitais obrigatórios, 
                      verificação de identidade dos usuários e armazenamento seguro de documentos. 
                      Além disso, seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados).
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Seção: Para Vendedores */}
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">Para Vendedores</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-4">
                  <AccordionTrigger>Como vender minha empresa?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-3">
                      <p>Siga estes passos:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Cadastre-se como vendedor</li>
                        <li>Preencha o formulário com informações da empresa (setor, faturamento, 
                            número de funcionários, preço pedido, etc.)</li>
                        <li>Faça upload dos documentos jurídicos e financeiros necessários para 
                            due diligence</li>
                        <li>Aguarde a revisão e aprovação pela nossa equipe</li>
                        <li>Sua empresa será listada no marketplace para compradores qualificados</li>
                        <li>Responda às solicitações de informação e negocie com interessados</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Quais documentos preciso fornecer?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p><strong className="text-foreground">Documentos obrigatórios:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Contrato Social atualizado</li>
                        <li>Certidões Negativas de Débitos (Federal, Estadual, Municipal, Trabalhista)</li>
                        <li>Certidões de Processos (Cíveis e Trabalhistas)</li>
                      </ul>
                      <p className="mt-3"><strong className="text-foreground">Documentos recomendados:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Demonstrações financeiras dos últimos 3 anos</li>
                        <li>Contratos com principais clientes</li>
                        <li>Contratos de trabalho dos principais funcionários</li>
                        <li>Registro de marcas, patentes ou softwares</li>
                        <li>Licenças e alvarás de funcionamento</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Quanto custa anunciar minha empresa?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      O cadastro inicial e a listagem básica da empresa são gratuitos. Cobramos uma 
                      taxa de sucesso apenas quando a venda é concretizada através da plataforma. 
                      Entre em contato para conhecer nossos planos e condições especiais.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>Minha empresa ficará anônima no marketplace?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Sim. Inicialmente, sua empresa é listada com informações gerais (setor, região, 
                      faturamento) sem revelar o nome ou dados identificáveis. Apenas após o comprador 
                      assinar um NDA (Acordo de Confidencialidade) é que informações detalhadas e 
                      documentos são liberados.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Seção: Para Compradores */}
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">Para Compradores</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-8">
                  <AccordionTrigger>Como comprar uma empresa?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-3">
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Cadastre-se como comprador</li>
                        <li>Navegue pelo marketplace e filtre empresas por seus critérios</li>
                        <li>Ao encontrar uma empresa de interesse, solicite acesso completo</li>
                        <li>Assine digitalmente um NDA (Acordo de Confidencialidade)</li>
                        <li>Acesse documentos completos e informações detalhadas</li>
                        <li>Realize sua due diligence com apoio de profissionais</li>
                        <li>Entre em contato com o vendedor através da plataforma</li>
                        <li>Negocie termos e condições</li>
                        <li>Finalize a transação com apoio jurídico adequado</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>Preciso pagar para ver empresas disponíveis?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Não. A navegação no marketplace e visualização de informações básicas das 
                      empresas é totalmente gratuita. Você só precisa se cadastrar e assinar um 
                      NDA para acessar informações completas e documentos sensíveis de empresas 
                      específicas.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>Como funciona a due diligence?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-3">
                      <p>
                        Após assinar o NDA, você terá acesso a uma área de due diligence com todos 
                        os documentos fornecidos pelo vendedor, organizados por categoria:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Documentos jurídicos (contratos, certidões, processos)</li>
                        <li>Documentos financeiros (balanços, DREs, fluxo de caixa)</li>
                        <li>Documentos operacionais (contratos com clientes, fornecedores)</li>
                        <li>Recursos humanos (contratos de trabalho, folha de pagamento)</li>
                        <li>Ativos intangíveis (marcas, patentes, softwares)</li>
                      </ul>
                      <p className="mt-3">
                        <strong className="text-foreground">Importante:</strong> Recomendamos fortemente 
                        contratar advogados, contadores e consultores especializados para auxiliar na 
                        análise dos documentos e na avaliação da empresa.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Seção: NDA e Segurança */}
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">NDA e Segurança</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-11">
                  <AccordionTrigger>O que é um NDA?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      NDA (Non-Disclosure Agreement) ou Acordo de Confidencialidade é um contrato 
                      legal que estabelece que o comprador não pode divulgar ou usar informações 
                      confidenciais da empresa para fins não autorizados. É obrigatório assinar 
                      um NDA antes de acessar dados sensíveis de qualquer empresa na plataforma.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>Como funciona o NDA digital?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-3">
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Ao solicitar acesso completo a uma empresa, um NDA é gerado automaticamente</li>
                        <li>Você visualiza o texto completo do acordo na plataforma</li>
                        <li>Marca a caixa confirmando que leu e aceita os termos</li>
                        <li>Clica em "Assinar Digitalmente"</li>
                        <li>Sua assinatura digital é registrada com timestamp legal</li>
                        <li>O acesso aos documentos é liberado imediatamente</li>
                      </ol>
                      <p className="mt-3">
                        O NDA digital tem a mesma validade jurídica de um contrato físico assinado.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger>O que acontece se eu violar o NDA?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      A violação de um NDA pode resultar em sérias consequências legais, incluindo 
                      ações judiciais por quebra de contrato, indenizações por danos causados, e 
                      possíveis sanções criminais dependendo da gravidade. Além disso, sua conta 
                      na plataforma será permanentemente suspensa.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Seção: Taxas e Pagamentos */}
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">Taxas e Pagamentos</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-14">
                  <AccordionTrigger>Quais são as taxas da plataforma?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-3">
                      <p><strong className="text-foreground">Para Vendedores:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Cadastro e listagem: Gratuitos</li>
                        <li>Taxa de sucesso: Cobrada apenas quando a venda é concretizada (percentual 
                            sobre o valor da transação)</li>
                      </ul>
                      <p className="mt-3"><strong className="text-foreground">Para Compradores:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Navegação no marketplace: Gratuita</li>
                        <li>Acesso a documentos via NDA: Gratuito</li>
                        <li>Planos premium com recursos adicionais disponíveis</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-15">
                  <AccordionTrigger>Como é feito o pagamento da transação?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      O BizMarket não processa pagamentos da transação. O pagamento entre comprador 
                      e vendedor é realizado diretamente entre as partes, geralmente através de conta 
                      escrow (conta garantia) gerenciada por instituição financeira ou escritório de 
                      advocacia especializado em M&A.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Seção: Suporte */}
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">Suporte</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-16">
                  <AccordionTrigger>Como entrar em contato com o suporte?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground space-y-2">
                      <p>Você pode entrar em contato através de:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>E-mail: <a href="mailto:contato@bizmarket.com" className="text-primary hover:underline">contato@bizmarket.com</a></li>
                        <li>WhatsApp: (11) 9999-9999</li>
                        <li>Chat na plataforma (para usuários logados)</li>
                        <li>Formulário de contato no site</li>
                      </ul>
                      <p className="mt-3">Horário de atendimento: Segunda a sexta, das 9h às 18h</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-17">
                  <AccordionTrigger>Vocês oferecem assessoria jurídica ou financeira?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Não. O BizMarket é uma plataforma tecnológica que conecta compradores e vendedores. 
                      Não prestamos assessoria jurídica, financeira, contábil ou fiscal. Recomendamos 
                      fortemente que você contrate profissionais especializados (advogados, contadores, 
                      consultores) para auxiliá-lo no processo de compra ou venda.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          {/* CTA de contato */}
          <div className="mt-12 p-8 bg-muted rounded-lg text-center">
            <h3 className="text-2xl font-heading font-semibold mb-3">Não encontrou sua resposta?</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe está pronta para ajudar com qualquer dúvida adicional.
            </p>
            <a 
              href="mailto:contato@bizmarket.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
