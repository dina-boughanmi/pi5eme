import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function AIAgent() {
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
      // Ici tu peux remplacer par ton backend OpenAI ou API
      // Simulation réponse AI avec timeout
      setTimeout(() => {
        const aiMessage: Message = {
          role: "ai",
          text: `AI Response to: "${userMessage.text}"`
        };
        setMessages((prev) => [...prev, aiMessage]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🤖 AI Agent</h1>

      <Card className="flex-1 mb-6 flex flex-col">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center">Start the conversation...</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"}`}
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
