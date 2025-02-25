import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function Joke(){

    
    const [isLoading, setIsLoading] = useState(false);
    const [joke, setJoke] = useState("");
    const [jokeSet, setJokeSet] = useState(false);

    const reload =() => {

        setIsLoading(false);
        setJokeSet(false);
    }
    const getAJoke=() => {

        setIsLoading(true);
  axios
  .get<string>("http://localhost:8000/tellmeajoke")
  .then((response) => {setIsLoading(false);setJoke(response.data); setJokeSet(true);console.log(response.data);});

    }

    return(



        <div >
            
            

                  {isLoading && <CircularProgress/>
                    }
        {!isLoading && !jokeSet && <>
        <Button sx= {{m:2}} variant="contained" onClick={getAJoke}>Get a joke</Button>
        </>
        }

        {!isLoading && jokeSet && 
        <Button sx= {{m:2}} variant="contained" onClick={reload}>Reload button</Button>}
        {joke}
        </div>
    
    )


}