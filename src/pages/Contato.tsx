import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronRight, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

// Schema de validação com zod
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Telefone inválido" })
    .max(20, { message: "Telefone deve ter no máximo 20 caracteres" })
    .optional()
    .or(z.literal("")),
  subject: z.string()
    .trim()
    .min(5, { message: "Assunto deve ter pelo menos 5 caracteres" })
    .max(200, { message: "Assunto deve ter no máximo 200 caracteres" }),
  message: z.string()
    .trim()
    .min(20, { message: "Mensagem deve ter pelo menos 20 caracteres" })
    .max(2000, { message: "Mensagem deve ter no máximo 2000 caracteres" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contato() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: user?.email.split('@')[0] || "",
    email: user?.email || "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validar dados
      const validatedData = contactSchema.parse(formData);
      
      // Simulação de envio (integrado com sistema de mensagens mock)
      // Em produção, isso criaria uma nova conversa no sistema de mensagens
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Criar mensagem no sistema mock
      const newMessage = {
        id: `msg_${Date.now()}`,
        senderId: user?.id || 'guest',
        senderName: validatedData.name,
        recipientId: 'admin',
        recipientName: 'Equipe BizMarket',
        subject: validatedData.subject,
        message: validatedData.message,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      // Salvar no localStorage (sistema mock)
      const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      localStorage.setItem('contact_messages', JSON.stringify([...existingMessages, newMessage]));
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      
      // Limpar formulário
      setFormData({
        name: user?.email.split('@')[0] || "",
        email: user?.email || "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Redirecionar para mensagens se usuário estiver logado
      if (user) {
        setTimeout(() => navigate('/messages'), 2000);
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Mapear erros de validação
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Erro de validação",
          description: "Por favor, corrija os campos destacados.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Contato</span>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tem alguma dúvida ou sugestão? Estamos aqui para ajudar. 
              Preencha o formulário abaixo e retornaremos em breve.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações de Contato */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>
                    Você também pode entrar em contato pelos canais abaixo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Email</p>
                      <a 
                        href="mailto:contato@bizmarket.com" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        contato@bizmarket.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Telefone</p>
                      <a 
                        href="tel:+551199999999" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        (11) 9999-9999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Endereço</p>
                      <p className="text-sm text-muted-foreground">
                        Av. Paulista, 1000<br />
                        São Paulo, SP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Segunda - Sexta</span>
                      <span className="font-semibold">9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sábado</span>
                      <span className="font-semibold">9h - 13h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domingo</span>
                      <span className="font-semibold">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envie sua mensagem</CardTitle>
                  <CardDescription>
                    Preencha todos os campos obrigatórios e responderemos o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Nome completo <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="Seu nome completo"
                          className={errors.name ? "border-destructive" : ""}
                          maxLength={100}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="seu@email.com"
                          className={errors.email ? "border-destructive" : ""}
                          maxLength={255}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone (opcional)</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          className={errors.phone ? "border-destructive" : ""}
                          maxLength={20}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          Assunto <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="Assunto da sua mensagem"
                          className={errors.subject ? "border-destructive" : ""}
                          maxLength={200}
                        />
                        {errors.subject && (
                          <p className="text-sm text-destructive">{errors.subject}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Mensagem <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Escreva sua mensagem aqui..."
                        rows={6}
                        className={errors.message ? "border-destructive" : ""}
                        maxLength={2000}
                      />
                      <div className="flex justify-between items-center">
                        {errors.message ? (
                          <p className="text-sm text-destructive">{errors.message}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Mínimo 20 caracteres
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {formData.message.length}/2000
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-destructive">*</span> Campos obrigatórios
                      </p>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="min-w-[140px]"
                      >
                        {isSubmitting ? (
                          <>Enviando...</>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Rápido */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
                <CardDescription>
                  Antes de entrar em contato, confira se sua dúvida já foi respondida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Quanto tempo leva para receber resposta?</h4>
                    <p className="text-sm text-muted-foreground">
                      Normalmente respondemos em até 24 horas úteis.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Preciso estar cadastrado para entrar em contato?</h4>
                    <p className="text-sm text-muted-foreground">
                      Não, qualquer pessoa pode enviar uma mensagem através deste formulário.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Vocês oferecem suporte por telefone?</h4>
                    <p className="text-sm text-muted-foreground">
                      Sim, atendemos por telefone e WhatsApp durante o horário comercial.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Onde encontro mais informações?</h4>
                    <p className="text-sm text-muted-foreground">
                      Visite nossa <Link to="/legal/faq" className="text-primary hover:underline">Central de Ajuda</Link> com perguntas frequentes detalhadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
