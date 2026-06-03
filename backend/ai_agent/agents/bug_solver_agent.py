from agents.github_agents import github_agent


async def bug_solver_agent(state):

    state["question"] = f"""
Debug the following issue:

{state['question']}

Locate relevant files and suggest fixes.
"""

    return await github_agent(state)