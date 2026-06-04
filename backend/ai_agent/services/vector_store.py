from services.embedding_service import embed_text
from services.pinecone_client import get_index


def add_code_chunk(id, text, metadata):
    """Store a code chunk in Pinecone using its embedding."""
    index = get_index()
    embedding = embed_text(text)

    index.upsert(
        vectors=[{
            "id": id,
            "values": embedding,
            "metadata": {
                **metadata,
                "text": text,
            },
        }]
    )


def search_code(query_embedding, repo, n_results=5):
    """Query Pinecone for the most relevant code chunks for a repository."""
    index = get_index()

    response = index.query(
        vector=query_embedding,
        top_k=n_results,
        filter={"repo": repo},
        include_metadata=True,
        include_values=False,
    )

    matches = getattr(response, "matches", []) or []

    documents = []
    metadatas = []

    for match in matches:
        metadata = getattr(match, "metadata", None) or {}
        documents.append(metadata.get("text", ""))
        metadatas.append(metadata)

    return {
        "documents": [documents],
        "metadatas": [metadatas],
    }