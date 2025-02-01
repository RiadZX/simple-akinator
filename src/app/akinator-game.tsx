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
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [gameTree, setGameTree] = useState<GameNode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [bestFeature, setBestFeature] = useState<string>('');
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    const fetchGameTree = async () => {
      const response = await fetch('/api/game-tree');
      const data = await response.json();
      setGameTree(data);
      setCurrentNode(data);
    };

    fetchGameTree();
    fetchCharacters();
  }, []);

  const handleChoice = (choice: string) => {
    if (characters.length) {
      const filteredCharacters = characters.filter(character => character.attributes[bestFeature] === choice);
      setCharacters(filteredCharacters);
      setCurrentPath([...currentPath, `${bestFeature}: ${choice}`]);

      if (filteredCharacters.length === 1) {
        setGameOver(true);
        setCurrentNode({ character: filteredCharacters[0].name });
      } else if (filteredCharacters.length === 0) {
        setNoMatch(true);
        setGameOver(true);
      } else {
        const nextBestFeature = getBestSplitFeature(filteredCharacters);
        setBestFeature(nextBestFeature);
      }
    }
  };

  const resetGame = () => {
    if (gameTree) {
      setCurrentNode(gameTree)
      setGameOver(false)
      setCurrentPath([])
      setNoMatch(false);
      fetchCharacters();
    }
  }

  const fetchCharacters = async () => {
    const response = await fetch('/api/game-tree');
    const data = await response.json();
    setCharacters(data);
    setBestFeature(getBestSplitFeature(data));
  };

  if (!characters.length) {
    return <div>Loading...</div>
  }

  const uniqueChoices = Array.from(new Set(characters.map(character => character.attributes[bestFeature])));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 space-y-8">
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
                No matching character found.
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
    </div>
  )
}
