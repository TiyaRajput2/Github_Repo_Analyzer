from urllib.parse import urlparse


def parse_repo_url(repo_url: str):

    """
    Convert:
    https://github.com/owner/repo
    → owner, repo
    """

    parsed = urlparse(repo_url)

    parts = parsed.path.strip("/").split("/")

    if len(parts) < 2:
        raise ValueError("Invalid GitHub repository URL")

    owner = parts[0]
    repo = parts[1].replace(".git", "")

    return owner, repo