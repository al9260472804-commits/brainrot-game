from fastapi import FastAPI
from pydantic import BaseModel
import json

app = FastAPI()

# База данных (потом заменишь на PostgreSQL)
users_db = {}

class UserData(BaseModel):
    user_id: int
    username: str
    energy: int
    cards: list
    rating: int
    gold: int

@app.get("/")
def read_root():
    return {"message": "Brainrot Stealer API работает!"}

@app.post("/save")
def save_user_data(data: UserData):
    """Сохраняем данные пользователя"""
    users_db[data.user_id] = data.dict()
    return {"status": "success", "user_id": data.user_id}

@app.get("/user/{user_id}")
def get_user_data(user_id: int):
    """Получаем данные пользователя"""
    if user_id in users_db:
        return users_db[user_id]
    return {"error": "User not found"}

@app.get("/leaderboard")
def get_leaderboard():
    """Топ 10 игроков"""
    users = list(users_db.values())
    sorted_users = sorted(users, key=lambda x: x['rating'], reverse=True)[:10]
    return sorted_users

# Запуск: uvicorn server:app --reload --port 8000
