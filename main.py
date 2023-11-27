from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/login")
async def login(username: str, password: str):
    if username == "admin" and password == "admin":
        return {"username": username}
    return {"username": "unknown"}

@app.post("/register")
async def register(username: str, password: str):
    return {"username": username, "password": password}