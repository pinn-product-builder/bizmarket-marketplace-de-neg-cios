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
import MyCompanies from "./pages/dashboard/seller/MyCompanies";
import BuyerDashboard from "./pages/dashboard/buyer/BuyerDashboard";
import MyInterests from "./pages/dashboard/buyer/MyInterests";
import Users from "./pages/dashboard/admin/Users";
import Reports from "./pages/dashboard/admin/Reports";
import PendingCompanies from "./pages/dashboard/admin/PendingCompanies";
import AdminCompanyDetails from "./pages/dashboard/admin/CompanyDetails";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import NDAPage from "./pages/legal/NDAPage";
import LegalDueDiligence from "./pages/dashboard/seller/LegalDueDiligence";
import LegalReview from "./pages/dashboard/admin/LegalReview";
import LegalDashboard from "./pages/dashboard/admin/LegalDashboard";

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
            <Route path="/dashboard/seller/companies" element={<MyCompanies />} />
            <Route path="/dashboard/seller/companies/new" element={<CompanyWizard />} />
            <Route path="/dashboard/seller/companies/:id/legal" element={<LegalDueDiligence />} />
            <Route path="/dashboard/seller/companies/:id/interests" element={<CompanyInterests />} />
            
            {/* Buyer Routes */}
            <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
            <Route path="/dashboard/buyer/interests" element={<MyInterests />} />
            
            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/pending" element={<PendingCompanies />} />
            <Route path="/dashboard/admin/pending/:id" element={<AdminCompanyDetails />} />
            <Route path="/dashboard/admin/legal" element={<LegalDashboard />} />
            <Route path="/dashboard/admin/companies/:id/legal" element={<LegalReview />} />
            <Route path="/dashboard/admin/users" element={<Users />} />
            <Route path="/dashboard/admin/reports" element={<Reports />} />
            
            {/* Legal Routes */}
            <Route path="/legal/nda/:ndaId" element={<NDAPage />} />
            
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
