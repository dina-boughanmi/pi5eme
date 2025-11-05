import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirection automatique si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-3xl text-center space-y-10">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Tech Job
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover AI-powered opportunities that truly match your skills and ambitions.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 my-10">
            <Feature
              color="primary"
              title="Smart Matching"
              text="Our AI analyzes your skills to find the best opportunities."
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
            <Feature
              color="secondary"
              title="Fast Apply"
              text="Apply in seconds with your CV — no long forms required."
              iconPath="M13 10V3L4 14h7v7l9-11h-7z"
            />
            <Feature
              color="success"
              title="Better Outcomes"
              text="Get matched with roles you're actually qualified for."
              iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </div>

          {/* Button */}
          <Button
            onClick={() => navigate("/menu")}
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base h-12 px-8"
          >
            Get Started →
          </Button>

          <p className="text-sm text-muted-foreground">
            Join 10,000+ developers finding their next opportunity 🚀
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JobMatch. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureProps {
  color: string;
  title: string;
  text: string;
  iconPath: string;
}

// Petit composant pour simplifier les "features"
const Feature: React.FC<FeatureProps> = ({ color, title, text, iconPath }) => (
  <div className="bg-card border border-border rounded-lg p-6">
    <div className={`w-12 h-12 rounded-lg bg-${color}/20 flex items-center justify-center mb-4`}>
      <svg className={`w-6 h-6 text-${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
    </div>
    <h3 className="font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

export default Index;
