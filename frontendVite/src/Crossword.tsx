import React, { useState } from "react";

const crosswordGrid = [
  ["C", "A", "T", "", "D", "O", "G"],
  ["", "", "", "", "", "", ""],
  ["B", "I", "R", "D", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["F", "I", "S", "H", "", "", ""],
];

const Crossword: React.FC = () => {
  const [grid, setGrid] = useState(
    crosswordGrid.map((row) => row.map((cell) => (cell !== "" ? "" : "")))
  );

  const handleChange = (row: number, col: number, value: string) => {
    if (value.length > 1) return;
    const newGrid = grid.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? value.toUpperCase() : c))
    );
    setGrid(newGrid);
  };

  return (
    <div style={{ display: "grid", gap: "5px" }}>
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

export default Crossword;
