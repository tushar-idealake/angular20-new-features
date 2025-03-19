export type RawStarWarsCharacter = {
    name: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
    films: string[];
    starships: string[];
    gender: string;
}

export type StarWarsCharacter = {
    id: number;
    name: string;
	hairColor: string;
	skinColor: string;
	eyeColor: string;
    films: string[];
    starships: string[];
    gender: string;
}