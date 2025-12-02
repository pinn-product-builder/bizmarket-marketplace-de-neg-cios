import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Linkedin, Instagram, Youtube, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">BizMarket</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              O marketplace líder em compra e venda de empresas no Brasil.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/marketplace" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Explorar Empresas
                </Link>
              </li>
              <li>
                <Link to="#how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Usuários */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Para Você</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auth/signup" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Criar Conta
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/legal/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/regras-gerais" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Regras Gerais
                </Link>
              </li>
              <li>
                <Link to="/legal/termos" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link to="/legal/privacidade" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/legal/aviso-risco" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Aviso de Risco
                </Link>
              </li>
              <li>
                <Link to="/legal/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>contato@bizmarket.com</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col gap-6">
            {/* Copyright and Links */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
              <p>© 2024 BizMarket. Todos os direitos reservados.</p>
              <div className="flex gap-6">
                <Link to="/legal/termos" className="hover:text-primary-foreground transition-colors">
                  Termos de Uso
                </Link>
                <Link to="/legal/privacidade" className="hover:text-primary-foreground transition-colors">
                  Privacidade
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-primary-foreground/50 leading-relaxed">
              <p className="mb-2">
                <strong className="text-primary-foreground/70">Aviso Importante:</strong> A compra e venda de empresas 
                envolve riscos significativos. O BizMarket atua como intermediário, não garantindo a veracidade 
                das informações fornecidas pelos usuários. É fundamental realizar due diligence completa e 
                consultar profissionais especializados antes de qualquer transação.
              </p>
              <p>
                <strong className="text-primary-foreground/70">LGPD:</strong> Tratamos seus dados pessoais 
                conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Para mais informações, 
                consulte nossa <Link to="/legal/privacidade" className="underline hover:text-primary-foreground/70">
                Política de Privacidade</Link>.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex justify-center md:justify-end items-center gap-4">
              <span className="text-xs text-primary-foreground/60">Siga-nos:</span>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};