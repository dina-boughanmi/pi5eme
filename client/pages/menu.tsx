import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // utilise le composant UI du template si dispo

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      {/* Logo + titre */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md mb-4">
          <svg
            className="w-8 h-8 text-white"
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

        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">
          Welcome to <span className="text-primary">JobMatch</span>
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          Choose your path and let’s find the perfect match between ambition and opportunity.
        </p>
      </motion.div>

      {/* Boutons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <Button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-6 text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          I’m a Candidate 💼
        </Button>

        <Button
          onClick={() => navigate("/jobManager")}
          className="px-8 py-6 text-lg rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all"
        >
          I’m a Recruiter 🧑‍💻
        </Button>
      </motion.div>
    </div>
  );
}
