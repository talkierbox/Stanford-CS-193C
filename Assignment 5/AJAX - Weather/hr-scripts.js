"use strict";
// Hello! This is my default javascript tools that I like to have on me whenever possible! - Hershraj

// This is just shorthand for the querySelector function
function $(input) {
    let results = document.querySelectorAll(input);
    if(results.length > 1) {
        return Array.from(results);
    }
    else if (results.length == 1) {
        return results[0];
    }
    else {
        return null;
    }
}

function refresh() {
    window.location.reload();
}

function toArray(input) {
    return Array.from(input);
}

function toMoney(inputInt) {
    let num = inputInt;
    let commas = num.toLocaleString("en-US");
    return "$ " + commas;
}

// This is in ES2021 and I like it so I recreated it here :)
String.replaceAll = function(toReplace, replaceCondition) {
    const searchRegExp = new RegExp(`/${toReplace}/g`);
    return this.replace(searchRegExp, replaceCondition);
}

function includedInArray(item, arrayToSearch) {
    hasFound = false;
    arrayToSearch.forEach(arrI => {
        if(arrI.includes(item)) hasFound = true;
    })
    return hasFound;
}

function log(item) {
    if(typeof str == "object") {
        console.dir(item);
    }
    else console.log(item);
}

function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    }

    if(exponent < 0) {
        return (1 / power(base, Math.abs(exponent)));
    }
    else {
       return base * power(base, exponent - 1);
    }
}

class Pair {
    #x;
    #y;
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    setElementOne(newX) {
        this.#x = newX;
    }

    setElementTwo(newY) {
        this.#y = newY;
    }

    getElementOne() {
        return this.#x;
    }

    getElementTwo() {
        return this.#y;
    }
}

let pi = Math.PI;
let e = Math.E;