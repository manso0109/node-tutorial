const getAllTasks = (req, res)=>{
    res.send('get all tasks')
    }
const createNewTask = (req,res) => {
    res.send(req.body)
}

const getTask = (req,res) => {
    res.json({id:req.params.id})
}

const updateTask = (req,res) => {
    res.send('update task')
}

const deleteTask = (req,res) => {
    res.send('delete task')
}

module.exports = {
    getAllTasks,
    createNewTask,
    getTask,
    updateTask,
    deleteTask
}