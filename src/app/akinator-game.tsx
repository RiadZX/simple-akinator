"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { getBestSplitFeature } from './api/game-tree/utils';

export type GameNode =
  | {
      feature: string
      children: { [key: string]: GameNode }
    }
  | { character: string }

export type Character = {
  name: string;
  attributes: { [key: string]: string }
}

export default function AkinatorGame() {
  const [currentNode, setCurrentNode] = useState<GameNode | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [bestFeature, setBestFeature] = useState<string>('');
  const [noMatch, setNoMatch] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loadedCharacters, setLoadedCharacters] = useState<Character[] | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const response = await fetch('/api/game-tree');
    const data = await response.json();
    setCharacters(data);
    setFilteredCharacters(data);
    setBestFeature(getBestSplitFeature(data));
  };

  const handleChoice = (choice: string) => {
    if (filteredCharacters.length) {
      const filtered = filteredCharacters.filter(character => character.attributes[bestFeature] === choice);
      setFilteredCharacters(filtered);
      setCurrentPath([...currentPath, `${bestFeature}: ${choice}`]);

      if (filtered.length === 1) {
        setGameOver(true);
        setCurrentNode({ character: filtered[0].name });
      } else if (filtered.length === 0) {
        setNoMatch(true);
        setGameOver(true);
      } else if (filtered.length > 1 && new Set(filtered.map(character => character.attributes[bestFeature])).size === 1) {
        setGameOver(true);
        setNoMatch(true);
        setCurrentNode({
          character: `Multiple characters found with the same features. Did you mean any of: ${filtered.map(character => character.name).join(', ')}?`
        });
      } else {
        const nextBestFeature = getBestSplitFeature(filtered);
        setBestFeature(nextBestFeature);
      }
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setCurrentPath([]);
    setNoMatch(false);
    if (loadedCharacters) {
      setFilteredCharacters(loadedCharacters);
      setBestFeature(getBestSplitFeature(loadedCharacters));
    } else {
      setFilteredCharacters(characters);
      setBestFeature(getBestSplitFeature(characters));
    }
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(characters));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "characters.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const loadJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (result) {
        const data = JSON.parse(result as string);
        setCharacters(data);
        setFilteredCharacters(data);
        setBestFeature(getBestSplitFeature(data));
        setLoadedCharacters(data);
        resetGame();
      }
    };
    if (event.target.files?.length) {
      fileReader.readAsText(event.target.files[0]);
    }
  };

  const addCharacter = (character: Character) => {
    setCharacters([...characters, character]);
    setFilteredCharacters([...filteredCharacters, character]);
  };

  const updateCharacter = (index: number, updatedCharacter: Character) => {
    const updatedCharacters = characters.map((character, i) => (i === index ? updatedCharacter : character));
    setCharacters(updatedCharacters);
    setFilteredCharacters(updatedCharacters);
  };

  const deleteCharacter = (index: number) => {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
    setFilteredCharacters(updatedCharacters);
  };

  const handleEditCharacter = (index: number) => {
    setEditingCharacter(characters[index]);
    setEditingIndex(index);
    setShowTable(false);
  };

  const handleSaveCharacter = () => {
    if (editingCharacter && editingIndex !== null) {
      updateCharacter(editingIndex, editingCharacter);
      setEditingCharacter(null);
      setEditingIndex(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCharacter) {
      setEditingCharacter({
        ...editingCharacter,
        attributes: {
          ...editingCharacter.attributes,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  if (!characters.length) {
    return <div>Loading...</div>
  }

  const uniqueChoices = Array.from(new Set(filteredCharacters.map(character => character.attributes[bestFeature])));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 space-y-8">
      <Button onClick={() => setShowTable(!showTable)} className="mb-4">
        {showTable ? "Hide" : "Show"} Characters Table
      </Button>
      {showTable && (
        <div className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-xl p-4 mb-4">
          <h2 className="text-xl font-bold text-center text-white">Characters</h2>
          <table className="w-full text-gray-400">
            <thead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Clothes</th>
                <th>Habitat</th>
                <th>Intelligence</th>
                <th>Bravery</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character, index) => (
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>{character.attributes.species}</td>
                  <td>{character.attributes.clothes}</td>
                  <td>{character.attributes.habitat}</td>
                  <td>{character.attributes.intelligence}</td>
                  <td>{character.attributes.bravery}</td>
                  <td>{character.attributes.gender}</td>
                  <td>
                    <Button onClick={() => handleEditCharacter(index)}>Edit</Button>
                    <Button onClick={() => deleteCharacter(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={downloadJSON} className="mt-4">Download JSON</Button>
          <input type="file" onChange={loadJSON} className="mt-4" />
        </div>
      )}
      {editingCharacter && (
        <div className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl p-4 mb-4">
          <h2 className="text-xl font-bold text-center text-white">Edit Character</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={editingCharacter.name}
              onChange={(e) => setEditingCharacter({ ...editingCharacter, name: e.target.value })}
              placeholder="Name"
              className="w-full p-2 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="species"
              value={editingCharacter.attributes.species}
              onChange={handleChange}
              placeholder="Species"
              className="w-full p-2 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="clothes"
              value={editingCharacter.attributes.clothes}
              onChange={handleChange}
              placeholder="Clothes"
              className="w-full p-2 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="habitat"
              value={editingCharacter.attributes.habitat}
              onChange={handleChange}
              placeholder="Habitat"
              className="w-full p-2 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="intelligence"
              value={editingCharacter.attributes.intelligence}
              onChange={handleChange}
              placeholder="Intelligence"
              className="w-full p-2 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="bravery"
              value={editingCharacter.attributes.bravery}
              onChange={handleChange}
              placeholder="Bravery"
              className="w-full p-2 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="gender"
              value={editingCharacter.attributes.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full p-2 bg-gray-700 text-white"
            />
            <Button onClick={handleSaveCharacter} className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-semibold">
              Save
            </Button>
          </div>
        </div>
      )}
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            Akinator
          </CardTitle>
          <CardDescription className="text-center text-gray-400">Guess the character!</CardDescription>
        </CardHeader>
        <CardContent>
          {gameOver ? (
            noMatch ? (
              <div className="text-center text-2xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
                {currentNode && ("character" in currentNode) ? currentNode.character : "No matching character found."}
              </div>
            ) : (
              <div className="text-center text-2xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
                I think your character is: {currentNode && ("character" in currentNode) ? currentNode.character : ""}
              </div>
            )
          ) : (
            <div className="text-center mb-4 text-white text-lg">{bestFeature}</div>
          )}
          <div className="text-center text-gray-400 mt-4">
            {currentPath.length > 0 && (
              <div>
                <strong>Current Path:</strong>
                <ul>
                  {currentPath.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-3">
          {!gameOver &&
            uniqueChoices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(choice)}
                className={`bg-neon-green hover:bg-neon-purple/80 text-black font-semibold`}
              >
                {choice}
              </Button>
            ))}
          {gameOver && (
            <Button
              onClick={resetGame}
              className="w-full bg-neon-green hover:bg-neon-green/80 text-black font-semibold"
            >
              Play Again
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl p-4 mt-4">
        <h2 className="text-xl font-bold text-center text-white">Path Tree</h2>
        <ul className="text-gray-400">
          {currentPath.map((step, index) => (
            <li key={index} className="ml-4">
              {index > 0 && <span>↳ </span>}
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
