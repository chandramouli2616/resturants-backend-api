//Reference from class module
const fs= require('fs');
const path= require('path');


/* create folder
console.log(__dirname)

fs.mkdir(path.join(__dirname,'/test'), function(err){

    if(err) throw err;
    console.log("Folder Created..")

});
*/

/* write and create a file

fs.writeFile(path.join(__dirname,'/test','hello.text'),"We just wrote something", err =>{
    if(err) throw err;
    console.log("alirght, file has been written");
}
);


*/

fs.writeFile(path.join(__dirname, '/test', 'newFileName.txt'),"Just wrote it here in the new file", (err) => {
    if(err) throw err;
    console.log('file is written to');

    // append the file as a callback
    fs.appendFile(path.join(__dirname, '/test', 'newFileName.txt'),"I love node js", (err) => {
    
        console.log("also appended")
    })
})

//// filepath, character encoding and he  callback()
fs.readFile(path.join(__dirname,'/test', 'newFileName.txt'), 'utf-8', (err,data)=> {
    if (err) throw err;
    console.log("Read data:")
    console.log(data)
}
);


