export interface Character {
  name: string;
  attributes: Record<string, string>;
}

const characters: Character[] = [
  {
    name: "SpongeBob SquarePants",
    attributes: {
      species: "other",
      clothes: "shirt",
      habitat: "underwater",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Patrick Star",
    attributes: {
      species: "other",
      clothes: "shorts",
      habitat: "underwater",
      intelligence: "low",
      bravery: "low",
      gender: "male"
    }
  },
  {
    name: "Squidward Tentacles",
    attributes: {
      species: "other",
      clothes: "shirt",
      habitat: "underwater",
      intelligence: "high",
      bravery: "low",
      gender: "male"
    }
  },
  {
    name: "Phineas Flynn",
    attributes: {
      species: "human",
      clothes: "shirt",
      habitat: "suburban",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Ferb Fletcher",
    attributes: {
      species: "human",
      clothes: "shirt",
      habitat: "suburban",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Perry the Platypus",
    attributes: {
      species: "animal",
      clothes: "hat",
      habitat: "suburban",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Mickey Mouse",
    attributes: {
      species: "animal",
      clothes: "shorts",
      habitat: "urban",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Donald Duck",
    attributes: {
      species: "animal",
      clothes: "shirt",
      habitat: "urban",
      intelligence: "medium",
      bravery: "medium",
      gender: "male"
    }
  },
  {
    name: "Goofy",
    attributes: {
      species: "animal",
      clothes: "shirt",
      habitat: "urban",
      intelligence: "low",
      bravery: "medium",
      gender: "male"
    }
  },
  {
    name: "Tom",
    attributes: {
      species: "animal",
      clothes: "none",
      habitat: "house",
      intelligence: "medium",
      bravery: "medium",
      gender: "male"
    }
  },
  {
    name: "Jerry",
    attributes: {
      species: "animal",
      clothes: "none",
      habitat: "house",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Bugs Bunny",
    attributes: {
      species: "animal",
      clothes: "none",
      habitat: "forest",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Daffy Duck",
    attributes: {
      species: "animal",
      clothes: "none",
      habitat: "forest",
      intelligence: "medium",
      bravery: "medium",
      gender: "male"
    }
  },
  {
    name: "Scooby-Doo",
    attributes: {
      species: "animal",
      clothes: "collar",
      habitat: "various",
      intelligence: "low",
      bravery: "low",
      gender: "male"
    }
  },
  {
    name: "Shaggy Rogers",
    attributes: {
      species: "human",
      clothes: "shirt",
      habitat: "various",
      intelligence: "low",
      bravery: "low",
      gender: "male"
    }
  }
];

export function getCharacters(): Character[] {
  return characters;
}
