export default function ChatWindow({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <div key={index}>
          <div>
            <strong>User:</strong>
            {msg.question}
          </div>

          <div>
            <strong>AI:</strong>
            {msg.answer}
          </div>
        </div>
      ))}
    </div>
  );
}