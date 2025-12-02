import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Central de Ajuda
                </a>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 BizMarket. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};