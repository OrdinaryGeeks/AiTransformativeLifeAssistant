import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface Day{
    breakfast:string,
    lunch:string,
    dinner: string
}
export default function Diet()
{

const [dietType, setDietType] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [dietSet, setDietSet]=useState(false);

const [days, setDays] = useState<Day[]>([])



const reload =() => {

    setIsLoading(false);
    setDietSet(false);
}



 function createDiet2(dietType: string) {

    const params = new URLSearchParams();
params.append('diet', dietType);
    

setIsLoading(true);
  axios
  .get<string>("http://localhost:8000/helpmewithdiet?diet="+dietType)
  .then((response) => {setIsLoading(false); setDietSet(true); console.log(response.data);

   
let splitNewLines = response.data.split("\n");

let tempDays :Day[] = [];
let tempDay : Day = {breakfast:"", lunch:"", dinner:""}

    for(let i = 0; i<splitNewLines.length; i++)
    {
        if(splitNewLines[i].includes("Day"))
           
        if(splitNewLines[i].includes("Breakfast"))
            tempDay = {...tempDay, breakfast: splitNewLines[i]};
        if(splitNewLines[i].includes("Lunch"))
            tempDay = {...tempDay, lunch: splitNewLines[i]};
        if(splitNewLines[i].includes("Dinner"))
        {
            tempDay = {...tempDay, dinner: splitNewLines[i]};
            tempDays.push(tempDay);
        }
    }

    setDays(tempDays);
  });


}
const createDiet = () => {

    const params = new URLSearchParams();
params.append('diet', dietType);
    

setIsLoading(true);
  axios
  .get<string>("http://localhost:8000/helpmewithdiet?diet="+dietType)
  .then((response) => {setIsLoading(false); setDietSet(true); console.log(response.data);

   
let splitNewLines = response.data.split("\n");

let tempDays :Day[] = [];
let tempDay : Day = {breakfast:"", lunch:"", dinner:""}

    for(let i = 0; i<splitNewLines.length; i++)
    {
        if(splitNewLines[i].includes("Day"))
           
        if(splitNewLines[i].includes("Breakfast"))
            tempDay = {...tempDay, breakfast: splitNewLines[i]};
        if(splitNewLines[i].includes("Lunch"))
            tempDay = {...tempDay, lunch: splitNewLines[i]};
        if(splitNewLines[i].includes("Dinner"))
        {
            tempDay = {...tempDay, dinner: splitNewLines[i]};
            tempDays.push(tempDay);
        }
    }

    setDays(tempDays);
  });


}

const chooseKeto = () => {

    setDietType("Keto");
}
const chooseAtkins = () => {

    setDietType("Atkins");
}
const chooseMediterranean = () => {

    setDietType("Mediterranean");
}
const chooseVegan = () => {

    setDietType("Vegan");
}
    return(



        <div>
        {isLoading && <CircularProgress/>
        }

        {!isLoading && !dietSet && <><div>
        <Button sx= {{m:2}} variant="contained" onClick={() =>createDiet2("Keto")}>Keto Diet</Button>
        
        <Button sx= {{m:2}} variant="contained" onClick={() => createDiet2("Vegan")}>Vegan Diet</Button>
        <Button sx= {{m:2}} variant="contained" onClick={() =>createDiet2("Atkins")}>Atkins Diet</Button>
        <Button sx= {{m:2}} variant="contained" onClick={() => createDiet2("Mediterranean")}>Mediterranean Diet</Button>

        
        </div>
        
        </>

        }
        {!isLoading && dietSet && 

        <Button sx= {{m:2}} variant="contained" onClick={reload}>Reload Options</Button>
}
        {days.map((day, idx) =>
        <>
        <div> Day {idx}</div>
        <div>{day.breakfast}</div>
        <div>{day.lunch}</div>
        <div>{day.dinner}</div>

        </>
        )}
    </div>  
    )
}