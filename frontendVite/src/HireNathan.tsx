
import axios from "axios";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";

import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { FormControl, Input, TextField, Typography } from '@mui/material';

interface Question {
  question: string;
}

interface Workout {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function HireNathan() {
  
 const [jokes, setJokes] = useState([]);
 const [advice, setAdvice] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);


  
const parseForWorkouts = (response :any) => {


  console.log(response);

  alert(" the question is " + response.data);
  let splitByNewLine = response.data.split('\n');
 
  let tempWorkouts : Workout[] = [];
  alert(splitByNewLine.length + " is the length of the splitbynewline");
  for(let i = 0; i< splitByNewLine.length; i++)
  {

   let splitByDash = splitByNewLine[i].split('-');
   let name :string;
   let sets : number;
   let reps: number;
   
       name = splitByDash[0];
      

     let splitBySpace = splitByDash[1].split(' ');
     sets = parseInt(splitBySpace[1]);
     reps = parseInt(splitBySpace[4]);

     tempWorkouts = [...tempWorkouts, {name: name, sets: sets, reps: reps, weight: 0}];

     //setWorkouts([...workouts, {name: name, sets: sets, reps: reps, weight: 0}]);
     alert(name + " " + sets + " " + reps);
     console.log(workouts);
     
 }

 setWorkouts([...workouts, ...tempWorkouts]);
 console.log(workouts);
 alert(workouts.length + " is th elength of the workouts");


}
const getAJoke = (event : any) => {

  axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit&amount=10").then((response) => {


   // setJokes(response.data.jokes);
    console.log(response.data.jokes);
  })
}
const getAdvice = () => {

  axios.get("https://api.adviceslip.com/advice").then((response) => {
  
  console.log(response.data.slip.advice);
  // console.log(response);})
})
}
const hireNathanQuestion = (event : any) => {
 event.preventDefault();
 const hiringQuestion: Question = { question: event.target.question.value };
 alert(hiringQuestion.question);
 axios
   .post<Question>("http://localhost:8000/shouldwehireNathan", hiringQuestion)
   .then((response) => {alert(response); parseForWorkouts(response);});
};
  return (
    <div>
      <Card>
    <Typography>Welcome to Wala The wellness and life assistant</Typography>
    </Card>
      <FormControl  className="MuiFormControl-marginDense" variant="outlined" onSubmit={hireNathanQuestion}>
      
        <Input sx={{ border: 1, m:2}} type="text" name="question"></Input>
        <Button sx= {{m:2}} variant="contained" type="submit">Analyze Diet</Button>
        <Button
variant="contained"
color="primary"
component="label"
startIcon={<CloudUploadIcon />}
>
Upload
<input
type="file"
hidden
onChange={(event) => console.log(event.target.files)}
/>
</Button>
        <Button sx= {{m:2}} variant="contained" type="submit">Suggest Workout</Button>
        <Button onClick={getAJoke} sx= {{m:2}} variant="contained" type="submit">Tell me a Joke</Button>
        {jokes && 
        <Typography>{jokes[0]}</Typography>}
        <Button onClick={getAdvice} sx= {{m:2}} variant="contained" type="submit">Give me advice</Button>
        {advice && 
        <Typography>{advice}</Typography>}
      </FormControl>
      {workouts.length>0 && 
      <div>
        
        
      {workouts.map((workout) => (
        <div>
          <p>{workout.name}</p>
          <p>{workout.sets}</p>
          <p>{workout.reps}</p>
        </div>
      ))}
      </div>
      }

      </div>);
  
}
