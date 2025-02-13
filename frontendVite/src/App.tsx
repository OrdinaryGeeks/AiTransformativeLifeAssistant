
import Box from '@mui/material/Box'
import './App.css'

import Hub from './Hub'
import Workoutform from './WorkoutForm'

function App() {
 

  return (
    <Box sx={{width:1, justifyContent:"center", alignItems: "center",
     flexDirection:"row", display: 'flex'}}>
     
     <Hub/>
     <Workoutform></Workoutform>
    </Box>
  )
}

export default App
