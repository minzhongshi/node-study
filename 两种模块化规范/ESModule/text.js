export default {
    name: 'ESModule',
    age: 18,
    sayHi() {
        console.log(`Hi, I'm ${this.name}, ${this.age} years old.`);
    }
}
export const name = 'ESModule2'
export const age = 19
export function sayHi() {
    console.log(`Hi, I'm ${name}, ${age} years old.`);
}