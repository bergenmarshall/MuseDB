import os
import shutil

for line in open("requirements.txt", "r").readlines(): 
    try:
        __import__(line.strip())
    except ImportError as e:
        print("Installing " + line.strip())
        os.system("pip install " + line.strip()) # install requirements

current_directory = os.getcwd() # create DB if it doesnt exist
db_directory = os.path.join(current_directory, r'DB')
if not os.path.exists(db_directory):
   os.makedirs(db_directory)
   shutil.copyfile("Setup_DB/users.csv", "DB/users.csv")
   shutil.copyfile("Setup_DB/reviews.csv", "DB/reviews.csv")
   print("Directory DB created")   
else:
    print("Directory DB already exists, skipping creation")

config_directory = os.path.join(current_directory, r'config.yml') # create config.yml if it doesnt exist
if not os.path.exists(config_directory):
    with open("config.yml", "w") as f:
        print("Input CLIENT SECRET: ")
        CLIENT_SECRET = input()
        f.write(f"CLIENT_SECRET: {CLIENT_SECRET}\n")
    print("config.yml created")
else:
    print("config.yml already exists, skipping creation")

os.chdir("API") # start API
print("API starting. Navigate to http://127.0.0.1:8000/docs to view endpoints running\n")
os.system("python -m uvicorn main:app --reload")


