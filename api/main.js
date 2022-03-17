const express = require('express');
var mongoose = require('mongoose');
const path = require('path');
const Task = require('./model/Task')
const app = express(),
      bodyParser = require("body-parser");
      port = 8888;
mongoose.connect('mongodb://localhost:27017')
// place holder for the data
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/list-tasks',async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

app.post('/api/task', async (req, res) => {
  const task = req.body.task;
  const newTask = new Task(task)
  try {
    const check = await newTask.save()
    res.status(201).json(check)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

app.post('/api/tasks', async (req, res) => {
  const tasks = req.body.tasks;
  try {
    let successList = []
    tasks.forEach(task =>{
      let newTask = new Task(task)
      let check = newTask.save()
      successList.push(check)
    })
    res.status(201).json(successList)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

app.delete('/api/task/:id', async (req, res) => {
  const task = await Task.findById(req.params.id)
  if(task) {
    try {
      await task.remove()
      res.json({ message: 'Deleted task' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
});

app.patch('/api/task/:id', async (req, res) => {
  const task = await Task.findById(req.params.id)
  if(task) {
    try {
      await task.update(req.body.task)
      res.json({ message: 'Updated task' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});