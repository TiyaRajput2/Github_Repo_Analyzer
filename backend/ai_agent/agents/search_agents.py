from agents.github_agents import github_agent


async def search_agent(state):

    state["question"] = f"""
Find where the following functionality is implemented:

{state['question']}
"""

    return await github_agent(state)