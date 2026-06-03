from langchain_openai import ChatOpenAI
from config.settings import MODEL,BASE_URL,OPENAI_API_KEY

llm = ChatOpenAI(
    model=MODEL,
    base_url=BASE_URL,
    api_key=OPENAI_API_KEY,
)
async def chat_agent(state):
    print("calling chat agent")
    question = state["question"]
    response = await llm.ainvoke(question)
    return {"answer": response.content}