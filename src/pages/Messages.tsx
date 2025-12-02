import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, ArrowLeft, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AISuggestionCard } from "@/components/ui/ai-suggestion-card";
import { AILoading } from "@/components/ui/ai-loading";
import { generateChatResponse } from "@/lib/mock-ai-service";

const mockConversations = [
  {
    id: "1",
    name: "João Silva",
    lastMessage: "Quando podemos agendar uma reunião?",
    timestamp: "10:30",
    unread: 2,
    companyName: "TechFlow Solutions",
  },
  {
    id: "2",
    name: "Maria Santos",
    lastMessage: "Obrigado pelas informações!",
    timestamp: "Ontem",
    unread: 0,
    companyName: "Café Premium",
  },
  {
    id: "3",
    name: "Pedro Costa",
    lastMessage: "Gostaria de ver os documentos",
    timestamp: "2 dias",
    unread: 1,
    companyName: "Indústria MG",
  },
];

const mockMessages = [
  {
    id: "1",
    sender: "other",
    text: "Olá! Tenho muito interesse na sua empresa.",
    timestamp: "10:20",
  },
  {
    id: "2",
    sender: "me",
    text: "Olá! Que bom! O que gostaria de saber?",
    timestamp: "10:25",
  },
  {
    id: "3",
    sender: "other",
    text: "Quando podemos agendar uma reunião?",
    timestamp: "10:30",
  },
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const isMobile = useIsMobile();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Logic to send message
      setMessageText("");
    }
  };

  const handleSelectChat = (conversation: typeof mockConversations[0]) => {
    setSelectedChat(conversation);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  const handleAISuggest = async () => {
    if (mockMessages.length === 0) return;
    
    setLoadingAI(true);
    try {
      const lastMessage = mockMessages[mockMessages.length - 1];
      const suggestion = await generateChatResponse({
        lastMessage: lastMessage.text,
        companyName: selectedChat.companyName,
      });
      setAiSuggestion(suggestion);
    } catch (error) {
      console.error("AI suggestion error:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (aiSuggestion) {
      setMessageText(aiSuggestion);
      setAiSuggestion(null);
    }
  };

  const handleRejectSuggestion = () => {
    setAiSuggestion(null);
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        <div className="border-b p-6">
          <h1 className="text-3xl font-heading font-bold text-primary">Mensagens</h1>
          <p className="text-muted-foreground mt-1">Converse com compradores e vendedores</p>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <Card className={`w-full md:w-80 border-r rounded-none ${isMobile && showChat ? 'hidden' : 'block'}`}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Buscar conversas..." className="pl-9" />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-180px)]">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectChat(conversation)}
                  className={`p-4 border-b cursor-pointer transition-colors ${
                    selectedChat.id === conversation.id
                      ? "bg-accent"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(conversation.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm truncate">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.companyName}</p>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${isMobile && !showChat ? 'hidden' : 'flex'}`}>
            {/* Chat Header */}
            <div className="border-b p-4 bg-muted/30">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button variant="ghost" size="sm" onClick={handleBackToList}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(selectedChat.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedChat.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedChat.companyName}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4 bg-muted/30 space-y-3">
              {aiSuggestion && (
                <AISuggestionCard
                  suggestion={aiSuggestion}
                  onAccept={handleAcceptSuggestion}
                  onReject={handleRejectSuggestion}
                  loading={loadingAI}
                />
              )}
              
              {loadingAI && <AILoading message="Gerando sugestão de resposta..." />}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAISuggest}
                  disabled={loadingAI || mockMessages.length === 0}
                  title="Sugerir resposta com IA"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Digite sua mensagem..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
