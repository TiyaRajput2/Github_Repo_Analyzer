import { useState } from "react";
import RepoForm from "./component/RepoForm";
import ChatWindow from "./component/ChatWindow";
import { queryRepo } from "./api/queryAPI";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const normalizeAnswer = (response) => {
    if (typeof response === "string") return response;

    if (response && typeof response === "object") {
      if (typeof response.answer === "string") return response.answer;
      if (typeof response.response === "string") return response.response;
    }

    return JSON.stringify(response, null, 2);
  };

  const handleAsk = async ({
    repoUrl,
    question,
  }) => {
    if (!repoUrl?.trim() || !question?.trim()) return;

    setIsLoading(true);

    try {
      const response = await queryRepo(repoUrl, question);

      setMessages((prev) => [
        ...prev,
        {
          question,
          answer: normalizeAnswer(response),
        },
      ]);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Unable to analyze this repository right now.";

      setMessages((prev) => [
        ...prev,
        {
          question,
          answer: `Sorry, the analysis failed. ${message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-white/10 bg-white/8 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="inline-flex w-fit items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-semibold tracking-wide text-cyan-100">AI GitHub Repo Assistant</p>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Understand any repository with a simple conversation.</h1>
              <p className="text-lg text-slate-200/90">Paste a GitHub URL, ask what you need, and get clear answers about structure, files, and code context in seconds.</p>
            </div>

          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-7">
            <RepoForm onSubmit={handleAsk} isLoading={isLoading} />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-7">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Conversation</h2>
                <p className="text-sm text-slate-200/80">Your questions and AI answers appear here.</p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">Live</span>
            </div>
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;