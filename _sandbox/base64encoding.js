const github = require("../src/config/github");

const key = github.privateKey;

const encodedKey =  btoa(key);

console.log('> EK',encodedKey);


var decodedKey = atob(encodedKey);

console.log('> DK',decodedKey);