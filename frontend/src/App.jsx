import { useMemo, useState } from "react";
import RepoForm from "./component/RepoForm";
import ChatWindow from "./component/ChatWindow";
import PanelCard from "./component/ui/PanelCard";
import { queryRepo } from "./api/queryAPI";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const quickTips = useMemo(
    () => [
      "Summarize the architecture and key modules",
      "Find potential bugs, risks, or missing tests",
      "Explain how the repo is structured and where to start",
    ],
    [],
  );

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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <PanelCard as="section" className="p-8 md:p-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="inline-flex w-fit items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-semibold tracking-[0.25em] text-cyan-100 uppercase">
                AI GitHub Repo Assistant
              </p>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Understand any repository with a simple conversation.
              </h1>
              <p className="max-w-xl text-lg text-slate-200/90">
                Paste a GitHub URL, ask what you need, and get clear answers about structure, files, and code context in seconds.
              </p>
            </div>

            <ul className="grid gap-3 text-sm text-slate-100 md:grid-cols-3 xl:min-w-[420px] xl:grid-cols-1">
              {quickTips.map((tip) => (
                <li
                  key={tip}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 shadow-inner shadow-black/25"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </PanelCard>

        <section className="grid gap-8">
          <PanelCard className="p-6 md:p-7">
            <RepoForm onSubmit={handleAsk} isLoading={isLoading} />
          </PanelCard>

          <PanelCard className="flex h-full flex-col p-6 md:p-7">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-white">Conversation</h2>
              <p className="text-sm text-slate-200/80">Your questions and AI answers appear here.</p>
            </div>
            <div className="min-h-[420px] flex-1 rounded-2xl border border-white/8 bg-slate-950/25 p-3">
              <ChatWindow messages={messages} isLoading={isLoading} />
            </div>
          </PanelCard>
        </section>
      </div>
    </main>
  );
}

export default App;