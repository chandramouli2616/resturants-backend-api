//const url = require('url');
const URL = require('url').URL; // if this gives you errors, use the above line


//create an object
// You might have to work with urls in your project

const myUrl = new URL('http://ibibek.com:6543/hello.html?id=100&status=active');

console.log(myUrl.href)