export interface Character {
  name: string;
  attributes: Record<string, string>;
}

const characters: Character[] = [
    {
        name: "Character1",
        attributes: {
            species: "human",
            color: "red",
            clothes: "shirt"
        }
    },
    {
        name: "Character11",
        attributes: {
            species: "animal",
            color: "red",
            clothes: "shirt"
        }
    },
    {
        name: "Character2",
        attributes: {
            species: "human",
            color: "blue",
            clothes: "pants"
        }
    },
    {
        name: "Character3",
        attributes: {
            species: "animal",
            color: "green",
            clothes: "none"
        }
    },
    {
        name: "Character4",
        attributes: {
            species: "animal",
            color: "yellow",
            clothes: "hat"
        }
    }
];



export function getCharacters(): Character[] {
    return characters;
}
