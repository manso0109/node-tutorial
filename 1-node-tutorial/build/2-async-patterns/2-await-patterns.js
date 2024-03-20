const { readFile , writeFile} = require ('fs')
const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)



// const getText = (path) => {
//     return new Promise((resolve,reject) => {
//         readFile(path , 'utf-8' , (err,data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }


// getText('./content/first.txt')
// .then((result) =>console.log(result))
// .catch((err) => console.log(err))

const start = async () =>{
    try {
        const first = await readFilePromise('./content/first.txt' ,'utf-8');
        const second = await readFilePromise('./content/second.txt' , 'utf-8');
        await writeFilePromise('./content/result-mind-grenade.txt' , "This is awesome : "  + first + " " +second  )
        console.log(first , second);
    }
    catch (error){
        console.log(error);
    }
}
start()
