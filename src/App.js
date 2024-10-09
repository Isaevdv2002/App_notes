import React, { useState } from 'react';
import Tab from './components/Tab';
import './styles.css';

const App = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: 'Main', tiles: [] }
  ]);
  const [activeFolderId, setActiveFolderId] = useState(1); // по умолчанию активная папка "Main"
  const [newFolderName, setNewFolderName] = useState('');
  const [newTileName, setNewTileName] = useState('');
  const [newTileContent, setNewTileContent] = useState('');
  const [draggedTile, setDraggedTile] = useState(null);

  const addTile = (folderId) => {
    const updatedFolders = folders.map(folder =>
      folder.id === folderId ? {
        ...folder,
        tiles: [...folder.tiles, { id: Date.now(), name: newTileName, content: newTileContent }]
      } : folder
    );
    setFolders(updatedFolders);
    setNewTileName('');
    setNewTileContent('');
  };

  const deleteTile = (tileId, folderId) => {
    const updatedFolders = folders.map(folder => 
      folder.id === folderId ? {
        ...folder,
        tiles: folder.tiles.filter(tile => tile.id !== tileId)
      } : folder
    );
    setFolders(updatedFolders);
  };

  const handleDragStart = (tile, folderId) => {
    setDraggedTile({ tile, folderId });
  };

  const handleDrop = (targetTile, targetFolderId) => {
    const sourceFolderId = draggedTile.folderId;
    const sourceTile = draggedTile.tile;

    if (sourceFolderId !== targetFolderId) return;

    const updatedFolders = folders.map(folder => {
      if (folder.id !== targetFolderId) return folder;

      const sourceIndex = folder.tiles.findIndex(t => t.id === sourceTile.id);
      const targetIndex = folder.tiles.findIndex(t => t.id === targetTile.id);

      // Меняем местами плитки
      const updatedTiles = [...folder.tiles];
      [updatedTiles[sourceIndex], updatedTiles[targetIndex]] = [updatedTiles[targetIndex], updatedTiles[sourceIndex]];

      return { ...folder, tiles: updatedTiles };
    });

    setFolders(updatedFolders);
    setDraggedTile(null); // Сбросить перетаскиваемую плашку
  };

  const addFolder = () => {
    if (newFolderName) {
      const newFolder = { id: Date.now(), name: newFolderName, tiles: [] };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
    }
  };

  const handleFolderClick = (folderId) => {
    setActiveFolderId(folderId); // Меняем активную папку
  };

  const activeFolder = folders.find(folder => folder.id === activeFolderId); // Выбранная папка

  return (
    <div className="App">
      {/* Отображение папок */}
      <div className="folders-container">
        {folders.map(folder => (
          <div
            key={folder.id}
            className={`folder ${folder.id === activeFolderId ? 'active' : ''}`}
            onClick={() => handleFolderClick(folder.id)}
          >
            {folder.name}
          </div>
        ))}
      </div>

      {/* Форма для добавления новой папки */}
      <div className="new-folder-form">
        <input
          type="text"
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={addFolder}>Add Folder</button>
      </div>

      {/* Отображение заметок внутри активной папки */}
      <Tab
        key={activeFolder.id}
        tab={activeFolder}
        onDelete={deleteTile}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />

      {/* Форма для добавления новой заметки */}
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
        <button onClick={() => addTile(activeFolderId)}>Add Tile</button>
      </div>
    </div>
  );
};

export default App;
