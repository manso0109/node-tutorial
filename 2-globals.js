// __dirname -path to current directory 
// __file name -file name
// require - function to use modules (CommonJS)
// module - info about the current module (file)
// process - info about env where the program is being executed

console.log(__dirname);
setInterval(() => {
    console.log('hello world')
}, 1000)