import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Notifications {
  messages: number;
  interests: number;
  pendingApprovals: number;
}

interface NotificationsContextType {
  notifications: Notifications;
  clearNotifications: (type: keyof Notifications) => void;
  addNotification: (type: keyof Notifications, count?: number) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationsProviderProps {
  children: ReactNode;
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notifications>({
    messages: 0,
    interests: 0,
    pendingApprovals: 0,
  });

  // Simular notificações em tempo real
  useEffect(() => {
    if (!user) return;

    // Carregar notificações iniciais baseado no tipo de usuário
    const loadInitialNotifications = () => {
      if (user.userType === "seller") {
        setNotifications({
          messages: 2,
          interests: 3,
          pendingApprovals: 0,
        });
      } else if (user.userType === "buyer") {
        setNotifications({
          messages: 1,
          interests: 2,
          pendingApprovals: 0,
        });
      } else if (user.userType === "admin") {
        setNotifications({
          messages: 0,
          interests: 0,
          pendingApprovals: 2,
        });
      }
    };

    loadInitialNotifications();

    // Simular novas notificações chegando (mock - substituir por Supabase Realtime)
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotifications((prev) => {
          const newNotifications = { ...prev };
          
          if (user.userType === "seller" || user.userType === "buyer") {
            if (Math.random() > 0.5) {
              newNotifications.messages += 1;
            } else {
              newNotifications.interests += 1;
            }
          } else if (user.userType === "admin") {
            newNotifications.pendingApprovals += 1;
          }
          
          return newNotifications;
        });
      }
    }, 30000); // Simular nova notificação a cada 30 segundos

    return () => clearInterval(interval);
  }, [user]);

  const clearNotifications = (type: keyof Notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: 0,
    }));
  };

  const addNotification = (type: keyof Notifications, count: number = 1) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: prev[type] + count,
    }));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, clearNotifications, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}
