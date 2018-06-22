export class Usuario {

    // manera normal
    // public nombre: string;

    // constructor( nombre: string) {}

    // manera con typescript

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }
}
