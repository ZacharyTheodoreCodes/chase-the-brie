import { getCells } from "../../utils/helpers";
import { getCellObjects, getPath } from "../../utils/helpers";
import { BFS } from "../algorithms/BFS";

export function generateRandomMaze(grid) {
  let startCell, endCell, path, grid1DArray;
  do {
  grid1DArray = getCells(grid);

  // Reset previous maze state
  grid1DArray.forEach((element) => {
    element.isStartPoint = false;
    element.isEndPoint = false;
    element.isWall = false;
  });

  // Define quadrant information
  const quadrants = [
    { colRange: [26, 51], rowRange: [0, 14] }, // Quadrant 1
    { colRange: [0, 25], rowRange: [0, 14] }, // Quadrant 2
    { colRange: [0, 25], rowRange: [15, 29] }, // Quadrant 3
    { colRange: [26, 51], rowRange: [15, 29] }, // Quadrant 4
  ];

  const startQuadrantIndex = Math.floor(Math.random() * quadrants.length);
    const startQuadrant = quadrants[startQuadrantIndex];
    startCell = getRandomCellInQuadrant(grid1DArray, startQuadrant);
    startCell.isStartPoint = true;
    // Randomly select start point


    // Calculate the index of the target quadrant based on the start quadrant
    const targetQuadrantIndex = (startQuadrantIndex + 2) % quadrants.length;
    const targetQuadrant = quadrants[targetQuadrantIndex];

    // Randomly select endpoint in the target quadrant
    const validCellsInTargetQuadrant = grid1DArray.filter((element) => {
      const isInTargetQuadrant =
        element.col >= targetQuadrant.colRange[0] &&
        element.col <= targetQuadrant.colRange[1] &&
        element.row >= targetQuadrant.rowRange[0] &&
        element.row <= targetQuadrant.rowRange[1];
      return isInTargetQuadrant && !element.isStartPoint && !element.isEndPoint;
    });

    if (validCellsInTargetQuadrant.length > 0) {
      endCell =
        validCellsInTargetQuadrant[
          Math.floor(Math.random() * validCellsInTargetQuadrant.length)
        ];
      endCell.isEndPoint = true;
    }

    let start = grid[startCell.row][startCell.col];
    let end = grid[endCell.row][endCell.col];

    BFS(grid, start, end);
    path = getPath(end);
    // console.log("Path Length:", path.length);
  } while (path.length > 45 && path.length < 65 );

  // Set walls based on a random condition
  for (let rowIndex = 0; rowIndex < grid1DArray.length; rowIndex++) {
    let element = grid1DArray[rowIndex];

    // Skip if the element is the start point or end point
    if (element.isStartPoint || element.isEndPoint) continue;

    // Skip if the cell is already a wall
    if (element.isWall) continue;

    // Set as wall based on a random condition
    element.isWall = element.cellNumber % Math.ceil(Math.random() * 10) === 0;
  }
}

function getRandomCellInQuadrant(grid1DArray, quadrant) {
  const { colRange, rowRange } = quadrant;
  const cellsInQuadrant = grid1DArray.filter((element) => {
    const isInQuadrant =
      element.col >= colRange[0] &&
      element.col <= colRange[1] &&
      element.row >= rowRange[0] &&
      element.row <= rowRange[1];
    return isInQuadrant;
  });

  return cellsInQuadrant.length > 0
    ? cellsInQuadrant[Math.floor(Math.random() * cellsInQuadrant.length)]
    : null;
}
