from fastapi import FastAPI, HTTPException
from requests import post

app = FastAPI()

CLIENT_ID = "c382d8bbbf134a979779b608c9a4e569"
CLIENT_SECRET = "407035c091134b25adfd0791965f61a1"
ACCESS_TOKEN = ""

@app.on_event("startup")
async def startup_event():
    # connect to DB
    # get token from Spotify
    response = post("https://accounts.spotify.com/api/token", data={"grant_type": "client_credentials"}, auth=(CLIENT_ID, CLIENT_SECRET))
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Unable to get token from Spotify")
    print("Got token from Spotify...")
    ACCESS_TOKEN = response.json()["access_token"]



@app.post("/login")
async def login(username: str, password: str):
    if username == "admin" and password == "admin":
        return {"username": username}
    return {"username": "unknown"}

@app.post("/register")
async def register(username: str, password: str):
    return {"username": username, "password": password}

@app.get("/search")
async def search(query: str, search_type: str):
    if type not in ['track', 'album', 'artist']:
        raise HTTPException(status_code=404, detail="Not a valid search type")
    return {"query": query}