from mcp.server.fastmcp import FastMCP
import httpx
import base64
import os
from dotenv import load_dotenv

load_dotenv()

mcp = FastMCP("github-tools")

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json",
}

@mcp.tool()
async def get_repo_tree(owner: str, repo: str):

    if isinstance(owner, dict):
        owner = owner.get("text")

    if isinstance(repo, dict):
        repo = repo.get("text")

    async with httpx.AsyncClient() as client:

        repo_info = await client.get(
            f"https://api.github.com/repos/{owner}/{repo}",
            headers=headers
        )

        repo_data = repo_info.json()

        branch = repo_data.get("default_branch", "main")

        tree_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"

        res = await client.get(tree_url, headers=headers)

    data = res.json()

    if "tree" not in data:
        return {"error": data}

    files = [
        item["path"]
        for item in data["tree"]
        if item["type"] == "blob"
    ]

    return files[:1000]


@mcp.tool()
async def read_file(owner: str, repo: str, path):

    # Fix: convert structured tool inputs
    if isinstance(path, dict):
        path = path.get("text") or path.get("path")

    if not isinstance(path, str):
        return {"error": f"Invalid path type: {type(path)}"}

    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"

    async with httpx.AsyncClient() as client:
        res = await client.get(url, headers=headers)

    data = res.json()

    if "content" not in data:
        return {
            "error": "Failed to fetch file",
            "github_response": data
        }

    try:
        content = base64.b64decode(data["content"]).decode()
    except Exception as e:
        return {"error": f"decode error: {str(e)}"}

    return content[:15000]

@mcp.tool()
async def search_repo_code(owner: str, repo: str, query: str):
    """
    Search code inside a specific repository.
    """

    url = f"https://api.github.com/search/code?q={query}+repo:{owner}/{repo}"

    async with httpx.AsyncClient() as client:
        res = await client.get(url, headers=headers)

    data = res.json()

    if "items" not in data:
        return {
            "error": "Search failed",
            "github_response": data
        }

    results = []

    for item in data["items"][:10]:
        results.append({
            "path": item["path"],
            "url": item["html_url"]
        })

    return results

@mcp.tool()
async def get_readme(owner: str, repo: str):

    url = f"https://api.github.com/repos/{owner}/{repo}/readme"

    async with httpx.AsyncClient() as client:
        res = await client.get(url, headers=headers)

    data = res.json()

    # Handle errors safely
    if "content" not in data:
        return {
            "error": "README not found or API error",
            "github_response": data
        }

    try:
        content = base64.b64decode(data["content"]).decode()
    except Exception as e:
        return {"error": f"decode error: {str(e)}"}

    return content[:15000]

@mcp.tool()
async def get_file_metadata(owner: str, repo: str, path: str):

    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"

    async with httpx.AsyncClient() as client:
        res = await client.get(url, headers=headers)

    data = res.json()

    return {
        "name": data.get("name"),
        "path": data.get("path"),
        "size": data.get("size"),
        "download_url": data.get("download_url")
    }
    
@mcp.tool()
async def list_repo_dirs(owner: str, repo: str):

    files = await get_repo_tree(owner, repo)

    dirs = set()

    for f in files:
        parts = f.split("/")
        if len(parts) > 1:
            dirs.add(parts[0])

    return list(dirs)

if __name__ == "__main__":
    mcp.run()