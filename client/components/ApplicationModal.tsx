import { useState, useRef } from "react";
import { Job } from "@/data/jobs";
import { mockCV, generateMockAIMatch, generateMockAISummary } from "@/data/mockCV";
import { Button } from "@/components/ui/button";
import ChatCVInterface from "@/pages/agentAICandidate";

interface ApplicationModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplicationModal({ job, onClose }: ApplicationModalProps) {
  const [cvUploaded, setCvUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileObj, setFileObj] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<Record<string, string> | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) startUpload(f);
  };

  const handleBrowseClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) startUpload(f);
  };

  const startUpload = (file: File) => {
    setCvUploaded(false);
    setUploadProgress(0);
    setAiFeedback(null);
    setFileName(file.name);
    setFileObj(file);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + Math.random() * 30;
        if (next >= 100) {
          clearInterval(interval);
          setCvUploaded(true);

          const sectionFeedback = {
            profile: "🧭 Profil : résumé clair, ajoute une phrase sur ton objectif professionnel.",
            skills: "💡 Compétences : bonne liste. Indique ton niveau de maîtrise.",
            experience: "🚀 Expériences : très pertinentes, ajoute des résultats mesurables.",
            education: "🎓 Formation : complète. Mentionne les dates et certifications.",
            layout: "✨ Mise en page : claire et lisible, allège les marges.",
          };
          setAiFeedback(sectionFeedback);
          return 100;
        }
        return Math.min(100, next);
      });
    }, 250);
  };

  const { score } = generateMockAIMatch(job.requiredSkills, mockCV.skills);
  const aiSummary = generateMockAISummary(score);

  // 👉 ouvre le chat et masque la fenêtre de feedback
  const handleOpenChat = () => {
    setShowAIChat(true);
  };

  const handleCloseChat = () => {
    setShowAIChat(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* === Feedback === */}
      {!showAIChat && (
        <div className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{job.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                isDragging
                  ? "border-secondary bg-secondary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {!cvUploaded ? (
                <>
                  <p className="text-foreground font-semibold mb-1">Drag & drop your CV here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse (PDF, DOCX)
                  </p>
                  <Button
                    onClick={handleBrowseClick}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    Browse Files
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-foreground font-semibold">CV uploaded successfully!</p>
                  <p className="text-sm text-muted-foreground mt-1">{fileName}</p>
                </>
              )}
            </div>

            {!cvUploaded && uploadProgress > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">Uploading...</p>
                  <p className="text-sm text-muted-foreground">{Math.floor(uploadProgress)}%</p>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-primary transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {aiFeedback && (
              <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mt-2">
                <h4 className="font-semibold text-foreground mb-2">
                  AI Feedback (section by section)
                </h4>
                <div className="space-y-3">
                  {Object.entries(aiFeedback).map(([section, comment]) => (
                    <div key={section} className="p-3 bg-card border border-border rounded">
                      <p className="font-semibold capitalize">{section}</p>
                      <p className="text-sm text-muted-foreground mt-1">{comment}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-white/5 rounded border border-border">
                  <p className="text-sm text-muted-foreground">Match summary:</p>
                  <p className="font-medium">{aiSummary}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-card"
              >
                Cancel
              </Button>

              <Button
                onClick={handleOpenChat}
                disabled={!cvUploaded}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-green-500 text-white hover:opacity-90 disabled:opacity-50"
              >
                🤖 Launch Agent AI
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* === Chat AI === */}
      {showAIChat && (
        <div className="bg-card border border-border rounded-xl shadow-2xl w-[95%] md:w-3/4 lg:w-2/3 h-[90vh] overflow-hidden flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div>
              <h3 className="text-lg font-semibold">🤖 AI Agent Chat</h3>
              <p className="text-sm text-muted-foreground">{fileName || "No CV provided"}</p>
            </div>
            <Button variant="outline" onClick={handleCloseChat}>
              Close Chat
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ChatCVInterface uploadedFile={fileObj} uploadedFileName={fileName} />
          </div>
        </div>
      )}
    </div>
  );
}
