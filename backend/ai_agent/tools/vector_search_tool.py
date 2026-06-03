from langchain.tools import tool

from services.embedding_service import embed_text
from services.vector_store import search_code


@tool
def vector_search_code(query: str, repo: str):
    """
    Perform semantic search over repository code using vector embeddings.
    Returns the most relevant code chunks and file paths.
    """

    embedding = embed_text(query)

    results = search_code(embedding, repo)

    docs = results["documents"][0]
    metas = results["metadatas"][0]

    output = []

    for doc, meta in zip(docs, metas):

        output.append({
            "path": meta["path"],
            "chunk": meta["chunk"],
            "code": doc[:2000]
        })

    return output