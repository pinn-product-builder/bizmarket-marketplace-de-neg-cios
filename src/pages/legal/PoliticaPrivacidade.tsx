import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/legal/privacidade" className="hover:text-foreground transition-colors">Legal</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Política de Privacidade</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-4">Política de Privacidade</h1>
          <p className="text-muted-foreground mb-8">Última atualização: 01 de dezembro de 2024</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed">
                O BizMarket ("nós", "nosso" ou "nos") está comprometido com a proteção da privacidade 
                e dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, 
                usamos, armazenamos e protegemos seus dados pessoais em conformidade com a Lei Geral de 
                Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">2. Dados Pessoais Coletados</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Coletamos os seguintes tipos de dados pessoais:</p>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.1 Dados de Cadastro</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nome completo</li>
                    <li>E-mail</li>
                    <li>Telefone</li>
                    <li>CPF/CNPJ</li>
                    <li>Endereço</li>
                    <li>Informações profissionais</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.2 Dados de Uso da Plataforma</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador</li>
                    <li>Páginas visitadas</li>
                    <li>Tempo de navegação</li>
                    <li>Dispositivo utilizado</li>
                    <li>Localização geográfica</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.3 Dados Empresariais</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Informações sobre empresas listadas</li>
                    <li>Documentos financeiros e jurídicos</li>
                    <li>Dados de transações</li>
                    <li>Histórico de negociações</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2.4 Dados de Comunicação</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Mensagens trocadas na plataforma</li>
                    <li>E-mails enviados e recebidos</li>
                    <li>Registros de suporte ao cliente</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">3. Finalidade do Tratamento de Dados</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Utilizamos seus dados pessoais para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criar e gerenciar sua conta na plataforma</li>
                  <li>Facilitar transações entre compradores e vendedores</li>
                  <li>Processar pagamentos e taxas</li>
                  <li>Verificar identidade e prevenir fraudes</li>
                  <li>Enviar notificações e comunicações relevantes</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                  <li>Realizar análises estatísticas e de mercado</li>
                  <li>Personalizar conteúdo e recomendações</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">4. Base Legal para Tratamento</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>O tratamento de dados pessoais é realizado com base em:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Consentimento:</strong> Para dados não essenciais ao serviço</li>
                  <li><strong className="text-foreground">Execução de contrato:</strong> Para dados necessários à prestação do serviço</li>
                  <li><strong className="text-foreground">Obrigação legal:</strong> Para cumprimento de obrigações legais e regulatórias</li>
                  <li><strong className="text-foreground">Legítimo interesse:</strong> Para segurança, prevenção de fraudes e melhoria dos serviços</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">5. Compartilhamento de Dados</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Podemos compartilhar seus dados pessoais com:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Outros usuários:</strong> Conforme necessário para facilitar transações (após aceite de NDA)</li>
                  <li><strong className="text-foreground">Prestadores de serviços:</strong> Empresas que nos auxiliam na operação da plataforma (hospedagem, pagamentos, etc.)</li>
                  <li><strong className="text-foreground">Autoridades governamentais:</strong> Quando exigido por lei ou ordem judicial</li>
                  <li><strong className="text-foreground">Parceiros comerciais:</strong> Com seu consentimento explícito</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-foreground">Importante:</strong> Não vendemos seus dados pessoais a terceiros 
                  para fins de marketing sem seu consentimento expresso.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">6. Segurança dos Dados</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criptografia de dados em trânsito (SSL/TLS)</li>
                  <li>Criptografia de dados em repouso</li>
                  <li>Controles de acesso rigorosos</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backups regulares</li>
                  <li>Treinamento de equipe em proteção de dados</li>
                  <li>Auditorias de segurança periódicas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">7. Seus Direitos (LGPD)</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>De acordo com a LGPD, você tem os seguintes direitos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Confirmação e acesso:</strong> Confirmar se tratamos seus dados e acessá-los</li>
                  <li><strong className="text-foreground">Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li><strong className="text-foreground">Anonimização, bloqueio ou eliminação:</strong> Solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
                  <li><strong className="text-foreground">Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong className="text-foreground">Eliminação:</strong> Solicitar a eliminação de dados tratados com base em consentimento</li>
                  <li><strong className="text-foreground">Revogação de consentimento:</strong> Revogar consentimento a qualquer momento</li>
                  <li><strong className="text-foreground">Informação sobre compartilhamento:</strong> Saber com quem compartilhamos seus dados</li>
                  <li><strong className="text-foreground">Oposição:</strong> Se opor ao tratamento quando não houver consentimento</li>
                </ul>
                <p className="mt-4">
                  Para exercer seus direitos, entre em contato através de{" "}
                  <a href="mailto:dpo@bizmarket.com" className="text-primary hover:underline">dpo@bizmarket.com</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">8. Retenção de Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Manteremos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas 
                nesta política, exceto quando um período de retenção mais longo for exigido por lei. 
                Após o término do período de retenção, seus dados serão eliminados ou anonimizados de 
                forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">9. Cookies e Tecnologias Similares</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Utilizamos cookies e tecnologias similares para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Manter você conectado à plataforma</li>
                  <li>Lembrar suas preferências</li>
                  <li>Analisar o uso da plataforma</li>
                  <li>Personalizar conteúdo</li>
                  <li>Melhorar a segurança</li>
                </ul>
                <p className="mt-4">
                  Você pode gerenciar suas preferências de cookies através das configurações do seu 
                  navegador. Note que desabilitar cookies pode afetar a funcionalidade da plataforma.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">10. Transferência Internacional de Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                Seus dados podem ser transferidos e armazenados em servidores localizados fora do Brasil. 
                Nestes casos, garantimos que tais transferências ocorram em conformidade com a LGPD e que 
                níveis adequados de proteção sejam mantidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">11. Menores de Idade</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nossa plataforma não é destinada a menores de 18 anos. Não coletamos intencionalmente 
                dados de menores. Se você acredita que coletamos dados de um menor inadvertidamente, 
                entre em contato imediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">12. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                alterações significativas através da plataforma ou por e-mail. Recomendamos revisar 
                esta política regularmente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">13. Encarregado de Dados (DPO)</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Nosso Encarregado de Proteção de Dados (DPO) é o responsável por supervisionar o 
                  cumprimento desta política e responder a suas dúvidas sobre privacidade.
                </p>
                <p>
                  <strong className="text-foreground">Contato do DPO:</strong><br />
                  E-mail: <a href="mailto:dpo@bizmarket.com" className="text-primary hover:underline">dpo@bizmarket.com</a><br />
                  Endereço: Av. Paulista, 1000 - São Paulo, SP
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold mb-4">14. Autoridade Nacional de Proteção de Dados (ANPD)</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se você não estiver satisfeito com a forma como tratamos seus dados pessoais, você tem 
                o direito de apresentar uma reclamação à Autoridade Nacional de Proteção de Dados (ANPD) 
                através do site{" "}
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  www.gov.br/anpd
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
