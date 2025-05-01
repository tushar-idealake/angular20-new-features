export interface Animal {} 

export interface Fish extends Animal {
    swim: string;
}

export interface Dog extends Animal {
    noise: string;
    run: string;
    swim: string
}

export interface Cat extends Animal {
    noise: string;
    jump: string;
}
