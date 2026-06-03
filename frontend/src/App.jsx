import { useState } from "react";
import RepoForm from "./component/RepoForm"
import ChatWindow from "./component/ChatWindow"
import { queryRepo } from "./api/queryAPI"

function App() {
  const [messages, setMessages] = useState([]);

  const handleAsk = async ({
    repoUrl,
    question,
  }) => {
    const response = await queryRepo(
      repoUrl,
      question
    );

    setMessages((prev) => [
      ...prev,
      {
        question,
        answer: JSON.stringify(response),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">
        GitHub Repo Analyzer
      </h1>

      <RepoForm onSubmit={handleAsk} />

      <ChatWindow messages={messages} />
    </div>
  );
}

export default App;