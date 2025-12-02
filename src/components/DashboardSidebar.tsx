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
  Menu,
  Scale
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationsContext";
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
import { Badge } from "@/components/ui/badge";

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const { notifications, clearNotifications } = useNotifications();
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
    { title: "Dashboard", url: "/dashboard/seller", icon: LayoutDashboard, badge: 0 },
    { title: "Minhas Empresas", url: "/dashboard/seller/companies", icon: Building2, badge: 0 },
    { title: "Cadastrar Empresa", url: "/dashboard/seller/companies/new", icon: PlusCircle, badge: 0 },
    { title: "Mensagens", url: "/messages", icon: MessageSquare, badge: notifications.messages, badgeType: "messages" as const },
    { title: "Perfil", url: "/profile", icon: User, badge: 0 },
  ];

  const buyerItems = [
    { title: "Marketplace", url: "/marketplace", icon: Store, badge: 0 },
    { title: "Meus Interesses", url: "/dashboard/buyer/interests", icon: Heart, badge: notifications.interests, badgeType: "interests" as const },
    { title: "Mensagens", url: "/messages", icon: MessageSquare, badge: notifications.messages, badgeType: "messages" as const },
    { title: "Perfil", url: "/profile", icon: User, badge: 0 },
  ];

  const adminItems = [
    { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard, badge: 0 },
    { title: "Todas Empresas", url: "/marketplace", icon: Building2, badge: 0 },
    { title: "Empresas Pendentes", url: "/dashboard/admin/pending", icon: CheckCircle, badge: notifications.pendingApprovals, badgeType: "pendingApprovals" as const },
    { title: "Revisão Legal", url: "/dashboard/admin/legal", icon: Scale, badge: 0 },
    { title: "Usuários", url: "/dashboard/admin/users", icon: Users, badge: 0 },
    { title: "Relatórios", url: "/dashboard/admin/reports", icon: BarChart3, badge: 0 },
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
                      className="hover:bg-accent hover:text-accent-foreground relative"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                      onClick={() => {
                        if (item.badgeType) {
                          clearNotifications(item.badgeType);
                        }
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                      {item.badge > 0 && (
                        <Badge 
                          className="bg-destructive text-destructive-foreground h-5 min-w-5 px-1.5 text-xs flex items-center justify-center ml-auto"
                        >
                          {item.badge > 99 ? "99+" : item.badge}
                        </Badge>
                      )}
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
