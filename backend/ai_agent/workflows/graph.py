from langgraph.graph import StateGraph, END


from agents.router_agent import router_agent
from agents.summary_agent import summary_agent
from agents.bug_solver_agent import bug_solver_agent
from agents.feature_agent import feature_agent
from agents.search_agents import search_agent

from typing import TypedDict, Optional


class AgentState(TypedDict):

    repo_url: str

    owner: str
    repo: str

    question: str

    route: Optional[str]

    answer: Optional[str]
    
workflow = StateGraph(AgentState)

workflow.add_node("router", router_agent)
workflow.add_node("summary_agent", summary_agent)
workflow.add_node("bug_solver_agent", bug_solver_agent)
workflow.add_node("feature_agent", feature_agent)
workflow.add_node("search_agent", search_agent)


def route_decision(state):

    route = state.get("route", "").strip().upper()

    if route == "SUMMARY":
        return "summary_agent"

    elif route == "BUG_FIX":
        return "bug_solver_agent"

    elif route == "FEATURE_UPDATE":
        return "feature_agent"

    elif route == "CODE_SEARCH":
        return "search_agent"

    else:
        return "summary_agent"


workflow.set_entry_point("router")

workflow.add_conditional_edges(
    "router",
    route_decision,
)

workflow.add_edge("summary_agent", END)
workflow.add_edge("bug_solver_agent", END)
workflow.add_edge("feature_agent", END)
workflow.add_edge("search_agent", END)

graph = workflow.compile()