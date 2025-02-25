
import { useState } from "react";

import { Box, Card, Container } from '@mui/material';
import Button from '@mui/material/Button';
import { FormControl, Input,  Typography } from '@mui/material';
import Joke from "./Joke";
import Advice from "./Advice";
import Diet from "./Diet";
import logo from "./assets/Logos.jpg";
import WorkoutContext from "./WorkoutContext";
import Reset from "./Reset";

export default function Hub() {
  const [showEnterWorkout, setShowEnterWorkout] = useState(false);
  const [showDiet, setShowDiet] = useState(false);
  const [showJoke, setShowJoke]= useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showReset, setShowReset] = useState(false);


  
const getDiet = () => {

  setShowDiet(true);
  setShowJoke(false);
  setShowAdvice(false);
  setShowEnterWorkout(false);
  setShowReset(false);

}




const getAJoke = () => {



  setShowJoke(true);
  setShowAdvice(false);
  setShowDiet(false);
  
  setShowEnterWorkout(false); 
  setShowReset(false);
  
};

const resetAI= () => {

  
  setShowJoke(false);
  setShowAdvice(false);
  setShowDiet(false);
  
  setShowEnterWorkout(false); 
  setShowReset(true);


}
const getAdvice = () => {

 
  setShowJoke(false);
  setShowAdvice(true);
  setShowDiet(false);
  
  setShowEnterWorkout(false);
  setShowReset(false);

}

const getEnterWorkout = () => {


  setShowJoke(false);
  setShowAdvice(false);
  setShowDiet(false);
  
  setShowEnterWorkout(true);
  setShowReset(false);

}
  return (
    <Container sx={{justifyContent:"center", width:1}}>

    <Box component='img' sx={{height:200, width:200, display:"block", marginLeft:"auto", marginRight:"auto"}} alt="Logo" src={logo}/>
    <Typography sx={{textAlign:"center"}}>Welcome to Wala The wellness and life assistant</Typography>
    <Container sx={{width:1, flexDirection:"row", display: 'flex'}}>

      <Card sx={{width:'30%'}}>
     
      <FormControl  className="MuiFormControl-marginDense" variant="outlined" >
      
        <Input sx={{ border: 1, m:2}} type="text" name="question"></Input>
        <Button onClick={resetAI} sx= {{m:2}} variant="contained" type="submit">Reset AI</Button>
        <Button onClick={getDiet} sx= {{m:2}} variant="contained" type="submit">Build a Diet</Button>
       
        <Button onClick={getEnterWorkout} sx= {{m:2}} variant="contained" type="submit">Build a Workout</Button>
        <Button onClick={getAJoke} sx= {{m:2}} variant="contained" type="submit">Tell me a Joke</Button>
        
        <Button onClick={getAdvice} sx= {{m:2}} variant="contained" type="submit">Give me advice</Button>
      </FormControl>
    
</Card>
<Card sx={{width:'70%', textAlign:'center',alignContent:'center'}}>
  {showJoke && <Joke></Joke>}
  {showAdvice && <Advice ></Advice>}
  {showDiet && <Diet></Diet>}
  {showEnterWorkout && <WorkoutContext></WorkoutContext>}
  {showReset && <Reset></Reset>}
 
</Card>
</Container>
</Container>);
  
}
