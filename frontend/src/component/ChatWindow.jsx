import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const buildChartData = (answer = "") => {
  const words = answer
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3);

  const counts = new Map();

  words.forEach((word) => {
    counts.set(word, (counts.get(word) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
};

export default function ChatWindow({ messages, isLoading = false }) {
  if (!messages.length && !isLoading) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/30 p-5 text-sm text-slate-300">
        No questions yet. Submit a repository URL and ask your first question to see the AI analysis here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/40 p-5 text-sm text-slate-100 shadow-inner shadow-cyan-500/10">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-200/30 border-t-cyan-200"></span>
            <p className="font-medium text-cyan-100">Please wait while the AI analyzes your repository…</p>
          </div>
          <p className="mt-2 text-slate-300">This may take a few seconds depending on the size of the repo and the response time from the API.</p>
        </div>
      ) : null}
      {messages.map((msg, index) => {
        const chartData = buildChartData(msg.answer);

        return (
          <article key={index} className="space-y-3">
            <div className="ml-auto max-w-[90%] rounded-2xl bg-cyan-400/15 p-4 text-slate-100 shadow-lg shadow-cyan-500/10">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">You</p>
              <p className="mt-1 text-sm text-slate-100">{msg.question}</p>
            </div>

            <div className="mr-auto max-w-[95%] rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-slate-100 shadow-lg shadow-black/20">
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">AI</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-100">{msg.answer}</p>

              {chartData.length > 0 ? (
                <div className="mt-4 rounded-2xl border border-white/8 bg-slate-900/80 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">Response Highlights</p>
                    <span className="text-[11px] text-slate-300">Top keyword frequency</span>
                  </div>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#cbd5e1", fontSize: 11 }} />
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#cbd5e1", fontSize: 11 }} />
                        <Tooltip cursor={{ fill: "rgba(56, 189, 248, 0.08)" }} />
                        <Bar dataKey="count" fill="#67e8f9" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}