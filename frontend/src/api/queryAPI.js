import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const queryRepo = async (repoUrl, question) => {
  const response = await API.post("/query", {
    repo_url: repoUrl,
    question: question,
  });

  return response.data;
};