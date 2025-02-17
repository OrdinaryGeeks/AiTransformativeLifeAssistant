import Input from "@mui/material/Input";
import { useState } from "react";


export default function EnterWorkout () {
    const [formData, setFormData] = useState({
        name: '',
        reps: [],
        sets: [],
        weights:[]
      
      });


    const handleChange = (event : any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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


    return(
        <form onSubmit={handleSubmit}>
      
        <Input type="text"  name={"name"} placeholder={"Enter workout name"} onChange={handleChange} value={formData.name}/>
        <Input type="text" name={"sets"} placeholder={"Enter workout sets"} onChange={handleChange} value={formData.sets}/>
    
        <Input type="text" name={"reps"} placeholder={"Enter workout reps"} onChange={handleChange} value={formData.reps}/>
    
        <Input type="text" name={"weights"}placeholder={"Enter workout weights"} onChange={handleChange} value={formData.weights}/>
        <button type="submit"></button>
        
        </form>
    )
}