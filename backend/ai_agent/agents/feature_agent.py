from agents.github_agents import github_agent


async def feature_agent(state):

    state["question"] = f"""
Implement the following feature:

{state['question']}

Locate relevant modules and suggest code changes.
"""

    return await github_agent(state)