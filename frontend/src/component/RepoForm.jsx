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
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        className="border p-2 w-full"
        placeholder="GitHub Repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2"
      >
        Ask
      </button>
    </form>
  );
}