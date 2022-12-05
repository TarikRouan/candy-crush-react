import { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import GameBoard from "./GameBoard";
import blueCandy from "./images/blue-candy.png";
import redCandy from "./images/red-candy.png";
import greenCandy from "./images/green-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import blank from "./images/blank.png";
const width = 8;
const candyColors = [
  blueCandy,
  redCandy,
  greenCandy,
  yellowCandy,
  orangeCandy,
  purpleCandy,
];

const App = () => {
  const [currentColorArr, setCurrentColorArr] = useState([]);
  const [draggedBox, setDraggedBox] = useState(null);
  const [replacedBox, setReplacedBox] = useState(null);
  const [score, setScore] = useState(0);

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const selectedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      if (
        columnOfFour.every(
          (box) => currentColorArr[box] === selectedColor && !isBlank
        )
      ) {
        setScore((score) => score + 4);
        columnOfFour.forEach((box) => (currentColorArr[box] = blank));
        return true;
      }
    }
  };

  const checkRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const selectedColor = currentColorArr[i];
      const notvalid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArr[i] === blank;

      if (notvalid.includes(i)) continue;

      if (
        rowOfFour.every(
          (box) => currentColorArr[box] === selectedColor && !isBlank
        )
      ) {
        setScore((score) => score + 4);
        rowOfFour.forEach((box) => (currentColorArr[box] = blank));
        return true;
      }
    }
  };

  const checkColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const selectedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      if (
        columnOfThree.every(
          (box) => currentColorArr[box] === selectedColor && !isBlank
        )
      ) {
        setScore((score) => score + 3);
        columnOfThree.forEach((box) => (currentColorArr[box] = blank));
        return true;
      }
    }
  };

  const checkRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const selectedColor = currentColorArr[i];
      const notvalid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArr[i] === blank;

      if (notvalid.includes(i)) continue;

      if (
        rowOfThree.every(
          (box) => currentColorArr[box] === selectedColor && !isBlank
        )
      ) {
        setScore((score) => score + 3);
        rowOfThree.forEach((box) => (currentColorArr[box] = blank));
        return true;
      }
    }
  };

  const MoveIntoBoxBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isfirstRow = firstRow.includes(i);
      if (isfirstRow && currentColorArr[i] === blank) {
        let randomNum = Math.floor(Math.random() * candyColors.length);
        currentColorArr[i] = candyColors[randomNum];
      }
      if (currentColorArr[i + width] === blank) {
        currentColorArr[i + width] = currentColorArr[i];
        currentColorArr[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setDraggedBox(e.target);
  };
  const dragDrop = (e) => {
    setReplacedBox(e.target);
  };
  const dragEnd = () => {
    const draggedBoxId = parseInt(draggedBox.getAttribute("id"));
    const replacedBoxId = parseInt(replacedBox.getAttribute("id"));
    currentColorArr[draggedBoxId] = replacedBox.getAttribute("src");
    currentColorArr[replacedBoxId] = draggedBox.getAttribute("src");

    const validMoves = [
      draggedBoxId - 1,
      draggedBoxId - width,
      draggedBoxId + 1,
      draggedBoxId + width,
    ];

    const validMove = validMoves.includes(replacedBoxId);

    const isAColumnOfFour = checkColumnOfFour();
    const isAColumnOfThree = checkColumnOfThree();
    const isARowOfFour = checkRowOfFour();
    const isARowOfThree = checkRowOfThree();

    if (
      replacedBoxId &&
      validMove &&
      (isARowOfFour || isAColumnOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setDraggedBox(null);
      setReplacedBox(null);
    } else {
      currentColorArr[replacedBoxId] = replacedBox.getAttribute("src");
      currentColorArr[draggedBoxId] = draggedBox.getAttribute("src");
      setCurrentColorArr([...currentColorArr]);
    }
  };

  const createBoard = () => {
    const randomColorArr = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArr.push(randomColor);
    }
    setCurrentColorArr(randomColorArr);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour();
      checkRowOfFour();
      checkColumnOfThree();
      checkRowOfThree();
      MoveIntoBoxBelow();
      setCurrentColorArr([...currentColorArr]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkColumnOfFour,
    checkRowOfFour,
    checkColumnOfThree,
    checkRowOfThree,
    MoveIntoBoxBelow,
    currentColorArr,
  ]);

  return (
    <div className="app">
      <GameBoard
        currentColorArr={currentColorArr}
        dragStart={dragStart}
        dragDrop={dragDrop}
        dragEnd={dragEnd}
      />
      <ScoreBoard score={score} />
    </div>
  );
};

export default App;
