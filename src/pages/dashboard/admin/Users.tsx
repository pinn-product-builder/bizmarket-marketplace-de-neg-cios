import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, UserCog, Mail, Calendar, MoreVertical, Ban, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    userType: "seller",
    status: "active",
    companies: 2,
    joinedAt: "2024-10-15",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    userType: "buyer",
    status: "active",
    companies: 0,
    joinedAt: "2024-11-01",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro@email.com",
    userType: "seller",
    status: "active",
    companies: 1,
    joinedAt: "2024-09-20",
  },
  {
    id: "4",
    name: "Ana Oliveira",
    email: "ana@email.com",
    userType: "buyer",
    status: "suspended",
    companies: 0,
    joinedAt: "2024-08-10",
  },
  {
    id: "5",
    name: "Carlos Mendes",
    email: "carlos@email.com",
    userType: "seller",
    status: "active",
    companies: 3,
    joinedAt: "2024-07-05",
  },
];

export default function Users() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserTypeBadge = (type: string) => {
    switch (type) {
      case "seller":
        return <Badge variant="secondary">🏢 Vendedor</Badge>;
      case "buyer":
        return <Badge className="bg-primary text-primary-foreground">💼 Comprador</Badge>;
      case "admin":
        return <Badge className="bg-warning text-warning-foreground">⚙️ Admin</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ativo
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="destructive">
            <Ban className="w-3 h-3 mr-1" />
            Suspenso
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleSuspendUser = (userId: string, userName: string) => {
    toast({
      title: "Usuário suspenso",
      description: `${userName} foi suspenso temporariamente.`,
      variant: "destructive",
    });
  };

  const handleActivateUser = (userId: string, userName: string) => {
    toast({
      title: "Usuário ativado",
      description: `${userName} foi reativado com sucesso.`,
    });
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || user.userType === filterType;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary">Gerenciar Usuários</h1>
            <p className="text-muted-foreground mt-2">
              Visualize e gerencie todos os usuários da plataforma
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockUsers.length}
                </div>
                <p className="text-sm text-muted-foreground">Total de Usuários</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {mockUsers.filter((u) => u.userType === "seller").length}
                </div>
                <p className="text-sm text-muted-foreground">Vendedores</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockUsers.filter((u) => u.userType === "buyer").length}
                </div>
                <p className="text-sm text-muted-foreground">Compradores</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-success mb-1">
                  {mockUsers.filter((u) => u.status === "active").length}
                </div>
                <p className="text-sm text-muted-foreground">Ativos</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="seller">Vendedores</SelectItem>
                    <SelectItem value="buyer">Compradores</SelectItem>
                    <SelectItem value="admin">Administradores</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="suspended">Suspensos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usuários</CardTitle>
                  <CardDescription>
                    {filteredUsers.length} usuário(s) encontrado(s)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Empresas</TableHead>
                    <TableHead>Cadastro</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-border">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getUserTypeBadge(user.userType)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        {user.companies > 0 ? (
                          <span className="font-medium">{user.companies}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(user.joinedAt).toLocaleDateString("pt-BR")}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <UserCog className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Enviar Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() => handleSuspendUser(user.id, user.name)}
                                className="text-destructive"
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Suspender Conta
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleActivateUser(user.id, user.name)}
                                className="text-success"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Ativar Conta
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum usuário encontrado com os filtros aplicados.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
