import { useState } from "react";

export default function RepoForm({ onSubmit }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      repoUrl,
      question,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">Repository URL</label>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 shadow-inner shadow-black/30 outline-none ring-0 transition focus:border-cyan-400/60 focus:bg-slate-950/60"
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">Question</label>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 shadow-inner shadow-black/30 outline-none transition focus:border-cyan-400/60 focus:bg-slate-950/60"
          placeholder="Ask about features, bugs, structure, or code patterns..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-sm text-slate-300">Tip: try “Summarize this repo” or “Show the main architecture.”</p>
        <button className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-400/30">
          Analyze Repo
        </button>
      </div>
    </form>
  );
}