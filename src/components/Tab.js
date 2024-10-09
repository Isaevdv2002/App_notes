import React from 'react';
import Tile from './Tile';

const Tab = ({ tab, onDelete, onDragStart, onDrop }) => (
  <div className="tab">
    <h2>{tab.name}</h2>
    {tab.tiles.map((tile, index) => (
      <Tile
        key={tile.id}
        name={tile.name}
        content={tile.content}
        onDelete={() => onDelete(tile.id, tab.id)}
        onDragStart={() => onDragStart(tile, tab.id)}
        onDragOver={(e) => e.preventDefault()} // Необходимо для разрешения дропа
        onDrop={() => onDrop(tile, tab.id)}
      />
    ))}
  </div>
);

export default Tab;


