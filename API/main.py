from fastapi import FastAPI, HTTPException

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

@app.get("/search")
async def search(query: str, type: str):
    if type not in ['track', 'album', 'artist', 'playlist']:
        raise HTTPException(status_code=400, detail="Not a valid search type")
    return {"query": query}