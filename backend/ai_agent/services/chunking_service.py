def chunk_code(text: str, chunk_size: int = 800, overlap: int = 100):
    """
    Split code into overlapping chunks for better semantic search.
    """

    chunks = []

    start = 0
    text_length = len(text)

    while start < text_length:

        end = start + chunk_size

        chunk = text[start:end]

        chunks.append(chunk)

        start += chunk_size - overlap

    return chunks