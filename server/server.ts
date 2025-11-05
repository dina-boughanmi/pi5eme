import express, { Request, Response } from "express";
import cors from "cors";
import { jobs as jobData, Job } from "./data/jobs";

const app = express();
app.use(cors());
app.use(express.json());

// Copie en mémoire (comme une base de données temporaire)
let jobs: Job[] = [...jobData];

/**
 * 🟢 GET /api/jobs
 * Récupérer tous les jobs
 */
app.get("/api/jobs", (req: Request, res: Response) => {
  res.json(jobs);
});

/**
 * 🟢 GET /api/jobs/:id
 * Récupérer un job par ID
 */
app.get("/api/jobs/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const job = jobs.find((j) => j.id === id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json(job);
});

/**
 * 🟡 POST /api/jobs
 * Ajouter un nouveau job
 */
app.post("/api/jobs", (req: Request, res: Response) => {
  const newJob: Job = {
    id: jobs.length ? Math.max(...jobs.map((j) => j.id)) + 1 : 1,
    ...req.body,
  };

  // Validation simple
  if (!newJob.title || !newJob.company || !newJob.description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  jobs.push(newJob);
  res.status(201).json(newJob);
});

/**
 * 🟠 PUT /api/jobs/:id
 * Modifier un job existant
 */
app.put("/api/jobs/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = jobs.findIndex((j) => j.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  jobs[index] = { ...jobs[index], ...req.body };
  res.json(jobs[index]);
});

/**
 * 🔴 DELETE /api/jobs/:id
 * Supprimer un job
 */
app.delete("/api/jobs/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = jobs.findIndex((j) => j.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  const deletedJob = jobs.splice(index, 1);
  res.json({ message: "Job deleted", job: deletedJob[0] });
});

/**
 * 🚀 Lancer le serveur
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
