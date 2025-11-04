import React, { useState, useRef, useEffect } from "react";

/**
 * Chat-like CV feedback interface
 * - Single-file React component (Tailwind CSS)
 * - Props: apiUrl (string) -> endpoint of your deployed model
 * - Expects: POST multipart/form-data with fields: `file` (cv) and `message` (optional)
 * - Expects JSON response: { reply: string }
 */

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  fileName?: string | null;
};

export default function ChatCVInterface({ apiUrl = "/api/feedback" }: { apiUrl?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "sys-1",
      role: "system",
      text: "Bienvenue — téléversez votre CV puis cliquez sur \"Envoyer\". Le modèle analysera et donnera un retour précis.",
    },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleFileChange = (f: File | null) => {
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSend = async () => {
    if (!file && input.trim() === "") return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: input || (file ? `J'ai téléversé mon CV : ${file.name}` : ""),
      fileName: file?.name ?? null,
    };

    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const form = new FormData();
      if (file) form.append("file", file);
      form.append("message", userMessage.text);

      const res = await fetch(apiUrl, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
      }

      const json = await res.json();
      const replyText = json.reply ?? json.message ?? "Aucune réponse reçue du modèle.";

      const assistantMsg: Message = {
        id: `ass-${Date.now()}`,
        role: "assistant",
        text: replyText,
        fileName: null,
      };

      setMessages((m) => [...m, assistantMsg]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: `Erreur lors de l'envoi : ${err.message || String(err)}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!loading) handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-4xl mx-auto p-6">
        <div className="border border-border rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white">
            <h2 className="text-lg font-semibold">Assistant CV — Feedback instantané</h2>
            <div className="text-sm opacity-90">{file ? `Fichier prêt: ${file.name}` : "Aucun CV téléversé"}</div>
          </div>

          {/* Chat area */}
          <div
            className="p-6 bg-card h-[60vh] overflow-y-auto"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-4 flex ${
                  m.role === "assistant" ? "justify-start" : m.role === "user" ? "justify-end" : "justify-center"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    m.role === "assistant"
                      ? "bg-white border"
                      : m.role === "user"
                      ? "bg-gradient-to-br from-primary to-secondary text-white"
                      : "bg-muted-foreground/10 text-muted-foreground"
                  }`}
                >
                  {m.fileName && (
                    <div className="text-xs italic text-muted-foreground mb-1">Fichier: {m.fileName}</div>
                  )}
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%] p-3 rounded-xl bg-white border flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-primary" />
                  <div className="text-sm text-muted-foreground">Le modèle analyse votre CV…</div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-4 items-center">
              {/* Textarea */}
              <div className="flex-1">
                <textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder="Posez une question relative à votre CV (ex: améliorer le résumé, corriger l'orthographe, demander un format ATS)"
  className="w-full resize-none p-3 rounded-md border border-border bg-white focus:outline-none h-20 text-black"
  disabled={loading}
/>

              </div>

              {/* File Upload */}
              <div className="flex flex-col items-center gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="px-3 py-2 rounded-md border border-border hover:bg-border/50 transition"
                  disabled={loading}
                >
                  {file ? "Remplacer CV" : "Téléverser CV"}
                </button>
                <button
                  onClick={() => {
                    handleFileChange(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="text-xs text-muted-foreground"
                  disabled={!file || loading}
                >
                  Supprimer
                </button>
              </div>

              {/* Send Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    loading ? "opacity-60 cursor-not-allowed bg-primary" : "bg-primary hover:brightness-95"
                  }`}
                >
                  {loading ? "Analyse..." : "Envoyer"}
                </button>
              </div>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">Raccourci: Ctrl/⌘ + Enter pour envoyer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
