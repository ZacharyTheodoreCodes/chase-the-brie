// import { CellInterface } from "../interfaces";

export const singleCell = {
  cellNumber: 0,
  col: 0,
  row: 0,
  isVisited: false,
  isWall: false,
  isStartPoint: false,
  isEndPoint: false,
  distanceFromStart: Infinity,
  previousCell: null,
  isTarget: false,
};

// getCellObjects function
export const getCellObjects = (
  resetOnlyPath = false,
  resetOnlyWalls = false,
  grid
) => {
  let gridCells = grid || [];
  let cellNumber = 0;

  for (let rowInd = 0; rowInd < 30; rowInd++) {
    let currentRow = [];

    for (let colInd = 0; colInd < 52; colInd++) {
      if ((resetOnlyPath || resetOnlyWalls) && grid) {
        // don't recreate the grid instead just reset the path and walls flag conditionally
        grid[rowInd][colInd].isVisited = false;
        grid[rowInd][colInd].distanceFromStart = Infinity;
        grid[rowInd][colInd].isTarget = false;
        grid[rowInd][colInd].isStartPoint = false;
        grid[rowInd][colInd].isEndPoint = false;
        grid[rowInd][colInd].previousCell = null;

        if (resetOnlyWalls) {
          grid[rowInd][colInd].isWall = false;
        }
      } else {
        currentRow.push({
          ...singleCell,
          row: rowInd,
          col: colInd,
          cellNumber: cellNumber,
        });
      }

      cellNumber++;
    }

    if (!resetOnlyPath) {
      gridCells.push(currentRow);
    }
  }

  return gridCells;
};

// Exporting definitions

export function getCells(grid) {
  let cellsArray = [];
  grid.forEach((row) => {
    row.forEach((cell) => {
      cellsArray.push(cell);
    });
  });
  return cellsArray;
}

export function getPath(endPoint) {
  let path = getShortestPathCells(endPoint) || [];
  
  // console.log(path.length, 'helperssss');
  return path;
}

export function getShortestPathCells(endCell) {
  const pathCells = [];
  let currentCell = endCell;
  while (currentCell) {
    pathCells.push(currentCell);
    currentCell = currentCell.previousCell;
  }
  return pathCells;
}
