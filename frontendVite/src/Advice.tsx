import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function Advice(){

    
    const [isLoading, setIsLoading] = useState(false);
    const [advice, setAdvice] = useState("");
    const [adviceSet, setAdviceSet] = useState(false);


    const reload =() => {

        setIsLoading(false);
        setAdviceSet(false);
    }
    const getAdvice=() => {

        setIsLoading(true);
  axios
  .get<string>("http://localhost:8000/givemeadvice")
  .then((response) => {setIsLoading(false);setAdvice(response.data); setAdviceSet(true);console.log(response.data);});

    }

    return(



        <div >
            
            

                  {isLoading && <CircularProgress/>
                    }
        {!isLoading && !adviceSet && <>
        <Button sx= {{m:2}} variant="contained" onClick={getAdvice}>Get Advice</Button>
        </>
        }
        {!isLoading && adviceSet && <Button sx= {{m:2}} variant="contained" onClick={reload}>Reload Button</Button>}
        {advice}
        </div>
    
    )


}