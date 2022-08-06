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


