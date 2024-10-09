import React from 'react';
import Tile from './Tile';

const Folder = ({ folder, onAddTile, onDeleteTile }) => {
  const [newTileName, setNewTileName] = React.useState('');
  const [newTileContent, setNewTileContent] = React.useState('');

  const handleAddTile = () => {
    onAddTile(folder.id, newTileName, newTileContent);
    setNewTileName('');
    setNewTileContent('');
  };

  return (
    <div className="folder">
      <h2>{folder.name}</h2>

      <div className="new-tile-form">
        <input
          type="text"
          placeholder="Tile Name"
          value={newTileName}
          onChange={(e) => setNewTileName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tile Content"
          value={newTileContent}
          onChange={(e) => setNewTileContent(e.target.value)}
        />
        <button onClick={handleAddTile}>Add Tile</button>
      </div>

      {folder.tiles.map(tile => (
        <Tile
          key={tile.id}
          name={tile.name}
          content={tile.content}
          onDelete={() => onDeleteTile(tile.id, folder.id)}
        />
      ))}
    </div>
  );
};

export default Folder;
