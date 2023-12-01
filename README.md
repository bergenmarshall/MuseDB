# MuseDB
## Setup For Developement Guide
- Have a working instance of python
- Install our python packages using 'pip install -r requirements.txt'
- Run the command 'uvicorn main:app --reload' from the API directory
- If this does not work, you may need to run 'python -m uvicorn main:app --reload'
- The API should now be running. Look at the result of the uvicorn function to learn where
- If you want to see a good view of our endpoints and test them, check out the /docs page, where swagger is hooked up
