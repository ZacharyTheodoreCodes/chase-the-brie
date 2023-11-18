import React, { HTMLAttributes, useState, useEffect } from "react";
import { MapPinIcon, TrophyIcon } from "@heroicons/react/24/outline";

export default function Cell({
  isStartPoint,
  isEndPoint,
  isWall,
  cellNumber,
  col,
  isVisited,
  row,
  previousCell,
  distanceFromStart,
  isTarget,
  ...props
}) {
  const [startPointPosition, setStartPointPosition] = useState({
    row,
    col,
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [startPointPosition]);

  const handleKeyPress = (event) => {

    if (isStartPoint) {
      const newPosition = { ...startPointPosition };

      switch (event.key) {
        case "ArrowLeft":
          newPosition.col -= 1;
          break;
        case "ArrowRight":
          newPosition.col += 1;
          break;
        case "ArrowUp":
          newPosition.row -= 1;
          break;
        case "ArrowDown":
          newPosition.row += 1;
          break;
        default:
          return;
      }
    }
  };

  return (
    <div
      {...props}
      className={`cell lg:w-6 w-4 lg:h-6 h-4 inline-flex justify-center items-center aspect-square border-[0.1px] border-indigo-300 ${
        isStartPoint ? "!bg-green-300" : ""
      } ${isEndPoint ? "!bg-gray-200" : ""} ${
        isWall ? "!bg-gray-900 wall-animate" : ""
      }`}
      style={{
        gridColumn: col + 1,
        gridRow: row + 1,
      }}
    >
      {isStartPoint ? (
        <MapPinIcon className="h-4 w-4 font-bold" />
      ) : isEndPoint ? (
        <TrophyIcon className="h-4 w-4 font-bold" />
      ) : null}
    </div>
  );
}
