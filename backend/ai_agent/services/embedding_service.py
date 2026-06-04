from functools import lru_cache

from sentence_transformers import SentenceTransformer


@lru_cache(maxsize=1)
def get_model():
    """Load and cache the embedding model once per worker."""
    return SentenceTransformer("all-MiniLM-L6-v2")


def embed_text(text: str):
    """Generate embeddings for a single text chunk."""
    if not isinstance(text, str) or not text.strip():
        return []

    return get_model().encode(text, normalize_embeddings=True).tolist()