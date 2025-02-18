import Input from "@mui/material/Input";
import { useState } from "react";
import { Box, Button } from "@mui/material";

export default function EnterWorkout() {
    const [formData, setFormData] = useState({
        workoutname: '',
        exercises: [] as {
            name: string;
            sets: { reps: number; weight: number }[]; // Each set now has reps and weight
        }[],
    });

    // Handle general form field changes
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add new exercise with sets (each set having reps and weight)
    const addExercise = (exercise: string, sets: { reps: number; weight: number }[]) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            exercises: [
                ...prevFormData.exercises,
                { name: exercise, sets },
            ],
        }));
    };

    // Handle submit
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:8000/postWorkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Form submitted successfully:", result);
        } catch (error) {
            console.error("There was a problem with the submission:", error);
        }
    };

    
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState<{ reps: number; weight: number }[]>([{ reps: 0, weight: 0 }]); // Track multiple sets

    // Handle change for each set's reps and weight
    const handleSetChange = (index: number, field: string, value: number) => {
        const newSets = [...sets];
        newSets[index] = { ...newSets[index], [field]: value };
        setSets(newSets);
    };

    // Add a new empty set input
    const addNewSet = () => {
        setSets([...sets, { reps: 0, weight: 0 }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box mb={2}>
                <Input
                    type="text" name="workoutname" placeholder="Enter Workout name" onChange={handleChange} value={formData.workoutname}    
                />
            </Box>

            {/* Exercise Name Input */}
            <Box mb={2}>
                <Input
                    type="text" name="exercise-name" placeholder="Enter Exercise name" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}
                />
            </Box>
            <div>Reps               Weight</div>
            {/* Set Inputs for Each Set */}
            {sets.map((set, index) => (
                <Box key={index} mb={2}>
                    <Input
                        type="number" name="reps" placeholder="Enter number of reps" value={set.reps} onChange={(e) => handleSetChange(index, "reps", Number(e.target.value))}
                    ></Input>
                    <Input
                        type="number" name="weight" placeholder="Enter weight for this set" value={set.weight} onChange={(e) => handleSetChange(index, "weight", Number(e.target.value))}
                    />
                </Box>
            ))}

            {/* Button to Add New Set */}
            <Button variant="contained" onClick={addNewSet}>
                Add Another Set
            </Button>

            {/* Add Exercise Button */}
            <Button
                variant="contained"
                onClick={() => {
             if (exerciseName && sets.every(set => set.reps > 0 && set.weight > 0)) {
                        addExercise(exerciseName, sets);
                        setExerciseName("");
                        setSets([{ reps: 0, weight: 0 }]); // Reset after adding exercise
                    }       
                }}
            >
                Add Exercise
            </Button>

            {/* List of Exercises */}
            <Box mt={2}>
                {formData.exercises.map((exercise, index) => (
                    <div key={index}>
                       <h3>{exercise.name}</h3>
                        {exercise.sets.map((set, setIndex) => (
                            <p key={setIndex}>
                                Set {setIndex + 1} - Reps: {set.reps}, Weight: {set.weight} lb
                            </p>
                        ))}
                    </div>))}
            </Box>

            {/* Submit Button */}
            <Button type="submit" variant="contained">
                Submit Workout
            </Button>
        </form>
    );
}
