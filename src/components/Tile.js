import React from 'react';

const Tile = ({ name, content, onDelete, onDragStart, onDragOver, onDrop }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert(`Copied: ${content}`);
  };

  return (
    <div
      className="tile"
      draggable
      onClick={handleCopy} // Копирование при нажатии на плашку
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h3>{name}</h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Tile;