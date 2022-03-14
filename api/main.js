const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 8888;

// place holder for the data
const users = [
  {
    id: 1,
    name: "Task cơ bản",
    content: "Có 1 giao diện input text để nhập nội dung task",
    status: 0,
    pin: 0
  },
  {
    id: 2,
    name: "Task cơ bản 2",
    content: "List todo để thể hiện các task đã nhập, phía trước có check box để select chọn task",
    status: 1,
    pin: 0
  },
  {
    id: 3,
    name: "Task cơ bản 3",
    content: "Sử dụng localStorage để lưu trạng thái của todo-list, khi tắt trình duyệt mở lại không bị mất dữ liệu",
    status: 0,
    pin: 1
  },
  {
    id: 4,
    name: "Task 4",
    content: "Sử dụng localStorage để lưu trạng thái của todo-list, khi tắt trình duyệt mở lại không bị mất dữ liệu",
    status: 0,
    pin: 2
  },
  {
    id: 5,
    name: "Task 5",
    content: "Sử dụng localStorage để lưu trạng thái của todo-list, khi tắt trình duyệt mở lại không bị mất dữ liệu",
    status: 0,
    pin: 2
  }
];


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/list-tasks', (req, res) => {
  
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});