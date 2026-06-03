from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
MODEL = "openai/gpt-5-nano"
BASE_URL ="https://openrouter.ai/api/v1"