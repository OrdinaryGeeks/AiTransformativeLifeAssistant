from http.client import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import os
import subprocess
from pydantic import BaseModel

from typing import List
import random

import subprocess

class Exercise(BaseModel):
    name: str
    sets: List[int]
    reps: List[int]
    weights:List[int]

letters=[]
words = []
possibleHorizontal = []
possibleVertical = []
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


def ResetLetters():
    global letters
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
            
            break
        elif output:
            
            i+=1
            
        
            
        
        if(i == 7):
            
            break
def GetNamePrompt():
    global process
    
    i = 0
    while True:

        
        i+=1
        if(i == 1):
            break
        output = process.stdout.readline()
       

def GetName():
    global process
    process.stdin.write('nate \n')
    process.stdin.flush()

    i = 1

    while True:
    
        
        i+=1
        if(i == 6):
            break
        output = process.stdout.readline()

def GetQuestionWithList(question):
    global process
    print(question)
    i = 0
    #user_input = input("What is your question")
    process.stdin.write(question + "\n")
    process.stdin.flush()
    response=""
    foundBotResponse = False

    words=["apple", "banana"]
    while True:
        
       
        i+=1


        
        output = process.stdout.readline()

        print(output + " " + str(i))
        if output.find("--------------------------------------------------------------------------------apple") != -1:
            
                
            break

        #print(output + " is before the if statements " + str(i))

        """ if output.find("<|start_header_id|>assistant<|end_header_id|>") != -1:
            foundBotResponse = True
            newline1= process.stdout.readline()
            dashline=process.stdout.readline()
            newline2 = process.stdout.readline();
           
        elif foundBotResponse == True:
            if output.find("--------------------------------------------------------------------------------apple") != -1:
            
                
                break
            else:
                words.append(process.stdout.readline())
         """
        

       # response+=output
        print(words)
    return words
        
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
        
       
        i+=1


        
        output = process.stdout.readline()

        #print(output + " is before the if statements " + str(i))

        if output.find("<|start_header_id|>assistant<|end_header_id|>") != -1:
            foundBotResponse = True
            output= process.stdout.readline()
            i+=1
           # print(output + " is before the if statements " + str(i))
            response = process.stdout.readline()
            print(response + " Is response  because its the line after startheaderid")
            return response
        if foundBotResponse == True:
            if output.find("--------------------------------------------------------------------------------apple") != -1:
            
                
                break
        

       # response+=output
        print(output)
    return response





def MakeVertEntry(word, x, y):
    global letters

    #print(str(len(letters)))
    #print(str(len(letters[0])))
    #print(str(len(word)))
    for i in range(len(word)):
        print(word[i])
        letters[x][y+i] = word[i]
    #print(letters)

def MakeHorEntry(word, x, y):
    global letters
    for i in range(len(word)):
     #   print(word[i])
        letters[x+i][y] = word[i]
    #print(letters)




def GetWordsToScramble():
    global words

    response = GetQuestionWithList("Give me 10 medium sized words. Before you return the word, return two # signs.  Then return each word on a separate line with no other text.")



    words = response
    #lines = response.split("\n")

   # for line in lines:
    #    words.append(line.split(" ")[1])

    print(words)


def find_indices_2d(lst, condition):
    """
    Returns the indices of elements in a 2D list that satisfy a given condition.

    Parameters:
    lst (list of list of any): The 2D list to search through.
    condition (function): A lambda function representing the condition to satisfy.

    Returns:
    list of tuple: A list of tuples where each tuple is (row_index, col_index).
    """
    indices = []
    for i, row in enumerate(lst):
        for j, element in enumerate(row):
            if condition(element):
                indices.append((i, j, element))
    return indices

