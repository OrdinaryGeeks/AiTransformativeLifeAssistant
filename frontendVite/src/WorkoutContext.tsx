import {Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select,  Typography} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export default function WorkoutContext() {

    const [workoutFreq, setWorkoutFreq] = useState("1");
    const [workoutLevel, setWorkoutLevel] = useState("beginner");
    const [muscleChecked, setMuscleChecked] = useState(false);
    const [weightChecked, setWeightChecked] = useState(false);
    const [enduranceChecked, setEnduranceChecked] = useState(false)
    const [workout, setWorkout] = useState("");
    const [workoutSet, setWorkoutSet] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);

    const reload =() => {

        setIsLoading(false);
        setWorkoutSet(false);
    }
    const handleWeight = (event: any) => {
        setWeightChecked(event.target.value);
    }
    const handleEndurance = (event:any) => {
        setEnduranceChecked(event.target.value);
    }
    const handleMuscle = (event:any) => {
        setMuscleChecked (event.target.value);
    }

    let params = "";

    const handleLevelChange = (event:any) => {
        setWorkoutLevel(event.target.value);
      };

    const handleChange = (event: any) => {
        alert(event.target.value);
        setWorkoutFreq(event.target.value as string);
      };

    let paramsAdd = (paramAndValue:string) => {

        if(params!= "")
            params+="&" + paramAndValue;
        else
            params+="?" + paramAndValue;
    }
      const workoutFromContext = () => {

       setIsLoading(true);
        if(muscleChecked)
            paramsAdd("muscle=true");
        if(weightChecked)
            paramsAdd("weight=true");
        if(enduranceChecked)
            paramsAdd("endurance=true");
        paramsAdd("freq="+workoutFreq);
        paramsAdd("level="+workoutLevel);

        
      axios
      .get<string>("http://localhost:8000/createworkout"+params)
      .then((response) => {setIsLoading(false);setWorkoutSet(true);setWorkout(response.data); console.log(response.data);});

      }
    return(
        <>
        {isLoading && <CircularProgress/>}
        {!isLoading && !workoutSet &&
        <>
        <>
        <FormControl fullWidth>
      <Typography id="demo-simple-select-label">How often do you want to workout a week 3,4,5</Typography>
        <Select
           labelId="select-workout-frequency"
           id="select-workout-frequency"
           value={workoutFreq}
           label="Workout Frequency"
           
           onChange={handleChange}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
        </Select>
        </FormControl>
        <div>What are your workout goals</div>

        <FormGroup  >
        <FormControlLabel  control={<Checkbox checked={weightChecked} onChange={handleWeight}/>} label="Weight Loss" />
        <FormControlLabel  control={<Checkbox checked={muscleChecked} onChange={handleMuscle}/>} label="Muscle Gain" />
        <FormControlLabel  control={<Checkbox checked={enduranceChecked} onChange={handleEndurance}/>} label="Endurance" />
        </FormGroup>

        <FormControl component="fieldset">
        <FormLabel component="legend">What is your current fitness level</FormLabel>  
<RadioGroup
aria-labelledby="fitness-level"
defaultValue="beginner"
value={workoutLevel}
        onChange={handleLevelChange}
name="fitness-level">
<FormControlLabel value="beginner" control={<Radio/>} label="Beginner" />
<FormControlLabel value="intermediate" control={<Radio/>} label="Intermediate" />
<FormControlLabel value="advanced" control={<Radio/>} label="Advanced" />
<FormControlLabel value="elite" control={<Radio/>} label="Elite" />
</RadioGroup>
</FormControl>
</>



      
        
<Button sx= {{m:2}} variant="contained" onClick={workoutFromContext}>create workout</Button>      
     </>   
        
}

{workoutSet && !isLoading && <Button sx= {{m:2}} variant="contained" onClick={reload}>Clear Workout</Button>}
{!isLoading && workoutSet && {workout}}
        
        </>
    )
}