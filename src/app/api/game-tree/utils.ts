import { Character } from "./algorithm";

export function getBestSplitFeature(characters: Character[]): string {
    const features = Object.keys(characters[0].attributes);
    let bestFeature = '';
    let bestScore = -Infinity;

    features.forEach(feature => {
        const values = characters.map(character => character.attributes[feature]);
        const uniqueValues = new Set(values);
        const score = uniqueValues.size;

        if (score > bestScore) {
            bestScore = score;
            bestFeature = feature;
        }
    });

    return bestFeature;
}