def GetClues():
    global letters
    global possibleVertical
    global possibleHorizontal

    ResetLetters()
    #start top left corner
    word = GetQuestion("Give me a medium sized word and return only the word in your response and return only the word on a line by itself")
    word = word.strip()
    print("word is " + word)
    if(len(word) < 10):
        MakeVertEntry(word, 0, 0)
    word = GetQuestion("Give me a medium sized word that starts with " + word[0] + " and return only the word in your response and return only the word on a line by itself")
    word = word.strip()
    
    print("word is " + word + str(len(word)))
    if(len(word) < 10):
        MakeHorEntry(word, 0, 0)

    tries = 0
    while tries < 10:

        print(str(tries) + " is tries")
        GetMoreClues()

     #   print(possibleHorizontal)
      #  print(possibleVertical)

        orientation = random.randint(1, 2)
        tries+=1
        if(orientation == 1) : 
            condition = lambda x: x > 5
            horizons = find_indices_2d(possibleHorizontal, condition)
            #print(horizons)
            if(len(horizons) > 1):
                chosen= random.randint(1, len(horizons))
            if(len(horizons) == 0):
                continue
            if(len(horizons) == 1):
                chosen = 1
            if(horizons[chosen-1][2] > 5) :
                letter = letters[horizons[chosen-1][0]][horizons[chosen-1][1]]
                word = GetQuestion("Give me a word that has less than " + str(horizons[chosen-1][2]) + " letters and starts with a "+ letter + " and return only the word in your response on a line by itself")
                print(" horizontal word is ", word)
                MakeHorEntry(word.strip(), horizons[chosen-1][0], horizons[chosen-1][1])
            
        if(orientation == 2) : 
            condition = lambda x: x > 5
            verticals = find_indices_2d(possibleVertical, condition)
            #print(verticals)

            if(len(verticals) > 1):
                chosen= random.randint(1, len(verticals))
            if(len(verticals) == 0):
                continue
            if(len(verticals) == 1):
                chosen = 1
            chosen= random.randint(1, len(verticals))
            if(verticals[chosen-1][2] > 5):
                letter = letters[verticals[chosen-1][0]][verticals[chosen-1][1]]
                word = GetQuestion("Give me a word that has less than " + str(verticals[chosen-1][2]) + " letters and starts with a "+ letter + " and return only the word in your response on a line by itself")
                print(" vertical word is ", word)
                MakeVertEntry(word.strip(), verticals[chosen-1][0], verticals[chosen-1][1])
            

        

    #print(letters)

    

def GetMoreClues():

    print("GET MORE CLUES")
    
    global letters
    global possibleHorizontal
    global possibleVertical

    possibleHorizontal = []
    possibleVertical = []

    #print(letters)

    for i in range (len(letters)):
        possibleHorizontal.append([])
        possibleVertical.append([])
        for j in range(len(letters[i])):
            possibleHorizontal[i].append(0)
            possibleVertical[i].append(0)


    for i in range(len(letters)):
        for j in range(len(letters[i])):
           # print(len(letters[i][j]), letters[i][j], len(letters), len(letters[i]), " length and letter length of i length of j")
            #print(str(i), str(j), " i and j ")
            if len(letters[i][j]) == 1:
                #check horizontal
                hor = 1
                
                while(i + hor < len(letters) and len(letters[i+hor][j]) <= 0 ):
            #        print(str(hor), "is hor")
                    hor += 1
                    if(i + hor < len(letters)):
                        if(j >0 and len(letters[i+hor][j-1]) > 0):
                            break
                        if(j<9 and len(letters[i + hor][j+1]) > 0 ):
                            break
                    
                    
                   # possibleHorizontal[i].append(hor)
                possibleHorizontal[i][j]=(hor)
                ver = 1
                while(j+ ver < len(letters[i]) and len(letters[i][j+ver]) <= 0 ):
             #       print(str(ver), " is ver")
                    ver += 1
                    if(j + ver < len(letters[i])):
                        if(j >0 and len(letters[i-1][j+ver]) > 0):
                            break
                        if(j<9 and len(letters[i + 1][j+ver]) > 0 ):
                            break
                    
                possibleVertical[i][j]=(ver)
            else:
                possibleHorizontal[i][j] =(0)
                possibleVertical[i][j]=(0)
         #   print(possibleHorizontal)
         #   print(possibleVertical)


      #  print(possibleHorizontal)
     #   print(possibleVertical)

SetupChatApp()
GetWelcomeMessage()
GetName()
#GetClues()
#GetWordsToScramble()




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

    GetClues()

    return letters

@app.get("/getWordScramble", tags=["wordScramble"])
async def get_word_scramble():

    return words

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