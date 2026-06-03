import chromadb

from chromadb.config import Settings

client = chromadb.Client(
    Settings(
        persist_directory="./vector_db"
    )
)

collection = client.get_or_create_collection(
    name="repo_code"
)


def add_code_chunk(id, text, metadata):

    collection.add(
        documents=[text],
        metadatas=[metadata],
        ids=[id]
    )


def search_code(query_embedding, repo, n_results=5):

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where={"repo": repo}
    )

    return results