
import axios from "axios";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";

import { Card, Container } from '@mui/material';
import Button from '@mui/material/Button';
import { FormControl, Input,  Typography } from '@mui/material';
import Joke from "./Joke";
import Advice from "./Advice";
import Workout from "./Workout";
import Diet from "./Diet";
import EnterWorkout from "./EnterWorkout";
import Welcome from "./Welcome";

interface Question {
  question: string;
}

interface Workout {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function Hub() {
  
  const [showEnterWorkout, setShowEnterWorkout] = useState(false);
  const [showDiet, setShowDiet] = useState(false);
  const [diet, setDiet] = useState("");
  const [showJoke, setShowJoke]= useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [workout, setWorkout] = useState("");
  const [joke, setJoke] = useState("");
 //const [jokes, setJokes] = useState([]);
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
    // alert(name + " " + sets + " " + reps);
     console.log(workouts);
     
 }

 setWorkouts([...workouts, ...tempWorkouts]);
 console.log(workouts);
 alert(workouts.length + " is th elength of the workouts");


}

const getDiet = () => {

  
  axios
  .get<string>("http://localhost:8000/helpmewithdiet")
  .then((response) => {alert(response); setDiet(response.data); console.log(response.data);});

  setShowDiet(true);
  setShowJoke(false);
  setShowAdvice(false);
  setShowWorkout(false);
  setShowEnterWorkout(false);

}
const getAJoke = () => {


  axios
  .get<string>("http://localhost:8000/tellmeajoke")
  .then((response) => {alert(response); setJoke(response.data); console.log(response.data);});

  setShowJoke(true);
  setShowAdvice(false);
  setShowWorkout(false);
  setShowDiet(false);
  
  setShowEnterWorkout(false);
};
/*
  axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit&amount=10").then((response) => {


    let theJoke = "";
    if(response.data.jokes[0].type == "single")
    {
      theJoke = 
    response.data.jokes[0].joke;
 

    }
    if(response.data.jokes[0].type== "twopart")
    {
      console.log(response.data.jokes[0].setup + " " + response.data.jokes[0].delivery);
      theJoke = response.data.jokes[0].setup + " " + response.data.jokes[0].delivery;
    }
    setShowJoke(true);
    setShowAdvice(false);
    setJoke(theJoke);
    //console.log(theJoke);

    console.log(response.data.jokes);
  })
}*/
const getWorkout = () => {

  axios
  .get<string>("http://localhost:8000/createworkout")
  .then((response) => {alert(response); setWorkout(response.data); console.log(response.data);});

  setShowJoke(false);
  setShowAdvice(false);
  setShowWorkout(true);
  setShowDiet(false);
  
  setShowEnterWorkout(false);

}
const getAdvice = () => {

  axios
  .get<string>("http://localhost:8000/givemeadvice")
  .then((response) => {alert(response); setAdvice(response.data); console.log(response.data);});

  setShowJoke(false);
  setShowAdvice(true);
  setShowDiet(false);
  setShowWorkout(false);
  
  setShowEnterWorkout(false);

}

const getEnterWorkout = () => {


  setShowJoke(false);
  setShowAdvice(false);
  setShowDiet(false);
  setShowWorkout(false);
  
  setShowEnterWorkout(true);


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
    <Container maxWidth={false} sx={{border:4, justifyContent:"center", width:1}}>

    <Typography sx={{textAlign:"center"}}>Welcome to Wala The wellness and life assistant</Typography>
    <Container maxWidth={false} sx={{width:1, flexDirection:"row", display: 'flex'}}>

      <Card sx={{width:'40%'}}>
     
      <FormControl  className="MuiFormControl-marginDense" variant="outlined" onSubmit={hireNathanQuestion}>
      
        <Input sx={{ border: 1, m:2}} type="text" name="question"></Input>
        <Button onClick={getDiet} sx= {{m:2}} variant="contained" type="submit">Analyze Diet</Button>
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
        <Button onClick={getWorkout} sx= {{m:2}} variant="contained" type="submit">Suggest Workout</Button>
        <Button onClick={getAJoke} sx= {{m:2}} variant="contained" type="submit">Tell me a Joke</Button>
        
        <Button onClick={getAdvice} sx= {{m:2}} variant="contained" type="submit">Give me advice</Button>
        <Button onClick={getEnterWorkout} sx = {{m:2}} variant="contained" type="submit"> Enter workout</Button>
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
</Card>
<Card sx={{width:'70%', textAlign:'center',alignContent:'center'}}>
  {showJoke && <Joke joke={joke}></Joke>}
  {showAdvice && <Advice advice={advice}></Advice>}
  {showWorkout && <Workout workout={workout}></Workout>}
  {showDiet && <Diet diet={diet}></Diet>}
  {showEnterWorkout && <EnterWorkout></EnterWorkout>}
  {!showEnterWorkout && !showDiet && !showWorkout && !showAdvice &&!showJoke && <Welcome></Welcome>}
</Card>
</Container>
</Container>);
  
}
