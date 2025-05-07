export interface Animal {} 

export interface Fish extends Animal {
    name: string;
    swim: string;
}

export interface Dog extends Animal {
    name: string;
    noise: string;
    run: string;
    swim: string
}

export interface Cat extends Animal {
    name: string;
    noise: string;
    jump: string;
}
