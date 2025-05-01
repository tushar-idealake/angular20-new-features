export type OriginPokemon = {
    id: number;
    name: string;
    weight: number;
    height: number;
    cries: Record<string, string>;
    sprites: Record<string, string | null | Record<string, any>>;
}

export type Pokemon = Pick<OriginPokemon, 'id' | 'name' | 'weight' | 'height'> & {
    cries: string[];
    sprites: string[];
}
