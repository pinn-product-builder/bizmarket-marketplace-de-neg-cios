# Sistema de Notificações em Tempo Real

## Visão Geral

O sistema de notificações foi implementado com badges no sidebar mostrando:
- 🔴 **Mensagens** não lidas
- 💜 **Interesses** novos (para compradores e vendedores)
- 🟡 **Aprovações pendentes** (para administradores)

## Como Funciona

### Mock (Atual)
Atualmente o sistema usa dados mock que simulam notificações chegando a cada 30 segundos.

### Integração com Supabase (Próximos Passos)

Quando habilitar Lovable Cloud, substitua o código em `src/contexts/NotificationsContext.tsx`:

```typescript
// Substituir o mock por Supabase Realtime
useEffect(() => {
  if (!user) return;

  // Escutar novas mensagens
  const messagesChannel = supabase
    .channel('messages-notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `recipient_id=eq.${user.id}`
      },
      (payload) => {
        setNotifications((prev) => ({
          ...prev,
          messages: prev.messages + 1,
        }));
      }
    )
    .subscribe();

  // Escutar novos interesses
  const interestsChannel = supabase
    .channel('interests-notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'interests',
        filter: user.userType === 'seller' 
          ? `seller_id=eq.${user.id}`
          : `buyer_id=eq.${user.id}`
      },
      (payload) => {
        setNotifications((prev) => ({
          ...prev,
          interests: prev.interests + 1,
        }));
      }
    )
    .subscribe();

  // Escutar aprovações pendentes (apenas admin)
  let approvalsChannel;
  if (user.userType === 'admin') {
    approvalsChannel = supabase
      .channel('approvals-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'companies',
          filter: `status=eq.pending`
        },
        (payload) => {
          setNotifications((prev) => ({
            ...prev,
            pendingApprovals: prev.pendingApprovals + 1,
          }));
        }
      )
      .subscribe();
  }

  return () => {
    supabase.removeChannel(messagesChannel);
    supabase.removeChannel(interestsChannel);
    if (approvalsChannel) {
      supabase.removeChannel(approvalsChannel);
    }
  };
}, [user]);
```

## Funcionalidades

### Auto-clear
Quando o usuário clica em um item do menu com badge, as notificações são automaticamente zeradas.

### Persistência
Adicionar em `NotificationsContext.tsx`:

```typescript
// Salvar no localStorage
useEffect(() => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
}, [notifications]);

// Carregar do localStorage
useEffect(() => {
  const saved = localStorage.getItem('notifications');
  if (saved) {
    setNotifications(JSON.parse(saved));
  }
}, []);
```

## Estrutura de Tabelas Supabase

### Tabela: messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES auth.users(id),
  recipient_id UUID REFERENCES auth.users(id),
  content TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar realtime
ALTER TABLE messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

### Tabela: interests
```sql
CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES auth.users(id),
  seller_id UUID REFERENCES auth.users(id),
  company_id UUID REFERENCES companies(id),
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE interests REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE interests;
```

## Customização

### Cores dos Badges
Editar em `src/components/DashboardSidebar.tsx`:

```tsx
<Badge 
  className="bg-destructive text-destructive-foreground" // Vermelho
  // ou
  className="bg-primary text-primary-foreground"        // Azul
  // ou
  className="bg-warning text-warning-foreground"        // Amarelo
>
```

### Limites de Contagem
Atualmente mostra "99+" se ultrapassar 99 notificações. Para alterar:

```tsx
{item.badge > 99 ? "99+" : item.badge}
// Alterar para:
{item.badge > 999 ? "999+" : item.badge}
```
