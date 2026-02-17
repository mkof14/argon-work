"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  direction: "inbound" | "outbound";
  subject: string;
  body: string;
  status: "new" | "read" | "sent";
  createdAt: string;
};

export function MessagingWorkspace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function load() {
    const response = await fetch("/api/messages", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    setMessages(data.messages ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-layout">
      <article className="card">
        <h3>Send Message</h3>
        <div className="step-grid">
          <label className="field"><span>Subject</span><input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} /></label>
          <label className="field"><span>Message</span><textarea className="input area" value={body} onChange={(e) => setBody(e.target.value)} /></label>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn solid"
            onClick={async () => {
              const response = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, body })
              });
              setStatus(response.ok ? "Message sent" : "Failed to send message");
              if (response.ok) {
                setSubject("");
                setBody("");
                await load();
              }
            }}
          >
            Send
          </button>
        </div>
        {status ? <p className="status-ok">{status}</p> : null}
      </article>

      <article className="card">
        <h3>Message Log</h3>
        <div className="message-list">
          {messages.map((message) => (
            <article key={message.id} className={message.direction === "inbound" ? "message-item inbound" : "message-item outbound"}>
              <p><strong>{message.subject}</strong></p>
              <p>{message.body}</p>
              <p className="hint-line">{message.direction} · {message.status} · {new Date(message.createdAt).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}
