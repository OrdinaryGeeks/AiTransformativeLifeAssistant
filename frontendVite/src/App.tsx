
import Box from '@mui/material/Box'
import './App.css'

import Hub from './Hub'

import { useState } from 'react'
function App() {
 
  /*
const [workoutName, setWorkoutName] = useState("");
const [workoutReps, setWorkoutReps] = useState<number[]>([]);
const [workoutSets, setWorkoutSets] = useState<number[]>([]);
const [workoutWeights, setWorkoutWeights] = useState<number[]>([])
*/



  return (

    <>
    
    <Box sx={{width:1, justifyContent:"center", alignItems: "center",
     flexDirection:"row", display: 'flex'}}>
    
     <Hub/>
    
    </Box>
    </>
  )
}

export default App
