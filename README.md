

CD into backend.  pip install -r requirements.txt
CD into frontendVite. npm install
then npm run build
cd into backend.  make a directory called buildFE
Copy the assets and index.html into the folder buildFE
on line 44 of api.py enter the openai key from the email


go to backend and enter this command
pyinstaller main.py  --name TransformativeWorkoutLifeAssistant --hidden-import=tiktoken_ext.openai_public --hidden-import=tiktoken_ext --add-data ./buildFE:./buildFE2

look in the backend/dist folder and execute the exe
then go to localhost:8000/home/index.html

you can play with the documents folder.  basically it reads the store in and then makes a decision.  my old code used openai and i knew it but the new code i am not sure.  i do know the documents influence the decision.  the old code is commented so you can see what it did.  that code worked in 2023 but it was deprecated when i pulled it up.  so this is the start.

i want to have it make suggesti0ns on rest/when to work out, what to eat, when to take a cheat meal, and when to do a crossword or read some advice.  i will have it incorporate portions ofmy transformativeworkoutlife code now that i see how to use static web pages and boot from exe.  would be cool to have python open the website for us which may be easy instead of having to navigate to it.