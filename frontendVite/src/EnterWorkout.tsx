import Input from "@mui/material/Input";
import { useState } from "react";
import { Box, Button } from "@mui/material";

export default function EnterWorkout () {
    const [formData, setFormData] = useState({
        workoutname: '',
        exercises: [] as {
            name: string;
            sets: { reps: number; weight: number }[]; // Each set now has reps and weight
        }[],
    });

    


    const handleChange = (event : any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
      const addExercise = (exercise: string, sets: { reps: number; weight: number }[]) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            exercises: [
                ...prevFormData.exercises,
                { name: exercise, sets },
            ],
        }));
    };
    const handleSubmit = async (event : any) => {
        event.preventDefault();
      
        try {
            const response = await fetch('https://localhost:8000/postWorkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
      
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
      
            const result = await response.json();
            console.log('Form submitted successfully:', result);
        } catch (error) {
            console.error('There was a problem with the submission:', error);
        }
      };
      const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState(1);
    

    const addSet = (reps: number, weight: number) => {
        setCurrentSets([...currentSets, { reps, weight }]);
    };
      for (let i = sets; i < 10; i++)
    return(
        <form onSubmit={handleSubmit}>
        <Box mb={2}> <Input type="text"  name={"workoutname"} placeholder={"Enter workout name"} onChange={handleChange} value={formData.workoutname}/></Box>
        <Box mb={2}> <Input type= "text" name= {"exersizename"} placeholder={"Enter Exercise name"} onChange={(e)=> setExerciseName(e.target.value)}/></Box>
        <Box mb={2}> <Input type="number" name={"sets"} placeholder={"Enter number of sets"} onChange={handleChange} value={formData.exercises}/></Box>
        <button onClick = {handleSave}> Update Sets </button>
    
        <Input type="text" name={"reps"} placeholder={"Enter workout reps"} onChange={handleChange} value={formData.reps}/>
    
        <Input type="text" name={"weights"}placeholder={"Enter workout weights"} onChange={handleChange} value={formData.weights}/>
        <button type="submit"></button>
        
        </form>
    )
}