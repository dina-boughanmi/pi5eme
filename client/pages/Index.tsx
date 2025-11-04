import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">JobMatch</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Tech Job
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              AI-powered job matching platform. Discover opportunities that align with your skills using our advanced matching algorithm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-foreground mb-2">Smart Matching</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your skills to find the best opportunities
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-foreground mb-2">Fast Apply</h3>
              <p className="text-sm text-muted-foreground">
                Apply with just your CV in seconds, not hours
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-foreground mb-2">Better Outcomes</h3>
              <p className="text-sm text-muted-foreground">
                Get matched with roles you're actually qualified for
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/auth")}
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base h-12 px-8"
          >
            Get Started →
          </Button>

          <p className="text-sm text-muted-foreground">
            Join 10,000+ developers finding their next opportunity
          </p>
        </div>
      </main>

      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 JobMatch. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
