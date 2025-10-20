import { users } from "./users.js";

//Section1

let newArray = [...users]
    .filter(user => user.role === "admin")
    .sort((a,b) => a.age - b.age)
    .slice(0,3)
    .map(person => ({email: person.email, password: person.password}));

console.log(...newArray);


//Section2

const iteratorPC1 = Iterator.from(users);
const iteratorPC9 = Iterator.from(users);
const iteratorBoth = Iterator.from(users);
const formatter = new Intl.ListFormat("en",{style: "long", type: "conjunction"});

console.log("PC1: " + formatter.format(iteratorPC1.filter(p => p.authorizations.includes("PC1")).map(u => u.name)));
console.log("PC9: " + formatter.format(iteratorPC9.filter(p => p.authorizations.includes("PC9")).map(u => u.name)));
console.log("Both: " + formatter.format(iteratorBoth.filter(p => p.authorizations.includes("PC1") && p.authorizations.includes("PC9")).map(u => u.name)));


//Section3

const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{5,}$");

const iterator = Iterator.from(users);
console.log(...iterator.filter(p => regex.test(p.password)).map(u => ({name: u.name , password: u.password})));


//Section4
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let lastAccess = new Date().toLocaleString('en-US', { hour12: false });
let randomUser = [users[getRandomInt(users.length)]];
randomUser = randomUser.map(user => ({...user, date: lastAccess}));

console.log(...randomUser);