import { Button, Card, Input } from "@mui/material";
import { useEffect, useState } from "react";

export default function WordScramble(props:{words:string[], mixed:string[]})
{


    useEffect(() => {

        initEnteredWords();
    }, [])
    const[enteredWords, setEnteredWords] = useState<string[]>([])

    const updateWords= (e:any, index:number) => {

        let eWords = enteredWords;

        eWords[index] = e.target.value;
        setEnteredWords(eWords);
        

    }
    const checkAnswers = () => {


        let correct = true;
        for(let i = 0; i<props.words.length; i++)
        {
            if(props.words[i] != enteredWords[i])
                correct = false;


        }

        if(correct)
            alert("All correct");
    }
    const initEnteredWords = () => {
       
        for(let i = 0; i<props.words.length; i++)
            {
                setEnteredWords([...enteredWords, ""]);
            }

        
    }
    return(
    <Card>

        {props.mixed.map((word, idx)=>
        
            <div>
                {word}   <Input type="text" onChange={(e) => {updateWords(e, idx)}}></Input>
                           </div>

           
        )}
 <Button onClick={checkAnswers}>Check Answers</Button>

    </Card>

    )

}