import requests
import json

USERNAME = "Nanda-Aiaz"

repos = requests.get(
    f"https://api.github.com/users/{USERNAME}/repos"
).json()

projects = []

for repo in repos:
    projects.append({
        "name": repo["name"],
        "description": repo["description"],
        "url": repo["html_url"],
        "language": repo["language"]
    })

with open("projects.json", "w") as f:
    json.dump(projects, f, indent=2)

print("Projects updated!")