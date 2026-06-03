export default function ChatWindow({ messages }) {
  if (!messages.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/30 p-5 text-sm text-slate-300">
        No questions yet. Submit a repository URL and ask your first question to see the AI analysis here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <article key={index} className="space-y-3">
          <div className="ml-auto max-w-[90%] rounded-2xl bg-cyan-400/15 p-4 text-slate-100 shadow-lg shadow-cyan-500/10">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">You</p>
            <p className="mt-1 text-sm text-slate-100">{msg.question}</p>
          </div>

          <div className="mr-auto max-w-[95%] rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-slate-100 shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-200">AI</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-100">{msg.answer}</p>
          </div>
        </article>
      ))}
    </div>
  );
}