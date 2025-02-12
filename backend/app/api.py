from http.client import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import os


import subprocess



app = FastAPI()


origins = [
    "http://localhost:3000",
    "localhost:3000",
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

#openai.api_key = "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"

#documents = SimpleDirectoryReader("../documents").load_data()
#documents = SimpleDirectoryReader("./documents").load_data()

path = "C:/Users/alect/genie_bundle"


#service_context = ServiceContext.from_defaults(llm=OpenAI(model="gpt-3.5-turbo", temperature=0.5, system_prompt="You are helping to make a decision about whether or not to hire Nathan based upon your companies entered answers of what they are looking for and what they are like.  Also list reasons why you gave your answer"))
#index = VectorStoreIndex.from_documents(documents, service_context=service_context)

#index = VectorStoreIndex.from_documents(documents)


@app.get("/tellmeajoke", tags=["joke"])
async def tell_me_a_joke():

    
    #subprocess.run('cd ' + path, shell=True)
   
    #result = subprocess.run('cd', capture_output = True, shell=True, text=True)
   
    parameters = ["-c genie_config.json", '-p "<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\nWho is the first president of USA<|eot_id|><|start_header_id|>assistant<|end_header_id|>"']


# Execute the command

    executable_path = "./genie-t2t-run.exe"
#parameters = '-c genie_config.json -p "<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\nWho is the first president of USA<|eot_id|><|start_header_id|>assistant<|end_header_id|>"'
# Construct the PowerShell command
    powershell_command = ["powershell", "-Command", executable_path] + parameters


# Construct the PowerShell command
#powershell_command = f'powershell.exe -Command "& {{Start-Process \'{executable_path}\' -ArgumentList \'{parameters}\' -Wait}}"'
#result = subprocess.run( ["powershell", "-Command", 'genie-2t-run.exe -c genie_config.json -p "<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\nWho is the first president of USA<|eot_id|><|start_header_id|>assistant<|end_header_id|>"'],  capture_output = True, text=True)
    result = subprocess.run(powershell_command, capture_output=True, text=True)
    
    return result.stdout


    




@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}





#app.mount("/", StaticFiles(directory="./buildFE", html = True))
app.mount("/home", StaticFiles(directory="./_internal/buildFE2", html = True))
#app.mount("/home", SPAStaticFiles(directory="./build/", html=True))