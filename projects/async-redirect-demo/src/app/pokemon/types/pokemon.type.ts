export type OriginPokemon = {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: Record<string, string | null | Record<string, any>>;
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
}

export type Pokemon = Pick<OriginPokemon, 'id' | 'name' | 'weight' | 'height'> & {
    sprites: string[];
    types: { slot: number, type: string }[];
}
