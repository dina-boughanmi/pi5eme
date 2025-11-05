import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ===== Types =====
interface Job {
  id?: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string;
}

interface Message {
  role: "user" | "ai";
  text: string;
}

// ===== Composant AI Agent =====
function AgentAI({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "ai", text: "Erreur: impossible d'obtenir la réponse" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background flex flex-col max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🤖 AI Agent</h1>
        <Button variant="outline" onClick={onBack}>
          🔙 Back to Jobs
        </Button>
      </div>

      <Card className="flex-1 mb-6 flex flex-col">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground">Start the conversation...</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
                }`}
              >
                <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.text}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}

// ===== Composant principal JobManager =====
export default function JobManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState<Job>({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showAgent, setShowAgent] = useState(false);

  // Charger les jobs au montage
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/jobs");
      const data = await res.json();
      setJobs(data);
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
      const method = editingJob ? "PUT" : "POST";
      const res = await fetch("http://localhost:3000/api/jobs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob ? { ...formData, id: editingJob.id } : formData),
      });
      const job = await res.json();
      setJobs(editingJob ? jobs.map((j) => (j.id === job.id ? job : j)) : [...jobs, job]);
      setFormData({ title: "", company: "", location: "", salary: "", description: "", skills: "" });
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
      await fetch("http://localhost:3000/api/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setJobs(jobs.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Erreur delete job:", err);
    }
  };

  // Si l'AI Agent est ouvert, on affiche son interface
  if (showAgent) return <AgentAI onBack={() => setShowAgent(false)} />;

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => window.location.href="/menu"}>
            🔙 Back to Menu
          </Button>
          <Button variant="secondary" onClick={() => setShowAgent(true)}>
            🤖 AI Agent
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
          🧑‍💼 Job Manager
        </h1>

        {/* Formulaire d'ajout / édition */}
        <Card className="mb-10 shadow-lg border-border">
          <CardHeader>
            <CardTitle>{editingJob ? "✏️ Edit Job" : "➕ Add a New Job"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {(["title","company","location","salary","description","skills"] as (keyof Job)[]).map((field) => (
              <Input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              />
            ))}
          </CardContent>
          <div className="flex justify-end gap-4 p-4">
            {editingJob && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingJob(null);
                  setFormData({ title: "", company: "", location: "", salary: "", description: "", skills: "" });
                }}
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : editingJob ? "Update Job" : "Add Job"}
            </Button>
          </div>
        </Card>

        {/* Liste des jobs */}
        {jobs.length === 0 ? (
          <p className="text-center text-muted-foreground">No jobs yet</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card key={job.id} className="shadow-md hover:shadow-xl transition p-4 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </CardHeader>
                <CardContent>
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                  <p>{job.description.substring(0, 80)}...</p>
                  <p className="italic text-xs">Skills: {job.skills}</p>
                </CardContent>
                <div className="flex justify-between mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setEditingJob(job); setFormData(job); }}
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
