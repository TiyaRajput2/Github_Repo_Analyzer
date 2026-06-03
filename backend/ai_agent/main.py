from fastapi import FastAPI
from pydantic import BaseModel

from services.repo_utils import parse_repo_url
from workflows.graph import graph

app = FastAPI()


class QueryRequest(BaseModel):
    repo_url: str
    question: str


from services.repo_indexer import index_repository

indexed_repos = set()


@app.post("/query")
async def query_repo(req: QueryRequest):

    owner, repo = parse_repo_url(req.repo_url)

    if f"{owner}/{repo}" not in indexed_repos:

        await index_repository(owner, repo)

        indexed_repos.add(f"{owner}/{repo}")

    state = {
        "repo_url": req.repo_url,
        "owner": owner,
        "repo": repo,
        "question": req.question
    }

    result = await graph.ainvoke(state)

    return result