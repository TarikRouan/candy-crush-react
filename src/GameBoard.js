import React from "react";

const GameBoard = ({ currentColorArr, dragStart, dragDrop, dragEnd }) => {
  return (
    <div className="game">
      {currentColorArr.map((currentColor, index) => (
        <img
          key={index}
          style={{ backgroundColor: currentColor }}
          src={currentColor}
          alt={currentColor}
          id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
          }}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
        />
      ))}
    </div>
  );
};

export default GameBoard;
