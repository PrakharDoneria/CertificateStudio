import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import CertificateGenerator from "@/pages/CertificateGenerator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CertificateGenerator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-50">
          <Header />
          <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
