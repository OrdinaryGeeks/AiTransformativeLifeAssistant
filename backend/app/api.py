from http.client import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import os
import subprocess
from pydantic import BaseModel

from typing import List


import subprocess

class Exercise(BaseModel):
    name: str
    sets: List[int]
    reps: List[int]
    weights:List[int]

letters=[]
process = ''

file_path = "workout.txt"


def SetupChatApp():
    global process
    global letters
    parameters = ["--genie-config .\\genie_config.json", "--base-dir .\\"]
    #parameters = ["--genie-config  C:\\Users\\alect\\genie_bundle\\genie_config.json", "--base-dir C:\\Users\\alect\\genie_bundle"]
    executable_path = "./ChatApp.exe"
    powershell_command = ["powershell", "-Command", executable_path] + parameters

    process = subprocess.Popen(powershell_command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)

    i = 0
    j = 0
    for  i  in range(10): 
        row = []
        for j in range(10):
            row.append( "")
        letters.append(row)
    
def QuestionCycle():

    GetNamePrompt()
    GetQuestion()

def GetWelcomeMessage():
    global process
    i = 0
    while True:
        output = process.stdout.readline()

        
        if output == '' and process.poll() is not None:
            print("break")
            break
        elif output:
            print("printing line")
            i+=1
            print(output)
        else:
            print("It didnt fit")
        
        if(i == 7):
            print("Breaking")
            break
def GetNamePrompt():
    global process
    print("GNP")
    i = 0
    while True:

        print(i)
        i+=1
        if(i == 1):
            break
        output = process.stdout.readline()
        print(output)

def GetName():
    global process
    process.stdin.write('nate \n')
    process.stdin.flush()

    i = 1

    while True:
    
        print(i)
        i+=1
        if(i == 6):
            break
        output = process.stdout.readline()
        print(output)
def GetQuestion(question):
    global process
    print(question)
    i = 0
    #user_input = input("What is your question")
    process.stdin.write(question + "\n")
    process.stdin.flush()
    response=""
    foundBotResponse = False
    while True:
        
        print(i)
        i+=1

       # if i==10:
          #  break
    # if(i == 6):
        #    break
        #if i==4:
         #   response = process.stdout.readline()
       #     print("The response is " + response)
       # else:
        
        output = process.stdout.readline()

        print(output + " is before the if statements " + str(i))

        if output.find("<|start_header_id|>assistant<|end_header_id|>") != -1:
            foundBotResponse = True
            output= process.stdout.readline()
            i+=1
            print(output + " is before the if statements " + str(i))
            response = process.stdout.readline()
            print(response + " Is response  because its the line after startheaderid")
            return response
        if foundBotResponse == True:
            if output.find("--------------------------------------------------------------------------------apple") != -1:
            
                print("Breaking in GQ")
                break
        

       # response+=output
        print(output)
    return response





def MakeVertEntry(word, x, y):
    global letters

    print(str(len(letters)))
    print(str(len(letters[0])))
    print(str(len(word)))
    for i in range(len(word)-1):
        print(word[i])
        letters[x][y+i] = word[i]
    print(letters)

def MakeHorEntry(word, x, y):
    global letters
    for i in range(len(word)-1):
        print(word[i])
        letters[x+i][y] = word[i]
    print(letters)


def GetClues():
    global letters
    #start top left corner
    word = GetQuestion("Give me a medium sized word and return only the word in your response")
    word = word.strip()
    print("word is " + word)
    if(len(word) < 10):
        MakeVertEntry(word, 0, 0)

    word = GetQuestion("Give me a medium sized word that starts with " + word[0] + " and return only the word in your response")
    word = word.strip()
    print("word is " + word + str(len(word)))
    if(len(word) < 10):
        MakeHorEntry(word, 0, 0)

    print(letters)

    



SetupChatApp()
GetWelcomeMessage()
GetName()
GetClues()




#GetQuestion()

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


@app.get("/getCrossword", tags=["crossword"])
async def get_crossword():


    return letters

@app.post("/postWorkout", tags=["postWorkout"])
async def post_workout(workout: Exercise):
    
    tempWorkout = ""
    i = 0
    with open(file_path, "w") as file:
        file.write(workout.name )
        file.write("\n")
        for set in workout.sets:
            file.write(str(set) + " set - " + str(workout.reps[i]) + " with weight " + str(workout.weights[i]))
            file.write("\n")





    print(workout)

@app.get("/helpmewithdiet", tags=["diet"])
async def help_me_with_diet():

    return GetQuestion("Recommend me a healthy diet for today in under 50 words")
    

@app.get("/tellmeajoke", tags=["joke"])
async def tell_me_a_joke():
   
    
    
    return GetQuestion("Tell me a joke in under  60 words")

@app.get("/createworkout", tags=["workout"])
async def create_a_workout():
   
 
    return GetQuestion("Give me a full body workout in under 60 words")

@app.get("/givemeadvice", tags=["advice"])
async def give_me_advice():
   
    
    
    return GetQuestion("Give me advice in under 60 words")





    




@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}





#app.mount("/", StaticFiles(directory="./buildFE", html = True))
app.mount("/home", StaticFiles(directory="./_internal/buildFE2", html = True))
#app.mount("/home", SPAStaticFiles(directory="./build/", html=True))