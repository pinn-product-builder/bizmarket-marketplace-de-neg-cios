import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-primary">
              BizMarket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/marketplace" className="text-foreground hover:text-secondary transition-colors font-medium">
              Explorar Empresas
            </Link>
            <Link to="#how-it-works" className="text-foreground hover:text-secondary transition-colors font-medium">
              Como Funciona
            </Link>
            <Link to="#about" className="text-foreground hover:text-secondary transition-colors font-medium">
              Sobre
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="default">
                Entrar
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button variant="default" size="default">
                Criar Conta
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link
                to="/marketplace"
                className="text-foreground hover:text-secondary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explorar Empresas
              </Link>
              <Link
                to="#how-it-works"
                className="text-foreground hover:text-secondary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link
                to="#about"
                className="text-foreground hover:text-secondary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="default" className="w-full">
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" size="default" className="w-full">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};