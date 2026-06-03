from agents.chat_agent import llm


async def router_agent(state):

    question = state["question"]

    prompt = f"""
You are a request classifier for an AI software engineer.

Classify the request into ONE category:

SUMMARY
BUG_FIX
FEATURE_UPDATE
CODE_SEARCH
REFACTOR

Definitions:

SUMMARY:
User wants explanation of repository or code.

BUG_FIX:
User provides error, traceback, logs, or asks to fix a bug.

FEATURE_UPDATE:
User wants to add a new feature.

CODE_SEARCH:
User wants to find where something is implemented.

REFACTOR:
User wants to improve or restructure code.

User request:
{question}

Return ONLY the category name.
"""

    response = await llm.ainvoke(prompt)

    route = response.content.strip().upper()

    print("Router decision:", route)

    return {"route": route}