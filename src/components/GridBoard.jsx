import React, { useEffect, useRef, useState } from "react";
import { getCellObjects, getPath } from "../utils/helpers";
import { BFS, generateRandomMaze } from "../app/index";
import Cell from "./Cell";

export default function GridBoard() {
  const gridBoardCells = useRef(getCellObjects());
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [renderFlag, setRenderFlag] = useState(false);
  const [foundPath, setFoundPath] = useState(null);

  const [cellsScanned, setCellsScanned] = useState(0);
  const [cellsTraveled, setCellsTraveled] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);


  const clearBoard = () => {
    gridBoardCells.current = getCellObjects(true, true, gridBoardCells.current);
    resetBoardData();
  };

  const resetBoardData = () => {
    document.querySelectorAll(`.cell`).forEach((item) => {
      if (item.classList.contains("cell-visited")) {
        item.classList.remove("cell-visited");
      }
      if (item.classList.contains("cell-path")) {
        item.classList.remove("cell-path");
      }
    });
    setFoundPath(null);
    setCellsScanned(0);
    setCellsTraveled(0);
    setTimeTaken(0);
  };

  const animateAlgo = (visitedCells, path) => {
    console.log('6');
    console.log(visitedCells);
    
    for (let i = 0; i < visitedCells.length; i++) {
      setTimeout(() => {
        const cell = visitedCells[i];
        cell.isTarget = true // bikin ngerender
        console.log(cell);
        let item = document.getElementById(`cell-${cell.row}-${cell.col}`);
        if (item) {
          console.log('7');
          item.className += " cell-path";
        }
        if (cell.isTarget) {
          console.log('8');

          setFoundPath(path);
        }
      }, 3 * i);
    }
  };

  const animatePath = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const cell = path[i];
        setCellsTraveled(i + 1);
        let item = document.getElementById(`cell-${cell.row}-${cell.col}`);
        if (item) {
          item.className += " cell-path";
        }
      }, 15 * i);
    }
  };

  const visualizeAlgo = () => {
    console.log('1');
    let grid = gridBoardCells.current;
    const startPoint = grid.flat().find((cell) => cell.isStartPoint);
    const endPoint = grid.flat().find((cell) => cell.isEndPoint);
    let start = grid[startPoint.row][startPoint.col];
    let end = grid[endPoint.row][endPoint.col];
    let visitedCells = [];
    console.log('2');

    let [BFSCells, BFSTime] = BFS(grid, start, end) || [];
    visitedCells = BFSCells || [];

    setTimeTaken(BFSTime || 0);
    console.log('3');

    const path = getPath(end);
    console.log('4');

    setCellsScanned(visitedCells.length);
    console.log('5');
    console.log(visitedCells, path, '>>>');
    animateAlgo(visitedCells, path);
  };

  useEffect(() => {
    if (foundPath) {
      animatePath(foundPath);
    }
  }, [foundPath]);

  return (
    <>
      <div className="w-full bg-gray-900 pb-4">
        <div className="flex md:gap-0 flex-wrap gap-4 flex-1 pt-4 max-w-7xl md:flex-row flex-col items-start md:items-center justify-start space-x-4 mx-auto">
          <button
            className="items-center w-fit ml-4 disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex bg-gray-600 text-[15px] text-white px-4 py-2 rounded-md"
            onClick={() => {
              setRenderFlag(!renderFlag);
              clearBoard(); // just to be sure that board and path is cleared
              generateRandomMaze(gridBoardCells.current);
            }}
          >
            Generate random maze
          </button>
          <button
            onClick={() => visualizeAlgo()}
            className="items-center w-fit disabled:bg-indigo-400 disabled:cursor-not-allowed inline-flex bg-indigo-600 text-[15px] text-white px-4 py-2 rounded-md"
          >
            Visualize Result
          </button>
        </div>
      </div>
      <div className="grid grid-cols-gridmap overflow-auto w-full px-4 justify-start md:justify-center items-center my-3">
        {gridBoardCells.current.map((row, rowIndex) => {
          return (
            <React.Fragment key={rowIndex}>
              {row.map((cell, colIndex) => {
                return (
                  <Cell
                    key={colIndex}
                    id={`cell-${cell.row}-${cell.col}`}
                    {...cell}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
