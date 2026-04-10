import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, ArrowLeft, Info, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const DEMO_ACCOUNTS = [
  { email: "vendedor@demo.com", password: "demo123", type: "Vendedor", icon: "🏢" },
  { email: "comprador@demo.com", password: "demo123", type: "Comprador", icon: "💼" },
  { email: "admin@demo.com", password: "demo123", type: "Admin", icon: "⚙️" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao BizMarket",
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Email ou senha incorretos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
    toast({
      title: "Credenciais copiadas!",
      description: "Clique em Entrar para acessar",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        {/* Demo Accounts Alert */}
        <Alert className="mb-6 border-2 border-secondary/50 bg-secondary/5">
          <Info className="h-4 w-4 text-secondary" />
          <AlertDescription className="text-sm">
            <div className="font-semibold mb-2">Contas Demo Disponíveis:</div>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((account) => (
                <div
                  key={account.email}
                  className="flex items-center justify-between p-2 bg-white rounded-lg border border-border hover:border-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{account.icon}</span>
                    <div className="text-xs">
                      <div className="font-medium text-foreground">{account.type}</div>
                      <div className="text-muted-foreground">{account.email}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyCredentials(account.email, account.password)}
                    className="h-8"
                  >
                    {copiedEmail === account.email ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Senha para todas: <span className="font-mono font-semibold">demo123</span>
            </div>
          </AlertDescription>
        </Alert>

        <Card className="border-2">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-heading">Bem-vindo de volta</CardTitle>
              <CardDescription>Entre com suas credenciais para continuar</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button
                    type="button"
                    onClick={() => toast({
                      title: "Recuperação de senha",
                      description: "Em ambiente de demonstração, use a senha 'demo123' para todas as contas.",
                    })}
                    className="text-sm text-secondary hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Não tem uma conta? </span>
              <Link to="/auth/signup" className="text-secondary hover:underline font-medium">
                Criar conta
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}