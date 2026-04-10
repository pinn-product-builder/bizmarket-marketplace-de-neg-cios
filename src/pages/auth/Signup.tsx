import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, ArrowLeft, ShoppingBag, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(searchParams.get("type") || "buyer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para criar sua conta.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 8 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate account creation with demo system
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo: auto-login with the matching demo account type
    const demoEmail = userType === "seller" ? "vendedor@demo.com" : "comprador@demo.com";
    
    try {
      await login(demoEmail, "demo123");
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo ao BizMarket, ${fullName}! (Ambiente de demonstração - logado como ${userType === "seller" ? "vendedor" : "comprador"} demo)`,
      });
    } catch {
      toast({
        title: "Conta criada!",
        description: "Sua conta foi criada. Use as credenciais demo para acessar.",
      });
      navigate("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        <Card className="border-2">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl font-heading">Criar Conta</CardTitle>
              <CardDescription>Comece sua jornada no BizMarket</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

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
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <div className="space-y-3">
                <Label>Tipo de Conta</Label>
                <RadioGroup value={userType} onValueChange={setUserType}>
                  <div className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:border-secondary transition-colors">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label
                      htmlFor="buyer"
                      className="flex-1 cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <div className="font-semibold">Comprador / Investidor</div>
                        <div className="text-sm text-muted-foreground">
                          Busco empresas para investir
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer hover:border-success transition-colors">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label
                      htmlFor="seller"
                      className="flex-1 cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="font-semibold">Vendedor</div>
                        <div className="text-sm text-muted-foreground">
                          Quero vender minha empresa
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ao criar uma conta, você concorda com nossos{" "}
                <Link to="/legal/termos" className="text-secondary hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link to="/legal/privacidade" className="text-secondary hover:underline">
                  Política de Privacidade
                </Link>
              </p>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Já tem uma conta? </span>
              <Link to="/auth/login" className="text-secondary hover:underline font-medium">
                Entrar
              </Link>
            </div>

            {/* Demo Notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground bg-muted/50 inline-block px-3 py-1.5 rounded-lg">
                🎭 Ambiente de demonstração — o cadastro simulará login com conta demo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
