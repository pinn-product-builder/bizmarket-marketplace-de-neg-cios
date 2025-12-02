import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Marketplace from "./pages/Marketplace";
import CompanyDetails from "./pages/CompanyDetails";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CompanyWizard from "./pages/dashboard/seller/CompanyWizard";
import CompanyInterests from "./pages/dashboard/seller/CompanyInterests";
import BuyerDashboard from "./pages/dashboard/buyer/BuyerDashboard";
import MyInterests from "./pages/dashboard/buyer/MyInterests";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <NotificationsProvider>
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/companies/:id" element={<CompanyDetails />} />
            
            {/* Seller Routes */}
            <Route path="/dashboard/seller" element={<SellerDashboard />} />
            <Route path="/dashboard/seller/companies/new" element={<CompanyWizard />} />
            <Route path="/dashboard/seller/companies/:id/interests" element={<CompanyInterests />} />
            
            {/* Buyer Routes */}
            <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
            <Route path="/dashboard/buyer/interests" element={<MyInterests />} />
            
            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            
            {/* Shared Routes */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
