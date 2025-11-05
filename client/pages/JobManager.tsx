import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  id?: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[]; // tableau
}

export default function JobManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState<Job>({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: [],
  });
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  // Charger les jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/jobs");
      const data = await res.json();
      // S'assure que skills est toujours un tableau
      setJobs(
        data.map((job: any) => ({
          ...job,
          skills: Array.isArray(job.skills)
            ? job.skills
            : typeof job.skills === "string"
            ? job.skills.split(",").map((s) => s.trim())
            : [],
        }))
      );
    } catch (err) {
      console.error("Erreur fetching jobs:", err);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.company.trim()) {
      return alert("Veuillez remplir le titre et la société");
    }

    setLoading(true);
    try {
      const url = editingJob
        ? `http://localhost:3000/api/jobs/${editingJob.id}`
        : "http://localhost:3000/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const job = await res.json();

      setJobs((prev) =>
        editingJob
          ? prev.map((j) => (j.id === job.id ? job : j))
          : [...prev, job]
      );

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        skills: [],
      });
      setEditingJob(null);
    } catch (err) {
      console.error("Erreur saving job:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce job ?")) return;
    try {
      await fetch(`http://localhost:3000/api/jobs/${id}`, {
        method: "DELETE",
      });
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Erreur delete job:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
          🧑‍💼 Job Manager
        </h1>

        {/* Formulaire */}
        <Card className="mb-10 shadow-lg border-border">
          <CardHeader>
            <CardTitle>{editingJob ? "✏️ Edit Job" : "➕ Add Job"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {["title", "company", "location", "salary", "description"].map((field) => (
              <Input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(formData as any)[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            ))}

            <Input
              placeholder="Skills (comma separated)"
              value={formData.skills.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          </CardContent>
          <div className="flex justify-end gap-4 p-4">
            {editingJob && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingJob(null);
                  setFormData({
                    title: "",
                    company: "",
                    location: "",
                    salary: "",
                    description: "",
                    skills: [],
                  });
                }}
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : editingJob ? "Update" : "Add"}
            </Button>
          </div>
        </Card>

        {/* Liste des jobs */}
        {jobs.length === 0 ? (
          <p className="text-center text-muted-foreground">No jobs found</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="shadow-md hover:shadow-xl transition p-4 flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </CardHeader>
                <CardContent>
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                  <p>{job.description?.substring(0, 80)}...</p>
                  <p className="italic text-xs">
                    Skills: {(job.skills || []).join(", ")}
                  </p>
                </CardContent>
                <div className="flex justify-between mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingJob(job);
                      setFormData(job);
                    }}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(job.id!)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
