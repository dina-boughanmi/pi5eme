import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// === Fichier de stockage ===
const DATA_FILE = path.join(__dirname, "jobs.json");

// === Fonction pour lire les jobs depuis le fichier ===
function readJobs(): any[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return []; // si fichier n'existe pas encore
  }
}

// === Fonction pour écrire les jobs dans le fichier ===
function writeJobs(jobs: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2), "utf-8");
}

// === Routes API ===

// Récupérer tous les jobs
app.get("/api/jobs", (req, res) => {
  const jobs = readJobs();
  res.json(jobs);
});

// Ajouter un job
app.post("/api/jobs", (req, res) => {
  const jobs = readJobs();
  const newJob = { id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1, ...req.body };
  jobs.push(newJob);
  writeJobs(jobs);
  res.json(newJob);
});

// Modifier un job
app.put("/api/jobs", (req, res) => {
  const jobs = readJobs();
  const index = jobs.findIndex(j => j.id === req.body.id);
  if (index === -1) return res.status(404).json({ error: "Job not found" });
  jobs[index] = { ...jobs[index], ...req.body };
  writeJobs(jobs);
  res.json(jobs[index]);
});

// Supprimer un job
app.delete("/api/jobs", (req, res) => {
  const jobs = readJobs();
  const index = jobs.findIndex(j => j.id === req.body.id);
  if (index === -1) return res.status(404).json({ error: "Job not found" });
  const deleted = jobs.splice(index, 1);
  writeJobs(jobs);
  res.json(deleted[0]);
});

// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
