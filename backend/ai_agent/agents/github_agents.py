from langchain.agents import create_agent

from agents.chat_agent import llm
from tools.mcp_client import load_mcp_tools
from tools.vector_search_tool import vector_search_code

agent = None


async def github_agent(state):

    global agent

    if agent is None:
        tools = await load_mcp_tools()
        tools.append(vector_search_code)
        agent = create_agent(
            model=llm,
            tools=tools
        )

    question = state["question"]
    owner = state["owner"]
    repo = state["repo"]

    result = await agent.ainvoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content":f"""
Repository:
{owner}/{repo}

User request:
{question}

Tool usage rules:

- path MUST be a string
- owner MUST be a string
- repo MUST be a string

Example:
read_file(owner="openai", repo="openai-python", path="src/main.py")

Preferred workflow:
1. vector_search_code
2. search_repo_code
3. read_file
4. Provide answer only asked by the user.
5. Do not provide any extra information in answer.
6. Do not add unnecessary things in answer. Be concise and to the point.
7. If you are not sure about the answer, say you don't know instead of making up something
"""
                }
            ]
        }
    )

    return {"answer": result["messages"][-1].content}