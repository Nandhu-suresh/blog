import { useState } from "react";
import { getGeminiResponse } from "../services/gemini";

const ChatBot = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input immediately for better UX
    setInput("");
    setLoading(true);

    const reply = await getGeminiResponse(input);

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: reply },
    ]);

    setLoading(false);
  };

  return (
    <div style={styles.chatBox}>
      <div style={styles.header}>
        <h3 style={styles.title}>🤖 AI Chatbot</h3>
        <button onClick={onClose} style={styles.closeBtn}>×</button>
      </div>

      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "15px",
              background: msg.role === "user" ? "#007bff" : "#f1f1f1",
              color: msg.role === "user" ? "#fff" : "#333",
              maxWidth: "80%",
              wordWrap: "break-word"
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Bot is typing...</p>}
      </div>

      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          style={styles.input}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatBox: {
    width: "350px",
    position: "fixed",
    bottom: "80px", // Moved up to avoid covering the toggle button if we had one at bottom-right, but here it's fine.
    right: "20px",
    border: "1px solid #e0e0e0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    padding: "0",
    background: "#fff",
    borderRadius: "12px",
    zIndex: 1000,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "1rem",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0 5px",
  },
  messages: {
    height: "300px",
    overflowY: "auto",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
  },
  inputArea: {
    padding: "10px",
    borderTop: "1px solid #f0f0f0",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    outline: "none",
  },
  sendBtn: {
    padding: "8px 15px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ChatBot;
