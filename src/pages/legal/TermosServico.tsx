import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export default function TermosServico() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 pt-28 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/legal/termos" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Termos de Serviço</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-4">Termos de Serviço</h1>
          <p className="text-muted-foreground mb-8">Última atualização: 01 de dezembro de 2024</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e usar a plataforma BizMarket ("Plataforma"), você concorda em estar vinculado 
                a estes Termos de Serviço ("Termos"). Se você não concordar com qualquer parte destes Termos, 
                não utilize nossa Plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">2. Descrição dos Serviços</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  O BizMarket é uma plataforma digital que conecta vendedores de empresas com potenciais 
                  compradores, oferecendo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Marketplace de empresas à venda</li>
                  <li>Sistema de gestão de documentos e due diligence</li>
                  <li>Acordos de confidencialidade (NDA) digitais</li>
                  <li>Ferramentas de comunicação entre compradores e vendedores</li>
                  <li>Recursos administrativos para gestão de transações</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">3. Cadastro e Conta de Usuário</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">3.1 Elegibilidade:</strong> Para utilizar a Plataforma, 
                  você deve ter pelo menos 18 anos de idade e capacidade legal para celebrar contratos.
                </p>
                <p>
                  <strong className="text-foreground">3.2 Informações de Cadastro:</strong> Você concorda em 
                  fornecer informações verdadeiras, precisas, atuais e completas durante o processo de cadastro.
                </p>
                <p>
                  <strong className="text-foreground">3.3 Segurança da Conta:</strong> Você é responsável por 
                  manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas 
                  em sua conta.
                </p>
                <p>
                  <strong className="text-foreground">3.4 Suspensão e Encerramento:</strong> Reservamo-nos o 
                  direito de suspender ou encerrar sua conta caso você viole estes Termos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">4. Obrigações do Usuário</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Ao utilizar a Plataforma, você concorda em:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Usar os serviços apenas para fins legais e de acordo com estes Termos</li>
                  <li>Não violar direitos de terceiros, incluindo direitos de propriedade intelectual</li>
                  <li>Não transmitir vírus, malware ou qualquer código malicioso</li>
                  <li>Não tentar acessar áreas restritas da Plataforma</li>
                  <li>Não usar a Plataforma para spam, phishing ou outras atividades fraudulentas</li>
                  <li>Cumprir todas as leis e regulamentos aplicáveis</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">5. Propriedade Intelectual</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">5.1 Propriedade da Plataforma:</strong> Todo o conteúdo, 
                  recursos, funcionalidades, marcas, logotipos e design da Plataforma são de propriedade 
                  exclusiva do BizMarket ou de seus licenciadores.
                </p>
                <p>
                  <strong className="text-foreground">5.2 Licença Limitada:</strong> Concedemos a você uma 
                  licença limitada, não exclusiva, intransferível e revogável para usar a Plataforma 
                  exclusivamente para fins pessoais e comerciais legítimos.
                </p>
                <p>
                  <strong className="text-foreground">5.3 Conteúdo do Usuário:</strong> Você mantém todos os 
                  direitos sobre o conteúdo que envia à Plataforma, mas nos concede uma licença para usar, 
                  armazenar e exibir tal conteúdo conforme necessário para operar o serviço.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">6. Limitação de Responsabilidade</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  O BizMarket atua como intermediário entre compradores e vendedores. Não somos parte das 
                  transações realizadas através da Plataforma e não garantimos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A veracidade, precisão ou completude das informações fornecidas por usuários</li>
                  <li>O sucesso de qualquer transação</li>
                  <li>A qualidade, segurança ou legalidade das empresas anunciadas</li>
                  <li>A capacidade dos usuários de completar transações</li>
                </ul>
                <p className="mt-4">
                  Em nenhuma circunstância o BizMarket será responsável por danos indiretos, incidentais, 
                  especiais, consequenciais ou punitivos, incluindo perda de lucros, receitas ou dados.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">7. Indenização</h2>
              <p className="text-muted-foreground leading-relaxed">
                Você concorda em indenizar, defender e isentar o BizMarket, seus diretores, funcionários e 
                agentes de qualquer reivindicação, dano, obrigação, perda, responsabilidade, custo ou dívida, 
                e despesas decorrentes de: (a) seu uso da Plataforma; (b) sua violação destes Termos; 
                (c) sua violação de direitos de terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">8. Modificações dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. Notificaremos os 
                usuários sobre alterações significativas através da Plataforma ou por e-mail. O uso 
                continuado da Plataforma após tais modificações constitui sua aceitação dos novos Termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">9. Rescisão</h2>
              <p className="text-muted-foreground leading-relaxed">
                Você pode encerrar sua conta a qualquer momento através das configurações da Plataforma. 
                Podemos suspender ou encerrar sua conta imediatamente, sem aviso prévio, se acreditarmos 
                que você violou estes Termos ou que seu uso pode causar danos ao BizMarket ou a terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">10. Lei Aplicável e Foro</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">10.1 Lei Aplicável:</strong> Estes Termos são regidos 
                  pelas leis da República Federativa do Brasil, sem consideração a conflitos de disposições legais.
                </p>
                <p>
                  <strong className="text-foreground">10.2 Foro:</strong> As partes elegem o foro da Comarca 
                  de São Paulo, Estado de São Paulo, como único competente para dirimir quaisquer questões 
                  oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">11. Contato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para questões sobre estes Termos de Serviço, entre em contato através de{" "}
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
