export interface Character {
  name: string;
  attributes: Record<string, string>;
}

const characters: Character[] = [
  {
    name: "SpongeBob SquarePants",
    attributes: {
      species: "animal",
      clothes: "full",
      habitat: "underwater",
      intelligence: "high",
      bravery: "high",
      gender: "male"
    }
  },
  {
    name: "Patrick Star",
    attributes: {
      species: "animal",
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
      species: "animal",
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
      clothes: "full",
      habitat: "city",
      intelligence: "high",
      bravery: "high",
      gender: "male",
      glasses: "yes"
    }
  },
  {
    name: "Ferb Fletcher",
    attributes: {
      species: "human",
      clothes: "full",
      habitat: "city",
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
      habitat: "city",
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
      habitat: "city",
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
      habitat: "city",
      intelligence: "medium",
      bravery: "medium",
      gender: "male"
    }
  },
  {
    name: "Goofy",
    attributes: {
      species: "animal",
      clothes: "full",
      habitat: "city",
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
      habitat: "city",
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
      habitat: "city",
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
      habitat: "city",
      intelligence: "low",
      bravery: "low",
      gender: "male"
    }
  },
  {
    name: "Shaggy Rogers",
    attributes: {
      species: "human",
      clothes: "full",
      habitat: "city",
      intelligence: "low",
      bravery: "low",
      gender: "male"
    }
  }
];

export function getCharacters(): Character[] {
  return characters;
}
