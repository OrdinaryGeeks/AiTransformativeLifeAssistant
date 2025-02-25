import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function Reset(){

    
    const [isLoading, setIsLoading] = useState(false);
   
    const [resetSet, setResetSet] = useState(false);

    const reload =() => {

        setIsLoading(false);
        setResetSet(false);
    }
    const reset=() => {

        setIsLoading(true);
  
        axios
        .get<string>("http://localhost:8000/resetChatApp").then(() =>  setResetSet(true));

    }

    return(



        <div >
            
            

                  {isLoading && <CircularProgress/>
                    }
        {!isLoading && !resetSet && <>
        <Button onClick={reset}>Reset AI</Button>
        </>
        }
        {!isLoading && resetSet && 
        <Button onClick={reload}>Reload page</Button>}
       
        </div>
    
    )


}

