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

// Custom hook to scroll to hash section on route change
function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // Delay scroll to make sure elements are rendered
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
}

const queryClient = new QueryClient();

function AppRoutes() {
  useScrollToHash();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

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
