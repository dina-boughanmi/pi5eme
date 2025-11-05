// server.ts
import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5173; // Choisis un port libre

// ===== Middleware =====
app.use(express.json());

// ===== Données mock jobs =====
let jobs = [
  { id: 1, title: "Frontend Dev", company: "ESPRIT", location: "Tunis", salary: "2000$", description: "React dev", skills: "React, TS" },
  { id: 2, title: "Backend Dev", company: "Doubia", location: "Sfax", salary: "2500$", description: "Node.js dev", skills: "Node, Express" }
];

// ===== Routes API =====
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.post("/api/jobs", (req, res) => {
  const job = { id: jobs.length + 1, ...req.body };
  jobs.push(job);
  res.json(job);
});

app.put("/api/jobs", (req, res) => {
  const index = jobs.findIndex((j) => j.id === req.body.id);
  if (index !== -1) {
    jobs[index] = req.body;
    res.json(jobs[index]);
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

app.delete("/api/jobs", (req, res) => {
  const index = jobs.findIndex((j) => j.id === req.body.id);
  if (index !== -1) {
    const deleted = jobs.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

// ===== Servir les fichiers statiques (React build) =====
const __dirname = path.resolve();
const distPath = path.join(__dirname, "dist"); // ton build React ici
app.use(express.static(distPath));

// React Router fallback
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

// ===== Démarrage du serveur =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔧 API endpoint: http://localhost:${PORT}/api/jobs`);
});

// ===== Gestion fermeture =====
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 SIGINT received, shutting down");
  process.exit(0);
});
