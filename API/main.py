from fastapi import FastAPI, HTTPException
from requests import post, get
import yaml

app = FastAPI()

with open("config.yml", "r") as f:
    config = yaml.safe_load(f)

CLIENT_ID = "44c406646f0c4b289780822a3f64724e"
CLIENT_SECRET = config["CLIENT_SECRET"]

async def get_token():
    response = post("https://accounts.spotify.com/api/token", data={"grant_type": "client_credentials"}, auth=(CLIENT_ID, CLIENT_SECRET))
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Unable to get token from Spotify")
    return response.json()["access_token"]

@app.on_event("startup")
async def startup_event():
    # connect to DB Here
    pass

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
    if search_type not in ['track', 'album', 'artist']:
        raise HTTPException(status_code=404, detail="Not a valid search type")
    access_token = await get_token()
    response = get(f"https://api.spotify.com/v1/search?q={query}&type={search_type}&limit=5", headers={"Authorization": f"Bearer {access_token}"})
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Unable to get search results")
    
    return_val = {}
    if search_type == "track":
        for i in response.json()["tracks"]["items"]:
            return_val[i["id"]] = {"name": i["name"], "artist": i["artists"][0]["name"], "album": i["album"]["name"] ,"image": i["album"]["images"][0]["url"]}
    elif search_type == "album":
        for i in response.json()["albums"]["items"]:
            return_val[i["id"]] = {"name": i["name"], "artist": i["artists"][0]["name"], "image": i["images"][0]["url"]}
    elif search_type == "artist":
        for i in response.json()["artists"]["items"]:
            return_val[i["id"]] = {"name": i["name"], "image": i["images"][0]["url"]}
    return return_val