// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Navbar from "./components/Navbar";
import LoginForm from "./components/Login";
import RegistrationForm from "./components/Register";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Demo from "./components/demo";

import PaymentPage from "./components/Paymentpage";
import ContactWidget from "./components/ContactWidget";

// Business Pages
import BusinessDashboard from "./components/admin-review/business/dashboard/page";
import BusinessReviews from "./components/admin-review/business/reviews/page";
import ReviewLinkPage from "./components/admin-review/business/review-link/page";

// Admin Pages
import AdminDashboard from "./components/admin-review/dashboard/page";
import BusinessesPage from "./components/admin-review/businesses/page";
import UsersPage from "./components/admin-review/users/page";

// Auth Pages
import LoginPage from "./components/admin-review/login/page";
import RegisterPage from "./components/admin-reviewfile/sidebar"; // <- Likely wrong import, see note below

// Sidebar (if used globally)
import Sidebar from "./components/admin-reviewfile/sidebar";
import AdminReviews from "./components/admin/adminreview";
import ReviewLinkSettings from "./components/admin/reviewlink";
import Analytics from "./components/admin/Analytics";

// --- Custom Scroll Hook ---
function useScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);
}

// --- Query Client ---
const queryClient = new QueryClient();

function AppRoutes() {
  useScrollToHash();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contact" element={<ContactWidget />} />
        <Route path="/pricing" element={<Index />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin" element={<AdminReviews />} />
        <Route path="/review" element={<ReviewLinkSettings />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/businesses" element={<BusinessesPage />} />
        <Route path="/admin/users" element={<UsersPage />} />

        {/* Business Routes */}
        <Route path="/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/business/reviews" element={<BusinessReviews />} />
        <Route path="/business/review-link" element={<ReviewLinkPage />} />

        {/* Review Auth */}
        <Route path="/login-review" element={<LoginPage />} />
        <Route path="/register-review" element={<RegisterPage />} />

        {/* Sidebar Test */}
        <Route path="/sidebar" element={<Sidebar />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// --- Main App Component ---
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
