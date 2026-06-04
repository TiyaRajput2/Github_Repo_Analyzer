import { useState } from "react";

export default function RepoForm({ onSubmit, isLoading = false }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [question, setQuestion] = useState("");

  const fieldClassName =
    "w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 text-white shadow-inner shadow-black/30 outline-none transition placeholder:text-slate-400 focus:border-cyan-400/60 focus:bg-slate-950/65 disabled:cursor-not-allowed disabled:opacity-60";
  const tipExamples = ["Summarize this repo", "Show the main architecture", "Find likely bugs and risks"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoading) return;

    onSubmit({
      repoUrl,
      question,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">Analyze a repository</p>
        <h3 className="text-xl font-semibold text-white">Start the AI review</h3>
        <p className="text-sm text-slate-200/80">Paste the GitHub URL and ask a question to get a focused analysis.</p>
      </header>

      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">Repository URL</label>
        <input
          className={fieldClassName}
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">Question</label>
        <textarea
          className={`${fieldClassName} min-h-32 resize-y`}
          placeholder="Ask about features, bugs, structure, or code patterns..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="space-y-1">
          <p className="text-sm text-slate-300">Try one of these prompts:</p>
          <div className="flex flex-wrap gap-2">
            {tipExamples.map((tip) => (
              <button
                key={tip}
                type="button"
                onClick={() => setQuestion(tip)}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/12"
              >
                {tip}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"></span>
              Analyzing...
            </>
          ) : (
            "Analyze Repo"
          )}
        </button>
      </div>
    </form>
  );
}