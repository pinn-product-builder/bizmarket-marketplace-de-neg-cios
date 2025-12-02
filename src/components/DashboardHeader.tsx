import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const DashboardHeader = () => {
  const { user, logout } = useAuth();

  const getUserTypeLabel = () => {
    if (user?.userType === "seller") return "Vendedor";
    if (user?.userType === "buyer") return "Comprador";
    if (user?.userType === "admin") return "Administrador";
    return "";
  };

  const getInitials = () => {
    return user?.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-heading font-bold text-primary">BizMarket</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {user?.userType === "seller" && (
              <>
                <Link
                  to="/dashboard/seller"
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/seller/companies"
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
                >
                  Minhas Empresas
                </Link>
              </>
            )}
            {user?.userType === "buyer" && (
              <>
                <Link
                  to="/marketplace"
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
                >
                  Marketplace
                </Link>
                <Link
                  to="/dashboard/buyer/interests"
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
                >
                  Meus Interesses
                </Link>
              </>
            )}
            {user?.userType === "admin" && (
              <>
                <Link
                  to="/dashboard/admin"
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/admin/companies"
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
                >
                  Empresas
                </Link>
              </>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-secondary/30">
                    <AvatarFallback className="bg-secondary text-white font-semibold">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    <p className="text-xs leading-none text-secondary font-medium mt-1">
                      {getUserTypeLabel()}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};