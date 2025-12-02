import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const getInitials = () => {
    return user?.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  const getDashboardLink = () => {
    if (user?.userType === "seller") return "/dashboard/seller";
    if (user?.userType === "admin") return "/dashboard/admin";
    return "/marketplace";
  };

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
            <Link to="/contato" className="text-foreground hover:text-secondary transition-colors font-medium">
              Contato
            </Link>
          </div>

          {/* CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()}>
                  <Button variant="ghost" size="default">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-3 pl-3 border-l border-border">
                  <Link to={getDashboardLink()}>
                    <Avatar className="h-9 w-9 border-2 border-secondary/30 cursor-pointer hover:border-secondary transition-colors">
                      <AvatarFallback className="bg-secondary text-white text-sm font-semibold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={logout} title="Sair">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
              <Link
                to="/contato"
                className="text-foreground hover:text-secondary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="default" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="default" size="default" className="w-full" onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}>
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};