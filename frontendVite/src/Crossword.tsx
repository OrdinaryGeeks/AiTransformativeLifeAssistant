import { Button } from "@mui/material";
import { useState } from "react";



export default function Crossword(props:{crossword:Array<string>[]}){
  const [grid, setGrid] = useState<Array<string>[]>(
    props.crossword
  );

  const checkAnswers = () => {


    let correct = true;
    for(let i = 0; i<props.crossword.length; i++)
    {
      for(let j=0; j<props.crossword[0].length; j++)
        if(props.crossword[i][j].toUpperCase() != grid[i][j].toUpperCase())
        {
            correct = false;

            console.log(props.crossword[i][j].toUpperCase(), grid[i][j])
        }

    }

    if(correct)
        alert("All correct");
}

  const handleChange = (row: number, col: number, value: string) => {
    value=value[value.length-1];
    const newGrid = grid.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? value.toUpperCase() : c))
    );
    setGrid(newGrid);
  };

  /*
  const handleChange = (row: number, col: number, value: string) => {
    console.log("HC");
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          console.log(rowIndex, colIndex, value);
          return  value.toUpperCase() ;
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };
*/
  grid.map((row, rowIndex) => {
    console.log(row, rowIndex);
    row.map((cell, colIndex) =>{
      console.log(cell, colIndex)
    })
    })
  

return(

  <div>
    {props.crossword &&  <div style={{ display: "grid", gap: "5px" }}>
      HELLO WELCOME TO Crossword

      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <input 
            value={cell}
            maxLength={2}
            onChange={(e)=>handleChange(rowIndex, colIndex, e.target.value)}
            style={{
              color:"black",
              width: "30px",
              height: "30px",
              textAlign: "center",
              fontSize: "20px",
              textTransform: "uppercase",
              border: grid[rowIndex][colIndex] ? "1px solid black" : "none",
              backgroundColor: grid[rowIndex][colIndex] ? "white" : "lightgray",
            }}
            ></input>
      )
    )

  }
   <Button onClick={checkAnswers}>Check Answers</Button>
  </div>
    

    )
      )
    }
    </div>
    } 
    </div>)
}
    
  /*
  useEffect(() => {
    setGrid(props.crossword);
  })

  const handleChange = (row: number, col: number, value: string) => {
    if (value.length > 1) return;
    const newGrid = grid.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? value.toUpperCase() : c))
    );
    setGrid(newGrid);
  };

  //console.log(props.crossword);
  //if(props.crossword)
  //setGrid(props.crossword);
  return (
    <div style={{ display: "grid", gap: "5px" }}>
      HELLO WELCOME TO Crossword
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="text"
              maxLength={1}
              value={cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              style={{
                width: "30px",
                height: "30px",
                textAlign: "center",
                fontSize: "20px",
                textTransform: "uppercase",
                border: crosswordGrid[rowIndex][colIndex] ? "1px solid black" : "none",
                backgroundColor: crosswordGrid[rowIndex][colIndex] ? "white" : "lightgray",
              }}
              disabled={!crosswordGrid[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};


///
// {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}> 
         
          {row.map((cell, colIndex) => (
          
            <input
              key={colIndex}
              type="text"
              maxLength={1}
              value={"a"}
              onChange={() =>alert("hi")}
              style={{
                width: "30px",
                height: "30px",
                textAlign: "center",
                fontSize: "20px",
                textTransform: "uppercase",
                border: grid[rowIndex][colIndex] ? "1px solid black" : "none",
                backgroundColor: grid[rowIndex][colIndex] ? "white" : "lightgray",
              }}
              disabled={!grid[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div>}
  </div>
)
}
*/