import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  fullName: string;
  userType: "seller" | "buyer" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const DEMO_USERS = {
  "vendedor@demo.com": {
    id: "1",
    email: "vendedor@demo.com",
    fullName: "João Silva",
    userType: "seller" as const,
    password: "demo123",
  },
  "comprador@demo.com": {
    id: "2",
    email: "comprador@demo.com",
    fullName: "Maria Santos",
    userType: "buyer" as const,
    password: "demo123",
  },
  "admin@demo.com": {
    id: "3",
    email: "admin@demo.com",
    fullName: "Admin BizMarket",
    userType: "admin" as const,
    password: "demo123",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("demo_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS];

    if (!demoUser || demoUser.password !== password) {
      throw new Error("Email ou senha incorretos");
    }

    const { password: _, ...userWithoutPassword } = demoUser;
    setUser(userWithoutPassword);
    localStorage.setItem("demo_user", JSON.stringify(userWithoutPassword));

    // Redirect based on user type
    if (demoUser.userType === "seller") {
      navigate("/dashboard/seller");
    } else if (demoUser.userType === "buyer") {
      navigate("/marketplace");
    } else if (demoUser.userType === "admin") {
      navigate("/dashboard/admin");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("demo_user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}