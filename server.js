// server.ts
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Autoriser les requêtes depuis le frontend
app.use(cors());
app.use(express.json()); // Pour lire les JSON dans le body

// Données de jobs statiques
let jobs = [
  {
    id: 1,
    title: "Développeur Frontend",
    company: "TechCorp",
    location: "Remote",
    salary: "4000$/mois",
    description: "Travailler sur des applications React",
    skills: "React,JavaScript,HTML,CSS"
  },
  {
    id: 2,
    title: "Développeur Backend",
    company: "CodeFactory",
    location: "New York",
    salary: "5000$/mois",
    description: "Développer des API et services",
    skills: "Node.js,Express,SQL"
  }
];

// 🔹 Récupérer tous les jobs
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

// 🔹 Ajouter un nouveau job
app.post("/api/jobs", (req, res) => {
  const newJob = { ...req.body, id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1 };
  jobs.push(newJob);
  res.json(newJob);
});

// 🔹 Modifier un job existant
app.put("/api/jobs", (req, res) => {
  const { id, ...rest } = req.body;
  const index = jobs.findIndex(job => job.id === id);
  if (index === -1) return res.status(404).json({ message: "Job non trouvé" });

  jobs[index] = { id, ...rest };
  res.json(jobs[index]);
});

// 🔹 Supprimer un job
app.delete("/api/jobs", (req, res) => {
  const { id } = req.body;
  jobs = jobs.filter(job => job.id !== id);
  res.json({ message: "Job supprimé" });
});

// 🔹 Route test pour la racine
app.get("/", (req, res) => {
  res.send("Le backend fonctionne et peut servir des jobs !");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
