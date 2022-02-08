const express = require("express");
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const User = require('./models/User.js');
const Todo = require('./models/Todo.js')

const connectionurl = "database-url.com/app-name"

mongoose.connect(connectionurl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    newUser.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'EMAIL already exists!'
            })
        }
        return res.status(200).json({
            title: 'User Created'
        })
    })
});

app.post('/login', (req,res)=>{
    User.findOne({email: req.body.email}, (err,user)=>{
        if (err) return res.status(500).json({
            title: 'Error',
            error: err
        });
        if(!user){
            return res.status(400).json({
                title: 'User not found',
                error: 'Invalid Username or Password'
            })
        }
        if(req.body.password != user.password){
            return res.status(401).json({
                title: "Login Failed",
                error: 'Invalid Username or Password'
            })
        }

        let token = jwt.sign({userId: user._id}, 'secretkey');
        return res.status(200).json({
            title: 'Login Successful',
            token: token,
            name: user.name
        })
    })
})

app.get('/todos', (req,res)=>{
    jwt.verify(req.headers.token, 'secretkey', (err, dec)=>{
        if (err) {
            return res.status(401).json({
                title: 'Not Authorized, Please Login Again',
                error: err
            });
        }

        Todo.find({creator: dec.userId}, (err, todos)=>{
            if (err) return res.status(400).json({
                title: "Error",
                error: err,
            });

            return res.status(200).json({
                title: "Success",
                todos: todos
            });
        })
    })
})

app.post('/todo',(req,res)=>{
    jwt.verify(req.headers.token, 'secretkey', (err,dec)=>{
        if (err) {
            return res.status(401).json({
                title: 'Not Authorized, Please Login Again',
                error: err
            });
        }
        let addTodo = new Todo({
            title: req.body.title,
            creator: dec.userId,
            category: req.body.category,
            description: req.body.description,
            createdOn: req.body.createdOn,
        })

        addTodo.save(err => {
            if (err) return res.status(400).json({
                title: "Error, Please try agin!",
            })
            return res.status(200).json({
                title: "Added",
                todo: addTodo
            })
        })
    });
})

app.put('/done/:todoId', (req,res)=>{
    jwt.verify(req.headers.token, 'secretkey', (err,dec)=>{
        if (err) {
            return res.status(401).json({
                title: 'Not Authorized, Please Login Again',
                error: err
            });
        }
        Todo.findOne({creator: dec.userId, _id: req.params.todoId}, (err,todo)=>{
            if (err) return res.status(400).json({
                title: "Error, Please try agin!",
            })

            todo.isCompleted = true;
            todo.save(err=>{
                if (err) return res.status(400).json({
                    title: "Error, Please try agin!",
                })

                return res.status(200).json({
                    title: "Success",
                })
            })
        })
    })
})

app.put('/edit/:todoId', (req,res)=>{
    jwt.verify(req.headers.token, 'secretkey', (err,dec)=>{
        if (err) {
            return res.status(401).json({
                title: 'Not Authorized, Please Login Again',
                error: err
            });
        }
        Todo.findOne({creator: dec.userId, _id: req.params.todoId}, (err,todo)=>{
            if (err) return res.status(400).json({
                title: "Error, Please try agin!",
            })

            todo.title= req.body.title;
            todo.creator= dec.userId;
            todo.category= req.body.category;
            todo.description= req.body.description;
            todo.createdOn= req.body.createdOn;
            todo.save(err=>{
                if (err) return res.status(400).json({
                    title: "Error, Please try agin!",
                })

                return res.status(200).json({
                    title: "Success",
                })
            })
        })
    })
})

app.delete('/delete/:todoId', (req,res)=>{
    jwt.verify(req.headers.token, 'secretkey', (err,dec)=>{
        if (err) {
            return res.status(401).json({
                title: 'Not Authorized, Please Login Again',
                error: err
            });
        }
        Todo.deleteOne({creator: dec.userId, _id: req.params.todoId}, (err)=>{
            if (err) return res.status(400).json({
                title: "Error, Please try agin!",
            })
            return res.status(200).json({
                title: "Success",
            }) 
        })
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
