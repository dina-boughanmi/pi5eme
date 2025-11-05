import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// GET all jobs
app.get("/api/jobs", async (req, res) => {
  const jobs = await prisma.job.findMany();
  res.json(jobs);
});

// POST a job
app.post("/api/jobs", async (req, res) => {
  const { title, company, location, salary, description, skills } = req.body;
  if (!title || !company) return res.status(400).json({ error: "Title & company required" });
  const job = await prisma.job.create({
    data: { title, company, location, salary, description, skills },
  });
  res.json(job);
});

// DELETE a job
app.delete("/api/jobs/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.job.delete({ where: { id } });
  res.json({ success: true });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
