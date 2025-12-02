import { 
  LayoutDashboard, 
  Building2, 
  PlusCircle, 
  Heart, 
  MessageSquare, 
  User, 
  Store,
  Users,
  CheckCircle,
  BarChart3,
  Menu
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sellerItems = [
    { title: "Dashboard", url: "/dashboard/seller", icon: LayoutDashboard },
    { title: "Minhas Empresas", url: "/dashboard/seller", icon: Building2 },
    { title: "Cadastrar Empresa", url: "/dashboard/seller/companies/new", icon: PlusCircle },
    { title: "Mensagens", url: "/messages", icon: MessageSquare },
    { title: "Perfil", url: "/profile", icon: User },
  ];

  const buyerItems = [
    { title: "Marketplace", url: "/marketplace", icon: Store },
    { title: "Meus Interesses", url: "/dashboard/buyer/interests", icon: Heart },
    { title: "Mensagens", url: "/messages", icon: MessageSquare },
    { title: "Perfil", url: "/profile", icon: User },
  ];

  const adminItems = [
    { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Empresas Pendentes", url: "/dashboard/admin", icon: CheckCircle },
    { title: "Todas Empresas", url: "/marketplace", icon: Building2 },
    { title: "Usuários", url: "/dashboard/admin/users", icon: Users },
    { title: "Relatórios", url: "/dashboard/admin/reports", icon: BarChart3 },
  ];

  const items =
    user?.userType === "seller"
      ? sellerItems
      : user?.userType === "buyer"
      ? buyerItems
      : adminItems;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-primary">BizMarket</span>
            </div>
          )}
          <SidebarTrigger className="ml-auto">
            <Menu className="h-4 w-4" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard/seller" || item.url === "/dashboard/admin" || item.url === "/marketplace"}
                      className="hover:bg-accent hover:text-accent-foreground"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-border">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {user?.fullName ? getInitials(user.fullName) : "U"}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full mt-2 text-muted-foreground hover:text-foreground"
          >
            Sair
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
