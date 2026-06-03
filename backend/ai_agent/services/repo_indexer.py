from services.embedding_service import embed_text
from services.vector_store import add_code_chunk
from services.chunking_service import chunk_code

from tools.mcp_client import load_mcp_tools


def normalize_content(content):

    if isinstance(content, str):
        return content

    if isinstance(content, dict):
        return content.get("text", "")

    if isinstance(content, list):
        texts = []
        for item in content:
            if isinstance(item, dict):
                texts.append(item.get("text", ""))
            else:
                texts.append(str(item))
        return "\n".join(texts)

    return str(content)

def normalize_metadata_value(value):
    """
    Convert structured LangChain values to primitive types.
    """

    if isinstance(value, (str, int, float, bool)) or value is None:
        return value

    if isinstance(value, dict):
        return value.get("text", str(value))

    if isinstance(value, list):
        return [normalize_metadata_value(v) for v in value]

    return str(value)


async def index_repository(owner, repo):

    tools = await load_mcp_tools()

    tool_map = {t.name: t for t in tools}

    tree_tool = tool_map["get_repo_tree"]
    read_tool = tool_map["read_file"]

    files = await tree_tool.ainvoke({
        "owner": owner,
        "repo": repo
    })

    for path in files[:200]:

        content = await read_tool.ainvoke({
            "owner": owner,
            "repo": repo,
            "path": path
        })

        content = normalize_content(content)

        if not content:
            continue

        chunks = chunk_code(content)

        for i, chunk in enumerate(chunks):

            embedding = embed_text(chunk)
            metadata = {
                    "owner": normalize_metadata_value(owner),
                    "repo": normalize_metadata_value(repo),
                    "path": normalize_metadata_value(path),
                    "chunk": i
                }
            add_code_chunk(
                id=f"{owner}_{repo}_{path}_{i}",
                text=chunk,
                metadata = metadata
            )