#!/usr/bin/ptyhon
# *-* coding: utf-8 *-*


# pip install PyGithub=1.59.0
from github import Github

ACCESS_TOKEN = ""

g = Github(ACCESS_TOKEN)

repos = g.get_user().get_repos()

for repo in repos:
    print(repo.name)

rep = g.get_user().get_repos()[0]

rep.fetch()

