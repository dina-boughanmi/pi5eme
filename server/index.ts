import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Données en mémoire pour le CRUD
  let jobs = [
    { id: 1, title: "Frontend Dev", company: "ESPRIT", location: "Tunis", salary: "2000$", description: "React dev", skills: "React, TS" },
    { id: 2, title: "Backend Dev", company: "Doubia", location: "Sfax", salary: "2500$", description: "Node.js dev", skills: "Node, Express" }
  ];

  // GET all jobs
  app.get("/api/jobs", (_req, res) => {
    res.json(jobs);
  });

  // POST add job
  app.post("/api/jobs", (req, res) => {
    const newJob = { id: jobs.length + 1, ...req.body };
    jobs.push(newJob);
    res.json(newJob);
  });

  // PUT update job
  app.put("/api/jobs/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) return res.status(404).json({ error: "Job not found" });
    jobs[index] = { id, ...req.body };
    res.json(jobs[index]);
  });

  // DELETE job
  app.delete("/api/jobs/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) return res.status(404).json({ error: "Job not found" });
    const deleted = jobs.splice(index, 1);
    res.json(deleted[0]);
  });

  return app;
}

// Lancer backend pour dev
if (process.env.NODE_ENV !== "production") {
  const app = createServer();
  const port = 3000;
  app.listen(port, () => console.log(`Backend running on http://localhost:${port}/api/jobs`));
}


