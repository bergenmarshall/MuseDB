# MuseDB
## Setup For Developement Guide
- Have a working instance of python
- Acquire our Client Secret, should be in the repository in Repository Secrets
- Run our setup.py script. This should create the local DB as well as install our dependancies (may have to use 'python ./setup.py')
    - During this scripts execution, if this is your first time setting up, it will ask you for our client secret, please input it
    - If that does not work, here is the step-by-step guide of what it is doing so follow that
        - Install our python packages using 'pip install -r requirements.txt'
        - Acquire our Client Secret, should be in the repository in Repository Secrets
            - Place the client secret in a yaml file in the main directory titled "config.yml"
            - The secret should correspond to "CLIENT_SECRET"
            - The final result should look something like this, with the Xs replaced with the client secret

            ![Alt text](setupYAML.png)
        - Copy the Setup_DB folder to a folder named 'DB' to get a local DB
        - Run the command 'uvicorn main:app --reload' from the API directory
            - If this does not work, you may need to run 'python -m uvicorn main:app --reload'
- The API should now be running. Look at the result of the uvicorn function to learn where, but it is usually 127.0.0.1:8000
- If you want to see a good view of our endpoints and test them, check out the /docs page, where swagger is hooked up. (127.0.0.1:8000/docs)
