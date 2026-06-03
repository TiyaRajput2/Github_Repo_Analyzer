from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient(
    {
        "github": {
            "command": "python",
            "args": ["mcp_servers/github_server.py"],
            "transport": "stdio",
        }
    }
)

_tools = None


async def load_mcp_tools():
    global _tools

    if _tools is None:
        _tools = await client.get_tools()

    return _tools