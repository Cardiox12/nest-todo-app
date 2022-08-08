import requests
import string
import random

users = ["bbellavi", "mvo-van-", "lvirgini", "lperson-", "eassouli"]
CHARSET = f"{string.ascii_letters}{string.digits}"
URL = "http://localhost:3000/users"

def gen_password(max: int) -> str:
    return "".join([random.choice(CHARSET) for _ in range(random.randint(5, max))])

def populate_users():
    for username in users:
        password = gen_password(20)
        response = requests.post(URL, data={
            "username": username,
            "password": password
        })

        if response.ok:
            print(f"User(username={username} password={password}) created successfuly!")
        else:
            print("Failure during request!")
            exit(1)

def get_users():
    response = requests.get(URL)

    if response.ok:
        return response.json()
    return []

def populate_tasks():
    tasks = [
        "faire à manger", "faire la vaisselle", "sortir le chien",
        "faire les papiers", "réparer la voiture", "finir transcendence",
        "jouer au loto", "s'inscrire à 42", "faire visa pour le canada",
        "vider la litière", "finir de lire le livre"
    ]
    for user in get_users():
        if user_id := user.get("user_id"):
            for _ in range(random.randint(len(tasks) // 2, len(tasks))):
                task = random.choice(tasks)

                response = requests.post(f"{URL}/{user_id}/tasks", data={
                    "content" : task,
                    "status" : "todo"
                })

