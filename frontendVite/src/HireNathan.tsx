
import axios from "axios";


import { useState } from "react";


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
      <form onSubmit={hireNathanQuestion}>
        <input type="text" name="question"></input>
        <button type="submit">Hire Nathan</button>
      </form>

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
