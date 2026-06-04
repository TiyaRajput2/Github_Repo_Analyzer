import os

from pinecone import Pinecone


_index = None


def get_index():
    """Create and cache a Pinecone index client."""
    global _index

    if _index is not None:
        return _index

    api_key = os.getenv("PINECONE_API_KEY")
    index_name = os.getenv("PINECONE_INDEX")

    if not api_key or not index_name:
        raise RuntimeError(
            "Missing Pinecone configuration. Set PINECONE_API_KEY and PINECONE_INDEX."
        )

    pc = Pinecone(api_key=api_key)
    _index = pc.Index(index_name)
    return _index