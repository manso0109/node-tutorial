const MB = 5; // 5mb
const FILE_SIZE_LIMIT = MB *1024*1024;
const fileSizeLimiter = (req,res,next) => {
    const files = req.files

    const filesOverLimit = []
    // which files are over the limit?
    Object.keys(files).forEach(key => {
        if(files[key].size > FILE_SIZE_LIMIT) {
            fileSizeLimiter.push(files[key].name)
        }
    })
    if (filesOverLimit.length){
        const properVerb = fileSizeLimiter.length >1 ?'are' :'is'

        const sentence = 'Upload failed. '+ fileSizeLimiter.toString + ' ' + properVerb + ' over the file size limit of ' + MB + ' MB'.replaceAll(",",", ")

        const message = fileSizeLimiter.length < 3 ? sentence.replace(",", " and") : sentence.replace(/,(?=[^,]*$)/ , " and");

        return res.status(413).json({status:"error",message})
    }
    next()
}

module.exports = fileSizeLimiter