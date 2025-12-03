import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

export type SubscriptionPlan = "free" | "basic" | "premium";
export type SubscriptionStatus = "active" | "inactive" | "trial" | "expired";

interface SubscriptionFeatures {
  canAccessComparison: boolean;
  canContactSellers: boolean;
  canViewFullDetails: boolean;
  canBoostListing: boolean;
  maxListings: number;
  maxComparisons: number;
}

interface Subscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  expiresAt: Date | null;
  features: SubscriptionFeatures;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  isPremium: boolean;
  canAccessFeature: (feature: keyof SubscriptionFeatures) => boolean;
  upgradePlan: (plan: SubscriptionPlan) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Plan features configuration
const PLAN_FEATURES: Record<SubscriptionPlan, SubscriptionFeatures> = {
  free: {
    canAccessComparison: false,
    canContactSellers: false,
    canViewFullDetails: false,
    canBoostListing: false,
    maxListings: 1,
    maxComparisons: 0,
  },
  basic: {
    canAccessComparison: true,
    canContactSellers: true,
    canViewFullDetails: true,
    canBoostListing: false,
    maxListings: 3,
    maxComparisons: 5,
  },
  premium: {
    canAccessComparison: true,
    canContactSellers: true,
    canViewFullDetails: true,
    canBoostListing: true,
    maxListings: 10,
    maxComparisons: -1, // unlimited
  },
};

// Plan pricing (mock)
export const PLAN_PRICING = {
  free: { monthly: 0, yearly: 0, name: "Gratuito" },
  basic: { monthly: 99, yearly: 990, name: "Básico" },
  premium: { monthly: 299, yearly: 2990, name: "Premium" },
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load subscription on mount or user change
  useEffect(() => {
    if (isAuthenticated && user) {
      loadSubscription();
    } else {
      setSubscription(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadSubscription = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock subscription based on user type
    // In production, this would fetch from database
    const savedSub = localStorage.getItem(`subscription_${user?.id}`);
    
    if (savedSub) {
      const parsed = JSON.parse(savedSub);
      setSubscription({
        ...parsed,
        expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,
      });
    } else {
      // Default: sellers get basic, buyers get free
      const defaultPlan: SubscriptionPlan = user?.userType === "seller" ? "basic" : "free";
      const newSub: Subscription = {
        plan: defaultPlan,
        status: "active",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        features: PLAN_FEATURES[defaultPlan],
      };
      setSubscription(newSub);
      localStorage.setItem(`subscription_${user?.id}`, JSON.stringify(newSub));
    }
    
    setIsLoading(false);
  };

  const isPremium = subscription?.plan === "premium" && subscription?.status === "active";

  const canAccessFeature = (feature: keyof SubscriptionFeatures): boolean => {
    if (!subscription) return false;
    if (subscription.status !== "active" && subscription.status !== "trial") return false;
    
    const featureValue = subscription.features[feature];
    if (typeof featureValue === "boolean") return featureValue;
    if (typeof featureValue === "number") return featureValue !== 0;
    return false;
  };

  const upgradePlan = async (plan: SubscriptionPlan) => {
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newSub: Subscription = {
      plan,
      status: "active",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      features: PLAN_FEATURES[plan],
    };
    
    setSubscription(newSub);
    localStorage.setItem(`subscription_${user?.id}`, JSON.stringify(newSub));
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        isPremium,
        canAccessFeature,
        upgradePlan,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
